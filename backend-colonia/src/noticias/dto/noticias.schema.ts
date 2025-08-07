import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticiasDocument = Noticias & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Noticias {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  contenido: string;

  @Prop()
  imagen?: string;

  @Prop()
  autor: string;

  @Prop({ type: [String] })
  tags?: string[];
}

export const NoticiasSchema = SchemaFactory.createForClass(Noticias);
