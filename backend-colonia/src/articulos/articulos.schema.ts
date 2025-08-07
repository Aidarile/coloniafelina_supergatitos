import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticuloDocument = Articulo & Document;
@Schema()
export class Articulo {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: false })
  descripcion: string;

  @Prop({ required: false })
  precio: string;

  @Prop({ required: true })
  imagen: string;

  @Prop({ required: true })
  referencia: string;
}

export const ArticuloSchema = SchemaFactory.createForClass(Articulo);