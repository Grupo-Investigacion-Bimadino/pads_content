import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile_creation.dto';
import { UpdateProfileDto } from './dto/update-profile_creation.dto';

export interface Profile {
  id: number;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class ProfileCreationService {
  private profiles: Profile[] = [
    {
      id: 1,
      email: 'profile1@hotmail.com',
      password: 'password1@',
      role: 'admin',
    },
    {
      id: 2,
      email: 'profile2@hotmail.com',
      password: 'pass0909@',
      role: 'teacher',
    },
    {
      id: 3,
      email: 'profile3@hotmail.com',
      password: 'passw7865@',
      role: 'student',
    },
  ];

  create(createProfileDto: CreateProfileDto): Profile {
    const newProfile: Profile = {
      id: this.profiles.length + 1,
      ...createProfileDto,
    };
    this.profiles.push(newProfile);
    return newProfile;
  }

  findAll(): Profile[] {
    return this.profiles;
  }

  findOne(id: number): Profile {
    const profile = this.profiles.find((p) => p.id === id);
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  update(id: number, updateProfileDto: UpdateProfileDto): Profile {
    const index = this.profiles.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    // En el caso de PUT, reemplazamos todos los atributos del recurso
    this.profiles[index] = { id, ...updateProfileDto } as Profile;
    return this.profiles[index];
  }

  partialUpdate(id: number, updateProfileDto: UpdateProfileDto): Profile {
    const index = this.profiles.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    // En el caso de PATCH, actualizamos solo los atributos especificados
    this.profiles[index] = { ...this.profiles[index], ...updateProfileDto };
    return this.profiles[index];
  }

  remove(id: number): Profile {
    const index = this.profiles.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    const [removedProfile] = this.profiles.splice(index, 1);
    return removedProfile;
  }
}
