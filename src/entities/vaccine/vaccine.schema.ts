import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VaccineDocument = Vaccine & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Vaccine {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop()
  description: string;
}

export const VaccineSchema = SchemaFactory.createForClass(Vaccine);
