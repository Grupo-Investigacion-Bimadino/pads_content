import { PartialType } from '@nestjs/mapped-types';
import { CreateComentDto } from './create-coment.dto';

export class UpdateComentDto {
  comentario?: string;
  id_usuario?: number;
}
