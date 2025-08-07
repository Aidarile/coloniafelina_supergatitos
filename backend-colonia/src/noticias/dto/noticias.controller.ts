import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { Noticias } from './noticias.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Get()
  findAll(): Promise<Noticias[]> {
    return this.noticiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Noticias> {
    return this.noticiasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() noticia: Noticias): Promise<Noticias> {
    return this.noticiasService.create(noticia);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() noticia: Partial<Noticias>): Promise<Noticias> {
    return this.noticiasService.update(id, noticia);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Noticias> {
    return this.noticiasService.delete(id);
  }
}
