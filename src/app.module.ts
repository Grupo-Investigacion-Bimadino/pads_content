import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { ComentModule } from './coment/coment.module';
import { FormatModule } from './format/format.module';
import { TeamModule } from './team/team.module';
import { PartnersModule } from './partners/partners.module';
import { ProfileCreationModule } from './profile_creation/profile_creation.module';

@Module({
  imports: [
    ContentModule,
    ComentModule,
    FormatModule,
    TeamModule,
    PartnersModule,
    ProfileCreationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
