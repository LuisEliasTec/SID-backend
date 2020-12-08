import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dtos/user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async list(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateUserDto: UserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }
}
