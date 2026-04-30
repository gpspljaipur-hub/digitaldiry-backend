import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RelationDocument = Relation & Document;

@Schema({ timestamps: true })
export class Relation {
  @Prop({ required: true, unique: true })
  name!: string;
}

export const RelationSchema = SchemaFactory.createForClass(Relation);
