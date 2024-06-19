import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-Content.dto';
import { UpdateContentDto } from './dto/update-Content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './schemas/Content.schemas';

@Injectable()
export class ContentService {
  constructor(@InjectModel(Content.name) private contentModel: Model <Content>) {}

  create(CreateContentDto: CreateContentDto) {
    const createdContent = new this.contentModel(CreateContentDto);
    return createdContent.save();
  }

  findAll() {
    return this.contentModel.find().exec();
  }

  findOne(id: string) {
    return this.contentModel.findById(id).exec();
  }

  update(id: string, UpdateComentDto: UpdateContentDto) {
    return this.contentModel
      .findByIdAndUpdate(id, UpdateContentDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.contentModel.findByIdAndDelete(id).exec();
  }
}