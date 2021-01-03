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
  startHour: Date;

  @Prop({
    required: [true, 'La hora final es requerida'],
  })
  endHour: Date;
}

export const TurnSchema = SchemaFactory.createForClass(Turn);
