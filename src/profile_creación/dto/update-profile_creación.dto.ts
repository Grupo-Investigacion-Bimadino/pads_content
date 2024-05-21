import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileCreaciónDto } from './create-profile_creación.dto';

export class UpdateProfileCreaciónDto extends PartialType(CreateProfileCreaciónDto) {}
