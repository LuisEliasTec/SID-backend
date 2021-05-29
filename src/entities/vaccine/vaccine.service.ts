import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginator } from 'src/utils/paginator.util';
import { VaccineDto } from './dtos/vaccine.dto';
import { Vaccine, VaccineDocument } from './vaccine.schema';

@Injectable()
export class VaccineService {
  constructor(
    @InjectModel(Vaccine.name)
    private vaccineModel: Model<VaccineDocument>,
  ) {}

  async create(vaccineDto: VaccineDto): Promise<Vaccine> {
    const createdVaccine = new this.vaccineModel(vaccineDto);
    return createdVaccine.save();
  }

  async list(queryParams): Promise<any> {
    const { page, pageSize } = queryParams;

    return paginator(this.vaccineModel, parseInt(page), parseInt(pageSize));
  }

  async findById(id): Promise<Vaccine> {
    return this.vaccineModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.vaccineModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateVaccineDto: VaccineDto) {
    return this.vaccineModel.updateOne({ _id: id }, updateVaccineDto).exec();
  }
}
