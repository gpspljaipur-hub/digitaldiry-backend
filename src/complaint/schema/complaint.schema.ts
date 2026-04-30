import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComplaintDocument = Complaint & Document;

@Schema({ timestamps: true })
export class Complaint {
  @Prop({ type: Types.ObjectId, ref: 'ComplaintCategory', required: true })
  categoryId!: Types.ObjectId;

  @Prop({ required: true })
  message!: string;

  @Prop({ default: 'pending' })
  status!: string;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
