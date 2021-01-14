import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AllergyDocument = Allergy & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Allergy {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop()
  description: string;
}

export const AllergySchema = SchemaFactory.createForClass(Allergy);
