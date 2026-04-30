import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LeaveDocument = Leave & Document;

@Schema({ timestamps: true })
export class Leave {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId!: Types.ObjectId;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({ required: true })
  message!: string;

  @Prop({ default: 'pending' })
  status!: string;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
