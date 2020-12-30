import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserStatusEnum } from 'src/enums/user-status.enum';
import { Turn } from '../turn/turn.schema';

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
  address: string;

  @Prop()
  zipCode: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

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
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
