import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SchoolAdminDocument = SchoolAdmin & Document;

@Schema({ timestamps: true })
export class SchoolAdmin {
  @Prop({ required: true, unique: true })
  mobile!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop()
  lastName!: string;

  @Prop({ required: true, select: false })
  password!: string;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  schoolId!: Types.ObjectId;

  @Prop()
  dob!: Date;

  @Prop()
  employeeId!: string;
}

export const SchoolAdminSchema = SchemaFactory.createForClass(SchoolAdmin);
