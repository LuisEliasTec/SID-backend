import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CustomerTypeEnum } from 'src/enums/customer-type.enum';
import { UserStatusEnum } from 'src/enums/user-status.enum';
import { Address } from './address.schema';
import { TaxInformation } from './taxInformation.schema';

export type CustomerDocument = Customer & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Customer {
  @Prop({
    required: [true, 'El nombre es requerido'],
  })
  name: string;

  @Prop({
    required: [true, 'El apellido paterno es requerido'],
  })
  firstName: string;

  @Prop({
    required: [true, 'El apellido materno es requerido'],
  })
  secondName: string;

  @Prop()
  birthDate: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  optionalPhoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop()
  address: Address;

  @Prop()
  curp: string;

  @Prop()
  rfc: string;

  @Prop()
  nss: string;

  @Prop({
    required: [true, 'El estatus es requerido'],
  })
  status: UserStatusEnum;

  @Prop()
  taxInformation: TaxInformation;

  @Prop({
    required: [true, 'El tipo de cliente es requerido'],
  })
  customerType: CustomerTypeEnum;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
