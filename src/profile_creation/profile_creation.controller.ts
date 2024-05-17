import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileCreationService } from './profile_creation.service';
import { CreateProfileCreationDto } from './dto/create-profile_creation.dto';
import { UpdateProfileCreationDto } from './dto/update-profile_creation.dto';

@Controller('profile-creation')
export class ProfileCreationController {
  constructor(private readonly profileCreationService: ProfileCreationService) {}

  @Post()
  create(@Body() createProfileCreationDto: CreateProfileCreationDto) {
    return this.profileCreationService.create(createProfileCreationDto);
  }

  @Get()
  findAll() {
    return this.profileCreationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileCreationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileCreationDto: UpdateProfileCreationDto) {
    return this.profileCreationService.update(+id, updateProfileCreationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileCreationService.remove(+id);
  }
}
