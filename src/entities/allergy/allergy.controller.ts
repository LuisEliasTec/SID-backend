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
import { AllergyService } from './allergy.service';
import { AllergyDto } from './dtos/allergy.dto';

@Controller('allergy')
export class AllergyController {
  constructor(private readonly allergyService: AllergyService) {}

  @Post('/create')
  async createAllergies(@Body() body: AllergyDto) {
    try {
      const createdAllergy: any = await this.allergyService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdAllergy._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get('/list')
  async getAllergies(@Query() queryParams) {
    try {
      const allergiesList = await this.allergyService.list(queryParams);
      const successRequest = new SuccessPostMessage();
      successRequest.data = allergiesList;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Get(':id')
  async getAllergy(@Param('id') id: string) {
    try {
      const allergy: any = await this.allergyService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = allergy._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;
      return errorException;
    }
  }

  @Delete(':id')
  async deleteAllergy(@Param('id') id: string) {
    try {
      const deletedAllergy = await this.allergyService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };
      if (deletedAllergy.deletedCount === 0) {
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
  async updateAllergy(@Param('id') id: string, @Body() body: AllergyDto) {
    try {
      const patchedAllergy = await this.allergyService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedTurn: patchedAllergy.nModified,
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
