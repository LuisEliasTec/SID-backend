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
import { DiseaseService } from './disease.service';
import { DiseaseDto } from './dtos/disease.dto';

@Controller('disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Post('/create')
  async createDisease(@Body() body: DiseaseDto) {
    try {
      const createdDisease: any = await this.diseaseService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdDisease._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get('/list')
  async getDiseases(@Query() queryParams) {
    try {
      const diseasesList = await this.diseaseService.list(queryParams);
      const successRequest = new SuccessPostMessage();
      successRequest.data = diseasesList;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get(':id')
  async getDisease(@Param('id') id: string) {
    try {
      const disease: any = await this.diseaseService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = disease._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Delete(':id')
  async deleteDisease(@Param('id') id: string) {
    try {
      const deletedDisease = await this.diseaseService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };
      if (deletedDisease.deletedCount === 0) {
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
  async updateDisease(@Param('id') id: string, @Body() body: DiseaseDto) {
    try {
      const patchedDisease = await this.diseaseService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedDisease: patchedDisease.nModified,
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
