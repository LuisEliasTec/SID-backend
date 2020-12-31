import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({
  timestamps: true,
})
export class Permission {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  path: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
