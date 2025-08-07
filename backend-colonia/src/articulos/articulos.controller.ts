import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ArticulosService } from "./articulos.service";
import { Articulo } from "./articulos.schema";
import { CreateArticuloDto } from "./dto/create-articulo-dto";
import { UpdateArticuloDto } from "./dto/update-articulo.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";

@Controller('articulos')
export class ArticulosController {
    constructor(private readonly articulosService: ArticulosService) {}

    @Get()
    findAll(): Promise<Articulo[]> {
        return this.articulosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Articulo> {
        return this.articulosService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createArticuloDto: CreateArticuloDto): Promise<Articulo> {
      return this.articulosService.create(createArticuloDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateArticuloDto: UpdateArticuloDto): Promise<Articulo> {
      return this.articulosService.update(id, updateArticuloDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<Articulo> {
        return this.articulosService.delete(id);
    }
}