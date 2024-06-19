import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ComentService } from './coment.service';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';

@Controller('coment')
export class ComentController {
  constructor(private readonly comentService: ComentService) {}

  @Post()
  create(@Body() createComentDto: CreateComentDto) {
    return this.comentService.create(createComentDto);
  }

  @Get()
  findAll() {
    return this.comentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentService.findOne('id');
  }

  @Put(':id') // Método PUT para actualizar el recurso completo
  update(@Param('id') id: string, @Body() updateComentDto: UpdateComentDto) {
    return this.comentService.update(id, updateComentDto);
  }

  @Patch(':id') // Método PATCH para actualizar el recurso parcialmente
  partialUpdate(@Param('id') id: string, @Body() updateComentDto: UpdateComentDto) {
    return this.comentService.update(id, updateComentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentService.remove(id);
  }
}
