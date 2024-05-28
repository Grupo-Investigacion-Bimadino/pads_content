import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
  create(createPartnerDto: CreatePartnerDto) {
    return 'This action adds a new partner';
  }

  findAll() {
    return [
      {
        id: 1,
        email: 'example123@gmail.com',
        password: 'exam092312',
      },
      {
        id: 2,
        email: 'ejemplo456@gmail.com',
        password: 'eje236789',
      },
      {
        id: 3,
        email: 'database2@gmail.com',
        password: 'daba789@',
      },
    ];
  }

  findOne(id: number) {
    return {
      id: 2,
      email: 'ejemplo456@gmail.com',
      password: 'eje236789',
    };
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return updatePartnerDto;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }

  partialUpdate(id: number, updatePartnerDto: UpdatePartnerDto) {
    return updatePartnerDto;
  }
}
