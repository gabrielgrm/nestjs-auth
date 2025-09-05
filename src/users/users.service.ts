import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private abilityService: CaslAbilityService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const ability = this.abilityService.ability;

    if (!ability.can('create', 'User')) {
      throw new ForbiddenException(
        'You do not have permission to create a user.',
      );
    }

    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      },
    });
  }

  async findAll() {
    const ability = this.abilityService.ability;

    if (!ability.can('read', 'User')) {
      throw new ForbiddenException('You do not have permission to read users.');
    }

    return this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    const ability = this.abilityService.ability;

    if (!ability.can('read', 'User')) {
      throw new ForbiddenException('You do not have permission to read users.');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const ability = this.abilityService.ability;

    if (!ability.can('update', 'User')) {
      throw new ForbiddenException(
        'You do not have permission to update this user.',
      );
    }

    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: updateUserDto.password
          ? bcrypt.hashSync(updateUserDto.password, 10)
          : undefined,
      },
    });
  }

  async remove(id: string) {
    const ability = this.abilityService.ability;

    if (!ability.can('delete', 'User')) {
      throw new ForbiddenException(
        'You do not have permission to delete this user.',
      );
    }

    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
