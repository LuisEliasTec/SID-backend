import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginator } from 'src/utils/paginator.util';
import { UserDto } from './dtos/user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async list(queryParams): Promise<any> {
    const { page, pageSize } = queryParams;

    return paginator(this.userModel, parseInt(page), parseInt(pageSize));
  }

  async findById(id): Promise<UserDocument> {
    return this.userModel
      .findById(id)
      .populate([{ path: 'role', populate: { path: 'permissions' } }])
      .exec();
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

  async permissionsByUser(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate([{ path: 'role', populate: { path: 'permissions' } }]);

    if (!user) {
      throw new NotFoundException(`Resource with id ${userId} not found`);
    }

    const permissions = user.get('role').permissions;

    return permissions;
  }
}
