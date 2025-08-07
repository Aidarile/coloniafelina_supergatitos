import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Articulo, ArticuloSchema } from "./articulos.schema";
import { ArticulosService } from "./articulos.service";
import { ArticulosController } from "./articulos.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: Articulo.name, schema: ArticuloSchema}])],
    controllers: [ArticulosController ],
    providers: [ArticulosService],
})

export class ArticulosModule {}