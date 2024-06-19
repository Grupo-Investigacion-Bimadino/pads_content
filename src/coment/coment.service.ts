import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coment } from './schemas/Coment.schemas';

@Injectable()
export class ComentService {
  constructor(@InjectModel(Coment.name) private comentModel: Model <Coment>) {}

  create(CreateComentDto: CreateComentDto) {
    const createdComent = new this.comentModel(CreateComentDto);
    return createdComent.save();
  }

  findAll() {
    return this.comentModel.find().exec();
  }

  findOne(id: string) {
    return this.comentModel.findById(id).exec();
  }

  update(id: string, UpdateComentDto: UpdateComentDto) {
    return this.comentModel
      .findByIdAndUpdate(id, UpdateComentDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.comentModel.findByIdAndDelete(id).exec();
  }
}
