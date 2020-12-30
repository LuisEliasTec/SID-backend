import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DataErrorMessage } from 'src/message-handling/data-error-message';
import { SuccessDeleteMessage } from 'src/message-handling/success-delete.message';
import { SuccessPostMessage } from 'src/message-handling/success-post.message';
import { TurnDto } from './dtos/turn.dto';
import { TurnService } from './turn.service';

@Controller('turn')
export class TurnController {
  constructor(private readonly turnService: TurnService) {}

  @Post('/create')
  async createTurn(@Body() body: TurnDto) {
    try {
      const createdTurn: any = await this.turnService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdTurn._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get('/list')
  async getTurns() {
    try {
      const TurnList = await this.turnService.list();
      const successRequest = new SuccessPostMessage();
      successRequest.data = TurnList;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get(':id')
  async getTurn(@Param('id') id: string) {
    try {
      const turn: any = await this.turnService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = turn._doc;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Delete(':id')
  async deleteTurn(@Param('id') id: string) {
    try {
      const deletedTurn = await this.turnService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };

      if (deletedTurn.deletedCount === 0) {
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
  async updateTurn(@Param('id') id: string, @Body() body: TurnDto) {
    try {
      const patchedTurn = await this.turnService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedTurn: patchedTurn.nModified,
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
