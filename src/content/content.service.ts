import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
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

  update(id: string, updateContentDto: UpdateContentDto) {
    return this.contentModel
      .findByIdAndUpdate(id, updateContentDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.contentModel.findByIdAndDelete(id).exec();
  }
}