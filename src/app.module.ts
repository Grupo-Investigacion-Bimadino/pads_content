import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { ComentModule } from './coment/coment.module';
import { FormatModule } from './format/format.module';
import { TeamModule } from './team/team.module';
import { PartnersModule } from './partners/partners.module';
import { ProfileCreationModule } from './profile_creation/profile_creation.module';

import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

@Module({
  imports: [ ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
  MongooseModule.forRoot(process.env.DB_URI),
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
