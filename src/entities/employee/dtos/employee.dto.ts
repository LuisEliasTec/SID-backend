import { UserStatusEnum } from 'src/enums/user-status.enum';

export class EmployeeDto {
  name: string;
  birthDate: Date;
  age: BigInt;
  phoneNumber: BigInt;
  optionalPhoneNumber: BigInt;
  email: string;
  address: string;
  city: string;
  state: string;
  // country: string;
  curp: string;
  rfc: string;
  nss: string;
  // turn
  // working_hours
  // job_title
  status: UserStatusEnum;
}
