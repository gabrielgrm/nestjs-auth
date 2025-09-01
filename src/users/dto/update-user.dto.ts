import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import type { Roles } from 'generated/prisma';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  name: string;
  email: string;
  password: string;
  role: Roles;
}


