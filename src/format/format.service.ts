import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';

@Injectable()
export class FormatService {
  private formats = [
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

  create(createFormatDto: CreateFormatDto) {
    const newFormat = {
      id: this.formats.length + 1,
      ...createFormatDto,
    };
    this.formats.push(newFormat);
    return newFormat;
  }

  findAll() {
    return this.formats;
  }

  findOne(id: number) {
    const format = this.formats.find((f) => f.id === id);
    if (!format) {
      throw new NotFoundException(`Format with ID ${id} not found`);
    }
    return format;
  }

  update(id: number, updateFormatDto: UpdateFormatDto) {
    const index = this.formats.findIndex((f) => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`Format with ID ${id} not found`);
    }
    // En el caso de PUT, reemplazamos todos los atributos del recurso
    const updatedFormat = {
      id,
      format_type:
        updateFormatDto.format_type || this.formats[index].format_type,
    };
    this.formats[index] = updatedFormat;
    return this.formats[index];
  }

  partialUpdate(id: number, updateFormatDto: UpdateFormatDto) {
    const index = this.formats.findIndex((f) => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`Format with ID ${id} not found`);
    }
    // En el caso de PATCH, actualizamos solo los atributos especificados
    const currentFormat = this.formats[index];
    this.formats[index] = { ...currentFormat, ...updateFormatDto };
    return this.formats[index];
  }

  remove(id: number) {
    const index = this.formats.findIndex((f) => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`Format with ID ${id} not found`);
    }
    const [removedFormat] = this.formats.splice(index, 1);
    return removedFormat;
  }
}
