import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { Gatos } from './gatos.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('gatos')
export class GatosController {
  constructor(private readonly gatosService: GatosService) {}

  @Get()
  findAll(): Promise<Gatos[]> {
    return this.gatosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Gatos> {
    return this.gatosService.findOne(id);
  }

  @Get('estado/:estado')
  obtenerPorEstado(@Param('estado') estado: string): Promise<Gatos[]> {
    return this.gatosService.findByEstado(estado);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() gato: Gatos): Promise<Gatos> {
    return this.gatosService.create(gato);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() gato: Partial<Gatos>): Promise<Gatos> {
    return this.gatosService.update(id, gato);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Gatos> {
    return this.gatosService.delete(id);
  }
}