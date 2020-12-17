import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatusEnum } from 'src/enums/user-status.enum';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User {
  @Prop({
    required: [true, 'El email es requerido'],
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

export const UserSchema = SchemaFactory.createForClass(User);
