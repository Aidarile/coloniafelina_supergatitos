import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatosModule } from './gatos/gatos.module';
import { ArticulosModule } from './articulos/articulos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NoticiasModule } from './noticias/dto/noticias.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(), // <-- para inicializar la variable .ENV
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    GatosModule,
    ArticulosModule,
    AuthModule,
    UsersModule,
    NoticiasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}