import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FormatService } from './format.service';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';

@Controller('format')
export class FormatController {
  constructor(private readonly formatService: FormatService) {}

  @Post()
  create(@Body() createFormatDto: CreateFormatDto) {
    return this.formatService.create(createFormatDto);
  }

  @Get()
  findAll() {
    return this.formatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatService.findOne(+id);
  }

  @Put(':id') // Método PUT para actualizar el recurso completo
  update(@Param('id') id: string, @Body() updateFormatDto: UpdateFormatDto) {
    return this.formatService.update(+id, updateFormatDto);
  }

  @Patch(':id') // Método PATCH para actualizar el recurso parcialmente
  partialUpdate(
    @Param('id') id: string,
    @Body() updateFormatDto: UpdateFormatDto,
  ) {
    return this.formatService.partialUpdate(+id, updateFormatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formatService.remove(+id);
  }
}
