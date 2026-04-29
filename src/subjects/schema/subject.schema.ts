import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema({ timestamps: true })
export class Subject {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: Types.ObjectId, ref: 'ClassModel', required: true })
  classId!: Types.ObjectId;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
