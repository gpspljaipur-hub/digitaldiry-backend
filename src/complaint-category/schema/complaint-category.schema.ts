import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComplaintCategoryDocument = ComplaintCategory & Document;

@Schema({ timestamps: true })
export class ComplaintCategory {
  @Prop({ required: true, unique: true })
  name!: string;
}

export const ComplaintCategorySchema =
  SchemaFactory.createForClass(ComplaintCategory);
