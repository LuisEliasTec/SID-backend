import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginator } from 'src/utils/paginator.util';
import { Allergy, AllergyDocument } from './allergy.schema';
import { AllergyDto } from './dtos/allergy.dto';

@Injectable()
export class AllergyService {
  constructor(
    @InjectModel(Allergy.name) private allergyModel: Model<AllergyDocument>,
  ) {}

  async create(allergyDto: AllergyDto): Promise<Allergy> {
    const createdAllergy = new this.allergyModel(allergyDto);
    return createdAllergy.save();
  }

  async list(queryParams): Promise<any> {
    const { page, pageSize } = queryParams;

    return paginator(this.allergyModel, parseInt(page), parseInt(pageSize));
  }

  async findById(id): Promise<Allergy> {
    return this.allergyModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.allergyModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateAllergyDto: AllergyDto) {
    return this.allergyModel.updateOne({ _id: id }, updateAllergyDto).exec();
  }
}
