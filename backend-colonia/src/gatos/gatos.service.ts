import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GatoDocument, Gatos } from './gatos.schema';
import { Model } from 'mongoose';

@Injectable()
export class GatosService {
  constructor(@InjectModel(Gatos.name) private gatoModel: Model<GatoDocument>) {}

  async findAll(): Promise<Gatos[]> {
    return this.gatoModel.find().exec();
  }

  async findOne(id: string): Promise<Gatos> {
    const gato = await this.gatoModel.findById(id).exec();
    if (!gato) {
      throw new NotFoundException(`No se encontró el gato con ID ${id}`);
    }
    return gato;
  }

  async findByEstado(estado: string): Promise<Gatos[]> {
    return this.gatoModel.find({ estado }).exec();
  }

  async findBySexo(sexo: string): Promise<Gatos[]> {
    return this.gatoModel.find({ sexo }).exec();
  }

  async create(gato: Gatos): Promise<Gatos> {
    // gato.descripcion = this.limitarDescripcion(gato.descripcion);
    const nuevoGato = new this.gatoModel(gato);
    return nuevoGato.save();
  }

  async update(id: string, gato: Partial<Gatos>): Promise<Gatos> {
    const updatedGato = await this.gatoModel.findByIdAndUpdate(id, {$set: gato}, {
      new: true,
      runValidators: true}).exec();
    if (!updatedGato) {
      throw new NotFoundException(`No se pudo actualizar el gato con ID ${id}`);
    }
    return updatedGato;
  }

  async delete(id: string): Promise<Gatos> {
    const deletedGato = await this.gatoModel.findByIdAndDelete(id).exec();
    if (!deletedGato) {
      throw new NotFoundException(`No se pudo eliminar el gato con ID ${id} porque no se encontró`)
    }
    return deletedGato;
  }

  // private limitarDescripcion(descripcion: string): string {
  //   const maxCaracteres = 150;
  //   if (descripcion.length > maxCaracteres) {
  //     return descripcion.substring(0, maxCaracteres) + '...';
  //   }
  //   return descripcion;
  // }
}
