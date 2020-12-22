import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatusEnum } from 'src/enums/user-status.enum';

export type EmployeeDocument = Employee & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Employee {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop({
    required: [true, 'El día de nacimiento es requerido'],
  })
  birthDate: string;

  @Prop({
    required: [false, ''],
  })
  phoneNumber: string;

  @Prop({
    required: [false, ''],
  })
  optionalPhoneNumber: string;

  @Prop({
    required: [true, 'El correo electrónico es requerido'],
  })
  email: string;

  @Prop({
    required: [false, ''],
  })
  address: string;

  @Prop({
    required: [false, ''],
  })
  postalCode: string;

  @Prop({
    required: [false, ''],
  })
  city: string;

  @Prop({
    required: [false, ''],
  })
  state: string;

  @Prop({
    required: [false, ''],
  })
  country: string;

  @Prop({
    required: [false, ''],
  })
  curp: string;

  @Prop({
    required: [false, ''],
  })
  rfc: string;

  @Prop({
    required: [false, ''],
  })
  nss: string;

  @Prop({
    required: [false, 'El estatus es requerido'],
  })
  status: UserStatusEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
