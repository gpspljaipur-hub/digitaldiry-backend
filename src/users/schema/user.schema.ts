import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  phone!: string;

  @Prop({ default: false })
  isVerified!: boolean;

  @Prop({ default: false })
  isRegistered!: boolean;

  // ✅ ADD THESE
  @Prop()
  otp!: string;

  @Prop()
  otpCreatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
