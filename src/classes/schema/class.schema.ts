import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClassDocument = ClassModel & Document;

@Schema({ timestamps: true })
export class ClassModel {
  @Prop({ required: true })
  name!: string;
}

export const ClassSchema = SchemaFactory.createForClass(ClassModel);
