import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaxInformationDocument = TaxInformation & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class TaxInformation {
  @Prop()
  businessName: string;

  @Prop()
  street: string;

  @Prop()
  exteriorNumber: number;

  @Prop()
  interiorNumber: number;

  @Prop()
  neighborhood: string;

  @Prop()
  city: string;

  @Prop()
  location: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  zipCode: number;

  @Prop()
  curp: string;

  @Prop()
  rfc: string;
}

export const TaxInformationSchema = SchemaFactory.createForClass(
  TaxInformation,
);
