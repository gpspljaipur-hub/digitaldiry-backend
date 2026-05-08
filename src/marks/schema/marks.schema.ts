import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MarksDocument = Marks & Document;

@Schema({ timestamps: true })
export class Marks {
  @Prop({ type: Types.ObjectId, ref: 'ClassModel', required: true })
  classId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
  subjectId!: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'ExamType', required: true })
  examTypeId!: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId!: Types.ObjectId;

  @Prop({ required: true })
  marks!: number;
}

export const MarksSchema = SchemaFactory.createForClass(Marks);
