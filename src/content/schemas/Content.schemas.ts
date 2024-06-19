import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Content extends Document {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  format: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: 'No description' })
  description: string;

  @Prop({ type: String, default: true })
  size: string;

  @Prop({ type: String, default: 'No description' })
  edition_type: string;
 
}

export const ContentSchema = SchemaFactory.createForClass(Content);