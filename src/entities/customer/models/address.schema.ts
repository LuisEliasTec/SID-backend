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
  exteriorNumber: number;

  @Prop()
  neighborhood: string;

  @Prop()
  zipCode: number;

  @Prop()
  city: number;

  @Prop()
  state: number;

  @Prop()
  country: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
