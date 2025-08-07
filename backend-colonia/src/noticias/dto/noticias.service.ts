import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Noticias, NoticiasDocument } from './noticias.schema';
import { Model } from 'mongoose';

@Injectable()
export class NoticiasService {
  constructor(@InjectModel(Noticias.name) private noticiasModel: Model<NoticiasDocument>) {}

  async findAll(): Promise<Noticias[]> {
    return this.noticiasModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Noticias> {
    const noticia = await this.noticiasModel.findById(id).exec();
    if (!noticia) {
      throw new NotFoundException(`No se encontró la noticia con ID ${id}`);
    }
    return noticia;
  }

  async create(noticia: Noticias): Promise<Noticias> {
    const nuevaNoticia = new this.noticiasModel(noticia);
    return nuevaNoticia.save();
  }

  async update(id: string, noticia: Partial<Noticias>): Promise<Noticias> {
    const updatedNoticia = await this.noticiasModel.findByIdAndUpdate(id, { $set: noticia }, { new: true, runValidators: true }).exec();
    if (!updatedNoticia) {
      throw new NotFoundException(`No se pudo actualizar la noticia con ID ${id}`);
    }
    return updatedNoticia;
  }

  async delete(id: string): Promise<Noticias> {
    const deletedNoticia = await this.noticiasModel.findByIdAndDelete(id).exec();
    if (!deletedNoticia) {
      throw new NotFoundException(`No se pudo eliminar la noticia con ID ${id}`);
    }
    return deletedNoticia;
  }
}
