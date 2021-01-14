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
import { MedicineDto } from './dtos/medicine.dto';
import { MedicineService } from './medicine.service';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('/create')
  async createMedicine(@Body() body: MedicineDto) {
    try {
      const createdMedicine: any = await this.medicineService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdMedicine._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get('/list')
  async getMedicines(@Query() queryParams) {
    try {
      const medicinesList = await this.medicineService.list(queryParams);
      const successRequest = new SuccessPostMessage();
      successRequest.data = medicinesList;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get(':id')
  async getMedicine(@Param('id') id: string) {
    try {
      const medicine: any = await this.medicineService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = medicine._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Delete(':id')
  async deleteMedicine(@Param('id') id: string) {
    try {
      const deletedMedicine = await this.medicineService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };
      if (deletedMedicine.deletedCount === 0) {
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
  async updateMedicine(@Param('id') id: string, @Body() body: MedicineDto) {
    try {
      const patchedMedicine = await this.medicineService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedMedicine: patchedMedicine.nModified,
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
