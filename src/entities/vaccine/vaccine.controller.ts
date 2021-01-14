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
import { VaccineDto } from './dtos/vaccine.dto';
import { VaccineService } from './vaccine.service';

@Controller('vaccine')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post('/create')
  async createVaccine(@Body() body: VaccineDto) {
    try {
      const createdVaccination: any = await this.vaccineService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdVaccination._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get('/list')
  async getVaccinations(@Query() queryParams) {
    try {
      const vaccinationList = await this.vaccineService.list(queryParams);
      const successRequest = new SuccessPostMessage();
      successRequest.data = vaccinationList;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get(':id')
  async getVaccine(@Param('id') id: string) {
    try {
      const vaccination: any = await this.vaccineService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = vaccination._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Delete(':id')
  async deleteVaccine(@Param('id') id: string) {
    try {
      const deletedVaccination = await this.vaccineService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };
      if (deletedVaccination.deletedCount === 0) {
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
  async updateVaccine(@Param('id') id: string, @Body() body: VaccineDto) {
    try {
      const patchedVaccination = await this.vaccineService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedVaccination: patchedVaccination.nModified,
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
