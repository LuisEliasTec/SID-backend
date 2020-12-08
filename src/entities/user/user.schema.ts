import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
