import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginator } from 'src/utils/paginator.util';
import { MedicineDto } from './dtos/medicine.dto';
import { Medicine, MedicineDocument } from './medicine.schema';

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel(Medicine.name)
    private medicineModel: Model<MedicineDocument>,
  ) {}

  async create(medicineDto: MedicineDto): Promise<Medicine> {
    const createdMedicine = new this.medicineModel(medicineDto);
    return createdMedicine.save();
  }

  async list(queryParams): Promise<any> {
    const { page, pageSize } = queryParams;

    return paginator(this.medicineModel, parseInt(page), parseInt(pageSize));
  }

  async findById(id): Promise<Medicine> {
    return this.medicineModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.medicineModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateMedicineDto: MedicineDto) {
    return this.medicineModel.updateOne({ _id: id }, updateMedicineDto).exec();
  }
}
