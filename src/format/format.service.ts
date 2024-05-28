import { Injectable } from '@nestjs/common';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';

@Injectable()
export class FormatService {
  create(createFormatDto: CreateFormatDto) {
    return 'This action adds a new format';
  }

  findAll() {
    return [
      {
        id: 1,
        format_type: 'presentation',
      },
      {
        id: 2,
        format_type: 'video',
      },
      {
        id: 3,
        format_type: 'ppxt',
      },
    ];
  }

  findOne(id: number) {
    return {
      id: 1,
      format_type: 'presentation',
    };
  }

  update(id: number, updateFormatDto: UpdateFormatDto) {
    return updateFormatDto;
  }

  remove(id: number) {
    return `This action removes a #${id} format`;
  }

  partialUpdate(id: number, updateFormatDto: UpdateFormatDto) {
    return updateFormatDto;
  }
}
