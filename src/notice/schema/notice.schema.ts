import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NoticeDocument = Notice & Document;

@Schema({ timestamps: true })
export class Notice {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: Types.ObjectId, ref: 'ClassModel', required: true })
  classId!: Types.ObjectId;

  @Prop({ required: true })
  message!: string;

  @Prop({ required: true, enum: ['important', 'normal'], default: 'normal' })
  status!: string; // important / normal
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
