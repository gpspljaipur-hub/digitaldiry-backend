import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExamTypeDocument = ExamType & Document;

@Schema({ timestamps: true })
export class ExamType {
  @Prop({ required: true, unique: true })
  name!: string;
}

export const ExamTypeSchema = SchemaFactory.createForClass(ExamType);
