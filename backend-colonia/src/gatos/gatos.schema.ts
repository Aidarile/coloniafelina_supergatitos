
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GatoDocument = Gatos & Document;

@Schema()
export class Gatos {
    @Prop({ required: true })
    nombre: string;

    @Prop({ required: false })
    apodo: string;

    @Prop({ required: true })
    descripcion: string;

    @Prop({ required: true })
    imagen: string;

    @Prop({ required: true, enum: ['colonia', 'en_adopcion', 'en_acogida', 'fallecido', 'acogido', 'adoptado', 'desaparecido'] })
    estado: string;

    @Prop({ required: true, enum: ['hembra', 'macho', 'indeterminado'] })
    sexo: string;

    @Prop({ required: false })
    motivo: string;
}

export const GatoSchema = SchemaFactory.createForClass(Gatos);
