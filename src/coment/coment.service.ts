import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';

@Injectable()
export class ComentService {
  private comments = [
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

  create(createComentDto: CreateComentDto) {
    const newComment = {
      ID: this.comments.length + 1,
      fecha_creacion: new Date().toISOString(),
      comentario: createComentDto.comentario,
      id_usuario: createComentDto.id_usuario,
    };
    this.comments.push(newComment);
    return newComment;
  }

  findAll() {
    return this.comments;
  }

  findOne(id: number) {
    const comment = this.comments.find((c) => c.ID === id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  update(id: number, updateComentDto: UpdateComentDto) {
    const index = this.comments.findIndex((c) => c.ID === id);
    if (index === -1) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    this.comments[index] = { ...this.comments[index], ...updateComentDto };
    return this.comments[index];
  }

  remove(id: number) {
    const index = this.comments.findIndex((c) => c.ID === id);
    if (index === -1) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    const [removedComment] = this.comments.splice(index, 1);
    return removedComment;
  }

  partialUpdate(id: number, updateComentDto: UpdateComentDto) {
    return this.update(id, updateComentDto); // Aquí puedes personalizar la lógica si es necesario
  }
}
