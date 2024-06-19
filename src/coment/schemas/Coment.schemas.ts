import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Coment extends Document {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  date_creation: string;

  @Prop({ type: String, required: true })
  comment: string;

  @Prop({ type: String, required: true })
  id_user: string;

 
 
}

export const ComentSchema = SchemaFactory.createForClass(Coment);