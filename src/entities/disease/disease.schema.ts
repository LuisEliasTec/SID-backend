import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiseaseDocument = Disease & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Disease {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop()
  description: string;
}

export const DiseaseSchema = SchemaFactory.createForClass(Disease);
