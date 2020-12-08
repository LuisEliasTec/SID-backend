import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { hash } from 'bcrypt';
import { DataErrorMessage } from 'src/message-handling/data-error-message';

@Injectable()
export class PasswordEncryptPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value.password === '' || value.password.length < 8) {
      const emptyPassword = new DataErrorMessage(
        'Empty password or password length is incorrect.',
      );

      throw emptyPassword;
    } else {
      const saltRounds = 10;
      const encryptedPassword = await hash(value.password, saltRounds);
      value.password = encryptedPassword;
    }
    return value;
  }
}
