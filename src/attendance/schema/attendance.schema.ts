import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  teacherId!: Types.ObjectId;

  @Prop({ required: true })
  status!: string; //

  @Prop({ required: true })
  date!: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
