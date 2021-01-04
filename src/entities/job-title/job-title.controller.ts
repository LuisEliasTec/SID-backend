import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DataErrorMessage } from 'src/message-handling/data-error-message';
import { SuccessDeleteMessage } from 'src/message-handling/success-delete.message';
import { SuccessPostMessage } from 'src/message-handling/success-post.message';
import { JobTitleDto } from './dtos/job-title.dto';
import { JobTitleService } from './job-title.service';

@Controller('job-title')
export class JobTitleController {
  constructor(private readonly jobTitleService: JobTitleService) {}

  @Post('/create')
  async createJobTitles(@Body() body: JobTitleDto) {
    try {
      const createdJobTitle: any = await this.jobTitleService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdJobTitle._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get('/list')
  async getJobTitles(@Query() queryParams) {
    try {
      const JobTitleList = await this.jobTitleService.list(queryParams);
      const successRequest = new SuccessPostMessage();
      successRequest.data = JobTitleList;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get(':id')
  async getJobTitle(@Param('id') id: string) {
    try {
      const jobTitle: any = await this.jobTitleService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = jobTitle._doc;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Delete(':id')
  async deleteJobTitle(@Param('id') id: string) {
    try {
      const deletedJobTitle = await this.jobTitleService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };

      if (deletedJobTitle.deletedCount === 0) {
        successRequest.customMessage = 'zero';
      }

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();

      if (e.kind === 'ObjectId') {
        errorException.message = e.reason.message;
      } else {
        errorException.errorData = e;
      }

      return errorException;
    }
  }

  @Patch(':id')
  async updateJobTitle(@Param('id') id: string, @Body() body: JobTitleDto) {
    try {
      const patchedJobTitle = await this.jobTitleService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedTurn: patchedJobTitle.nModified,
        requestedId: id,
      };

      successRequest.data = modifiedData;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }
}
