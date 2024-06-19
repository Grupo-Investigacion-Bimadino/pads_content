import { Module } from '@nestjs/common';
import { ComentService } from './coment.service';
import { ComentController } from './coment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentSchema } from './schemas/Coment.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Coment', schema: ComentSchema }])],
  controllers: [ComentController],
  providers: [ComentService],
})
export class ComentModule {}
