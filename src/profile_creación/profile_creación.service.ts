import { Injectable } from '@nestjs/common';
import { CreateProfileCreaciónDto } from './dto/create-profile_creación.dto';
import { UpdateProfileCreaciónDto } from './dto/update-profile_creación.dto';

@Injectable()
export class ProfileCreaciónService {
  partialUpdate(arg0: number, updateProfileCreaciónDto: UpdateProfileCreaciónDto) {
    throw new Error('Method not implemented.');
  }
  create(createProfileCreaciónDto: CreateProfileCreaciónDto) {
    return 'This action adds a new profileCreación';
  }

  findAll() {
    return `This action returns all profileCreación`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileCreación`;
  }

  update(id: number, updateProfileCreaciónDto: UpdateProfileCreaciónDto) {
    return `This action updates a #${id} profileCreación`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileCreación`;
  }
}
