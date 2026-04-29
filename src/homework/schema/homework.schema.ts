import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HomeworkDocument = Homework & Document;

@Schema({ timestamps: true })
export class Homework {
  @Prop({ type: Types.ObjectId, ref: 'ClassModel', required: true })
  classId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
  subjectId!: Types.ObjectId;

  @Prop({ required: true })
  message!: string;

  @Prop({ required: true })
  date!: Date;
}

export const HomeworkSchema = SchemaFactory.createForClass(Homework);
