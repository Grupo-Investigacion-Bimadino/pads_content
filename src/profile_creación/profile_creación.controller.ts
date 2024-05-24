import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfileCreaciónService } from './profile_creación.service';
import { CreateProfileCreaciónDto } from './dto/create-profile_creación.dto';
import { UpdateProfileCreaciónDto } from './dto/update-profile_creación.dto';

@Controller('profile-creación')
export class ProfileCreaciónController {
  constructor(private readonly profileCreaciónService: ProfileCreaciónService) {}

  @Post()
  create(@Body() createProfileCreaciónDto: CreateProfileCreaciónDto) {
    return this.profileCreaciónService.create(createProfileCreaciónDto);
  }

  @Get()
  findAll() {
    return this.profileCreaciónService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileCreaciónService.findOne(+id);
  }

  @Put(':id') // Método PUT para actualizar el recurso completo
  update(@Param('id') id: string, @Body() updateProfileCreaciónDto: UpdateProfileCreaciónDto) {
    return this.profileCreaciónService.update(+id, updateProfileCreaciónDto);
  }

  @Patch(':id') // Método PATCH para actualizar el recurso parcialmente
  partialUpdate(@Param('id') id: string, @Body() updateProfileCreaciónDto: UpdateProfileCreaciónDto) {
    return this.profileCreaciónService.partialUpdate(+id, updateProfileCreaciónDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileCreaciónService.remove(+id);
  }
}
