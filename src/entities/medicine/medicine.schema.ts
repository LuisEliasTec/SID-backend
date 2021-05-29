import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicineDocument = Medicine & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Medicine {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop()
  description: string;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
