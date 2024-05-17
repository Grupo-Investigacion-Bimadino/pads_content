import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileCreationDto } from './create-profile_creation.dto';

export class UpdateProfileCreationDto extends PartialType(CreateProfileCreationDto) {}
