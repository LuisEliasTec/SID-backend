import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SurgeryDocument = Surgery & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Surgery {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop()
  description: string;
}

export const SurgerySchema = SchemaFactory.createForClass(Surgery);
