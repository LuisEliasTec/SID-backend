import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginator } from 'src/utils/paginator.util';
import { Disease, DiseaseDocument } from './disease.schema';
import { DiseaseDto } from './dtos/disease.dto';

@Injectable()
export class DiseaseService {
  constructor(
    @InjectModel(Disease.name)
    private diseaseModel: Model<DiseaseDocument>,
  ) {}

  async create(diseaseDto: DiseaseDto): Promise<Disease> {
    const createdDisease = new this.diseaseModel(diseaseDto);
    return createdDisease.save();
  }

  async list(queryParams): Promise<any> {
    const { page, pageSize } = queryParams;

    return paginator(this.diseaseModel, parseInt(page), parseInt(pageSize));
  }

  async findById(id): Promise<Disease> {
    return this.diseaseModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.diseaseModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateDiseaseDto: DiseaseDto) {
    return this.diseaseModel.updateOne({ _id: id }, updateDiseaseDto).exec();
  }
}
