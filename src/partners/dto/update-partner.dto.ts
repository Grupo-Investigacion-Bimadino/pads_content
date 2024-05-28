import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerDto } from './create-partner.dto';

export class UpdatePartnerDto {
  email?: string;
  password?: string;
}
