import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop()
  street: string;

  @Prop()
  interiorNumber: number;

  @Prop()
  neighborhood: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
