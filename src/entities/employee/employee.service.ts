import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeDto } from './dtos/employee.dto';
import { Employee, EmployeeDocument } from './employee.schema';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  async create(createEmployeeDto: EmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }

  async list(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findById(id): Promise<Employee> {
    return this.employeeModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.employeeModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateEmployeeDto: EmployeeDto) {
    return this.employeeModel.updateOne({ _id: id }, updateEmployeeDto).exec();
  }

  async findByEmail(email: string) {
    return this.employeeModel.findOne({ email: email }).exec();
  }
}
