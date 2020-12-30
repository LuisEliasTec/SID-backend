import { Turn } from 'src/entities/turn/turn.schema';
import { UserStatusEnum } from 'src/enums/user-status.enum';

export class EmployeeDto {
  name: string;
  birthDate: string;
  age: number;
  phoneNumber: string;
  optionalPhoneNumber: string;
  email: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  curp: string;
  rfc: string;
  nss: string;
  turn: Turn[];
  status: UserStatusEnum;
}
