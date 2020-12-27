import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobTitleDocument = JobTitle & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class JobTitle {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop({
    required: [false, ''],
  })
  description: string;
}

export const JobTitleSchema = SchemaFactory.createForClass(JobTitle);
