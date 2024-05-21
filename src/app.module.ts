import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { ComentModule } from './coment/coment.module';
import { FormatModule } from './format/format.module';
import { ProfileCreaciónModule } from './profile_creación/profile_creación.module';
import { TeamModule } from './team/team.module';
import { PartnersModule } from './partners/partners.module';

@Module({
  imports: [ContentModule, ComentModule, FormatModule, ProfileCreaciónModule, TeamModule, PartnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
