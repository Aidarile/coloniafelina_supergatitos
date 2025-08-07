import { Module } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { GatosController } from './gatos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gatos, GatoSchema } from './gatos.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Gatos.name, schema: GatoSchema}])],
  controllers: [GatosController],
  providers: [GatosService],
})

export class GatosModule {}
