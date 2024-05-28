import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

export interface Partner {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class PartnersService {
  private partners: Partner[] = [
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

  create(createPartnerDto: CreatePartnerDto): Partner {
    const newPartner: Partner = {
      id: this.partners.length + 1,
      ...createPartnerDto,
    };
    this.partners.push(newPartner);
    return newPartner;
  }

  findAll(): Partner[] {
    return this.partners;
  }

  findOne(id: number): Partner {
    const partner = this.partners.find((p) => p.id === id);
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto): Partner {
    const index = this.partners.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    // En el caso de PUT, reemplazamos todos los atributos del recurso
    this.partners[index] = { id, ...updatePartnerDto } as Partner;
    return this.partners[index];
  }

  partialUpdate(id: number, updatePartnerDto: UpdatePartnerDto): Partner {
    const index = this.partners.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    // En el caso de PATCH, actualizamos solo los atributos especificados
    this.partners[index] = { ...this.partners[index], ...updatePartnerDto };
    return this.partners[index];
  }

  remove(id: number): Partner {
    const index = this.partners.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    const [removedPartner] = this.partners.splice(index, 1);
    return removedPartner;
  }
}
