import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginator } from 'src/utils/paginator.util';
import { CustomerDto } from './dtos/customer.dto';
import { Customer, CustomerDocument } from './models/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  // async list(): Promise<Employee[]> {
  //   return this.customerModel.find().exec();
  // }

  async list(queryParams): Promise<any> {
    const { page, pageSize } = queryParams;

    return paginator(this.customerModel, parseInt(page), parseInt(pageSize));
  }

  async findById(id): Promise<Customer> {
    return this.customerModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.customerModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateCustomerDto: CustomerDto) {
    return this.customerModel.updateOne({ _id: id }, updateCustomerDto).exec();
  }

  async findByEmail(email: string) {
    return this.customerModel.findOne({ email: email }).exec();
  }
}
