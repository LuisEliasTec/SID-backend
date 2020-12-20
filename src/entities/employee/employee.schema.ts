import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatusEnum } from 'src/enums/user-status.enum';

export type EmployeeDocument = Employee & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Employee {
  @Prop({
    required: [true, 'El correo electrónico es requerido'],
  })
  email: string;

  @Prop({
    required: [true, 'La contraseña es requerida'],
  })
  password: string;

  @Prop({
    required: [true, 'El nombre de usuario es requerido'],
  })
  userName: string;

  @Prop({
    required: [false, 'El estatus es requerido'],
  })
  status: UserStatusEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
