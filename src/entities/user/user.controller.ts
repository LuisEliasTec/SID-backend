import { Body, Controller, Post } from '@nestjs/common';
import { DataErrorMessage } from 'src/message-handling/data-error-message';
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

      const successRequest = new SuccessPostMessage();
      successRequest.data = createdUser._id;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }
}
