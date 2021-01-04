import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobTitleDto } from './dtos/job-title.dto';
import { JobTitle, JobTitleDocument } from './job-title.schema';
import { paginator } from 'src/utils/paginator.util';

@Injectable()
export class JobTitleService {
  constructor(
    @InjectModel(JobTitle.name) private jobTitleModel: Model<JobTitleDocument>,
  ) {}

  async create(createJobTitleDto: JobTitleDto): Promise<JobTitle> {
    const createdJobTitle = new this.jobTitleModel(createJobTitleDto);
    return createdJobTitle.save();
  }

  // async list(): Promise<JobTitle[]> {
  //   return this.jobTitleModel.find().exec();
  // }

  async list(queryParams): Promise<any> {
    const { page, pageSize } = queryParams;

    return paginator(this.jobTitleModel, parseInt(page), parseInt(pageSize));
  }

  async findById(id): Promise<JobTitle> {
    return this.jobTitleModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.jobTitleModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateJobTitleDto: JobTitleDto) {
    return this.jobTitleModel.updateOne({ _id: id }, updateJobTitleDto).exec();
  }
}
