import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { JobTitle } from 'src/entities/job-title/job-title.schema';
import { UserStatusEnum } from 'src/enums/user-status.enum';
import { Turn } from '../../turn/turn.schema';
import { Address } from './address.schema';

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

  @Prop()
  phoneNumber: string;

  @Prop()
  optionalPhoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop()
  address: Address;

  @Prop()
  curp: string;

  @Prop()
  rfc: string;

  @Prop()
  nss: string;

  @Prop({
    required: [true, 'El estatus es requerido'],
  })
  status: UserStatusEnum;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Turn',
      },
    ],
    required: [true, 'El turno es requerido'],
  })
  turn: Turn[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'JobTitle',
      },
    ],
    required: [true, 'El puesto laboral es requerido'],
  })
  jobTitle: JobTitle[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
