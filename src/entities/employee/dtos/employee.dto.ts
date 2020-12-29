import { Schema } from 'mongoose';
import { UserStatusEnum } from 'src/enums/user-status.enum';

export class EmployeeDto {
  name: string;
  birthDate: string;
  age: BigInt;
  phoneNumber: string;
  optionalPhoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  curp: string;
  rfc: string;
  nss: string;
  _turn: string;
  // working_hours
  // job_title
  // photo
  status: UserStatusEnum;
}
