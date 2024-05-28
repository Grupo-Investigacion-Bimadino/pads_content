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
import { ProfileCreationService, Profile } from './profile_creation.service';
import { CreateProfileDto } from './dto/create-profile_creation.dto';
import { UpdateProfileDto } from './dto/update-profile_creation.dto';

@Controller('profile_creation')
export class ProfileCreationController {
  constructor(private readonly profileService: ProfileCreationService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto): Profile {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll(): Profile[] {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Profile {
    return this.profileService.findOne(+id);
  }

  @Put(':id') // Método PUT para actualizar el recurso completo
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Profile {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Patch(':id') // Método PATCH para actualizar el recurso parcialmente
  partialUpdate(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Profile {
    return this.profileService.partialUpdate(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Profile {
    return this.profileService.remove(+id);
  }
}
