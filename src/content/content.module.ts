import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './schemas/Content.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema }])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
