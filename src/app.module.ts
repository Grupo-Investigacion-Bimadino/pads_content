import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { contenidoModule } from './content/contenido.module';
import { \[contenido\]Module } from './[contenido/]/[contenido/].module';
import { ContenidoModule } from './content/contenido.module';
import { ContentModule } from './content/content.module';
import { ComentModule } from './coment/coment.module';
import { TeamModule } from './team/team.module';
import { FormatModule } from './format/format.module';
import { ProfileCreationModule } from './profile_creation/profile_creation.module';
import { PartnersModule } from './partners/partners.module';

@Module({
  imports: [contenidoModule, \[contenido\]Module, ContenidoModule, ContentModule, ComentModule, TeamModule, FormatModule, ProfileCreationModule, PartnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
