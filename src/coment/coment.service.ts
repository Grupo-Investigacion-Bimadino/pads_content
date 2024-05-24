import { Injectable } from '@nestjs/common';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';

@Injectable()
export class ComentService {
  create(createComentDto: CreateComentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateComentDto: UpdateComentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  partialUpdate(id: number, updateComentDto: UpdateComentDto) {
    return `This action partially updates a #${id} comment`;
  }
}
