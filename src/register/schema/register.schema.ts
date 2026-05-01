import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RegisterDocument = Register & Document;

@Schema({ timestamps: true })
export class Register {
  @Prop({ required: true })
  mobile!: string;

  @Prop({ required: true })
  parentName!: string;

  @Prop({ required: true })
  studentFullName!: string;

  @Prop({ type: Types.ObjectId, ref: 'ClassModel', required: true })
  classId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  schoolId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Relation', required: true })
  relationId!: Types.ObjectId;

  @Prop()
  studentId!: string;

  @Prop()
  email!: string;

  @Prop()
  address!: string;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
