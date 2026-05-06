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
  @Prop({ type: Types.ObjectId, ref: 'ClassModel', required: true })
  classId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId!: Types.ObjectId;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
