import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  className!: string;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  teacherId!: Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
