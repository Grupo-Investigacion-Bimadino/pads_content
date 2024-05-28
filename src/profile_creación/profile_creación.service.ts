import { Injectable } from '@nestjs/common';
import { CreateProfileCreaciónDto } from './dto/create-profile_creación.dto';
import { UpdateProfileCreaciónDto } from './dto/update-profile_creación.dto';

@Injectable()
export class ProfileCreaciónService {
  create(createProfileCreaciónDto: CreateProfileCreaciónDto) {
    return 'This action adds a new profileCreación';
  }

  findAll() {
    return [
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
        id: 1,
        email: 'profile3@hotmail.com',
        password: 'passw7865@',
        role: 'student',
      },
    ];
  }

  findOne(id: number) {
    return {
      id: 1,
      email: 'profile3@hotmail.com',
      password: 'passw7865@',
      role: 'student',
    };
  }

  update(id: number, updateProfileCreaciónDto: UpdateProfileCreaciónDto) {
    return updateProfileCreaciónDto;
  }

  remove(id: number) {
    return `This action removes a #${id} profileCreación`;
  }

  partialUpdate(
    id: number,
    updateProfileCreaciónDto: UpdateProfileCreaciónDto,
  ) {
    return updateProfileCreaciónDto;
  }
}
