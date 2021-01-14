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
import { SurgeryDto } from './dtos/surgery.dto';
import { SurgeryService } from './surgery.service';

@Controller('surgery')
export class SurgeryController {
  constructor(private readonly surgeryService: SurgeryService) {}

  @Post('/create')
  async createSurgeries(@Body() body: SurgeryDto) {
    try {
      const createdSurgery: any = await this.surgeryService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdSurgery._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get('/list')
  async getSurgeries(@Query() queryParams) {
    try {
      const surgeryList = await this.surgeryService.list(queryParams);
      const successRequest = new SuccessPostMessage();
      successRequest.data = surgeryList;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get(':id')
  async getSurgery(@Param('id') id: string) {
    try {
      const surgery: any = await this.surgeryService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = surgery._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Delete(':id')
  async deleteSurgery(@Param('id') id: string) {
    try {
      const deletedSurgery = await this.surgeryService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };
      if (deletedSurgery.deletedCount === 0) {
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
  async updateSurgery(@Param('id') id: string, @Body() body: SurgeryDto) {
    try {
      const patchedSurgery = await this.surgeryService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedTurn: patchedSurgery.nModified,
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
