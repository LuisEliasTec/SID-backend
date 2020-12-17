import { UserStatusEnum } from 'src/enums/user-status.enum';

export class UserDto {
  email: string;
  password: string;
  userName: string;
  status: UserStatusEnum;
}
