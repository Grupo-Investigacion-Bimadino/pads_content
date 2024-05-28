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
import { PartnersService, Partner } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto): Partner {
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  findAll(): Partner[] {
    return this.partnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Partner {
    return this.partnersService.findOne(+id);
  }

  @Put(':id') // Método PUT para actualizar el recurso completo
  update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ): Partner {
    return this.partnersService.update(+id, updatePartnerDto);
  }

  @Patch(':id') // Método PATCH para actualizar el recurso parcialmente
  partialUpdate(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ): Partner {
    return this.partnersService.partialUpdate(+id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Partner {
    return this.partnersService.remove(+id);
  }
}
