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
import { PasswordEncryptPipe } from 'src/pipes/password-encrypt.pipe';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body(PasswordEncryptPipe) body: UserDto) {
    try {
      const createdUser: any = await this.userService.create(body);
      const noPasswordUser = createdUser._doc;
      noPasswordUser.password = '';
      const successRequest = new SuccessPostMessage();
      successRequest.data = noPasswordUser;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get('/list')
  async getUsers(@Query() queryParams) {
    try {
      const userList = await this.userService.list(queryParams);
      const successRequest = new SuccessPostMessage();
      successRequest.data = userList;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    try {
      const user: any = await this.userService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = user._doc;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const deletedUser = await this.userService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };

      if (deletedUser.deletedCount === 0) {
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
  async updateUser(@Param('id') id: string, @Body() body: UserDto) {
    try {
      const patchedUser = await this.userService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedUser: patchedUser.nModified,
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
