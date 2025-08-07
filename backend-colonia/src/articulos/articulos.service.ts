import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Articulo, ArticuloDocument } from "./articulos.schema";
import { Model } from "mongoose";
import { CreateArticuloDto } from "./dto/create-articulo-dto";
import { UpdateArticuloDto } from "./dto/update-articulo.dto";

@Injectable()
export class ArticulosService {
    constructor(@InjectModel(Articulo.name) private articuloModel: Model<ArticuloDocument>) {}

    async findAll(): Promise<Articulo[]> {
        return this.articuloModel.find().exec();
    }

    async findOne(id: string): Promise<Articulo> {
        const articulo = await this.articuloModel.findById(id).exec();
        if (!articulo) {
            throw new NotFoundException(`No se encontró el artículo con ID ${id}`);
        }
        return articulo;
    }

    async create(createArticuloDto: CreateArticuloDto): Promise<Articulo> {
      const nuevoArticulo = new this.articuloModel(createArticuloDto);
      return nuevoArticulo.save();
    }

    async update(id: string, articulo: UpdateArticuloDto): Promise<Articulo> {
      const updatedArticulo = await this.articuloModel.findByIdAndUpdate(
        id,
        { $set: articulo as Record<string, any> },
        {
          new: true,
          runValidators: true,
        }
      ).exec();
    
      if (!updatedArticulo) {
        throw new NotFoundException(`No se pudo actualizar el artículo con ID ${id}`);
      }
    
      return updatedArticulo;
    }
    
      async delete(id: string): Promise<Articulo> {
        const deletedArticulo = await this.articuloModel.findByIdAndDelete(id).exec();
        if (!deletedArticulo) {
          throw new NotFoundException(`No se pudo eliminar el artículo con ID ${id} porque no se encontró`)
        }
        return deletedArticulo;
      }

}