import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  create(createContentDto: CreateContentDto) {
    return createContentDto;
  }

  findAll() {
    return [
      {
        id: 1,
        type: 'presentation',
        format: 'PowerPoint',
        title: 'Introduction to Biology',
        description:
          'A PowerPoint presentation covering the basics of biology.',
        size: '2MB',
        edition_type: 'first',
      },
      {
        id: 2,
        type: 'video',
        format: 'MP4',
        title: 'Photosynthesis Process',
        description: 'A video explaining the process of photosynthesis.',
        size: '500MB',
        edition_type: 'HD',
      },
      {
        id: 3,
        type: 'document',
        format: 'PDF',
        title: 'Math Exercises',
        description: 'A PDF document containing various math exercises.',
        size: '1MB',
        edition_type: 'standard',
      },
    ];
  }

  findOne(id: number) {
    return {
      id: 1,
      type: 'presentation',
      format: 'PowerPoint',
      title: 'Introduction to Biology',
      description: 'A PowerPoint presentation covering the basics of biology.',
      size: '2MB',
      edition_type: 'first',
    };
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return updateContentDto;
  }

  remove(id: number) {
    return id;
  }

  partialUpdate(id: number, updateContentDto: UpdateContentDto) {
    return updateContentDto;
  }
}
