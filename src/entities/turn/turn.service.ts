import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TurnDto } from './dtos/turn.dto';
import { Turn, TurnDocument } from './turn.schema';


@Injectable()
export class TurnService {
  constructor(@InjectModel(Turn.name) private turnModel: Model<TurnDocument>) {}

  async create(createTurnDto: TurnDto): Promise<Turn> {
    const createdTurn = new this.turnModel(createTurnDto);
    return createdTurn.save();
  }

  async list(): Promise<Turn[]> {
    return this.turnModel.find().exec();
  }

  async findById(id): Promise<Turn> {
    return this.turnModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.turnModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateTurnDto: TurnDto) {
    return this.turnModel.updateOne({ _id: id }, updateTurnDto).exec();
  }
}
