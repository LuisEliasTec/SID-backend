import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginator } from 'src/utils/paginator.util';
import { SurgeryDto } from './dtos/surgery.dto';
import { Surgery, SurgeryDocument } from './surgery.schema';

@Injectable()
export class SurgeryService {
  constructor(
    @InjectModel(Surgery.name) private surgeryModel: Model<SurgeryDocument>,
  ) {}

  async create(SurgeryDto: SurgeryDto): Promise<Surgery> {
    const createdSurgery = new this.surgeryModel(SurgeryDto);
    return createdSurgery.save();
  }

  async list(queryParams): Promise<any> {
    const { page, pageSize } = queryParams;

    return paginator(this.surgeryModel, parseInt(page), parseInt(pageSize));
  }

  async findById(id): Promise<Surgery> {
    return this.surgeryModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.surgeryModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateSurgeryDto: SurgeryDto) {
    return this.surgeryModel.updateOne({ _id: id }, updateSurgeryDto).exec();
  }
}
