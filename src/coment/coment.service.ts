import { Injectable } from '@nestjs/common';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';
import { UpdateContentDto } from 'src/content/dto/update-content.dto';

@Injectable()
export class ComentService {
  create(createComentDto: CreateComentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return [
      {
        ID: 1,
        fecha_creacion: '2024-05-23',
        comentario: 'Este es el primer comentario.',
        id_usuario: 12345,
      },
      {
        ID: 2,
        fecha_creacion: '2024-05-24',
        comentario: 'Este es el segundo comentario.',
        id_usuario: 54321,
      },
      {
        ID: 3,
        fecha_creacion: '2024-05-25',
        comentario: 'Este es el tercer comentario.',
        id_usuario: 98765,
      },
      {
        ID: 4,
        fecha_creacion: '2024-05-26',
        comentario: 'Este es el cuarto comentario.',
        id_usuario: 13579,
      },
    ];
  }

  findOne(id: number) {
    return {
      ID: 1,
      fecha_creacion: '2024-05-23',
      comentario: 'Este es el primer comentario.',
      id_usuario: 12345,
    };
  }

  update(id: number, updateComentDto: UpdateComentDto) {
    return updateComentDto;
  }

  remove(id: number) {
    return id;
  }

  partialUpdate(id: number, updateComentDto: UpdateComentDto) {
    return updateComentDto;
  }
}
