import { UserStatusEnum } from 'src/enums/user-status.enum';
import { Address } from '../models/address.schema';

export class CustomerDto {
  name: string;
  firstName: string;
  secondName: string;
  birthDate: string;
  age: number;
  phoneNumber: string;
  optionalPhoneNumber: string;
  email: string;
  address: Address;
  curp: string;
  rfc: string;
  status: UserStatusEnum;
}
