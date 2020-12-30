import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TurnDocument = Turn & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Turn {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop({
    required: [true, 'La hora de inicio es requerida'],
  })
  start_hour: string;

  @Prop({
    required: [true, 'La hora final es requerida'],
  })
  end_hour: string;
}

export const TurnSchema = SchemaFactory.createForClass(Turn);
