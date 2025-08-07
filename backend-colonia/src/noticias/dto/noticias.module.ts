import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Noticias, NoticiasSchema } from './noticias.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Noticias.name, schema: NoticiasSchema }])],
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}
