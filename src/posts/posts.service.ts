import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export class PostsService {
  constructor(
    private prismaService: PrismaService,
    private abilityService: CaslAbilityService,
  ) {}

  async create(createPostDto: CreatePostDto & { authorId: string }) {
    const ability = this.abilityService.ability;

    if (!ability.can('create', 'Post')) {
      throw new ForbiddenException(
        'You do not have permission to create a post.',
      );
    }

    return this.prismaService.post.create({ data: createPostDto });
  }

  async findAll(filter?: { published?: boolean }) {
    const ability = this.abilityService.ability;

    if (!ability.can('read', 'Post')) {
      throw new ForbiddenException('You do not have permission to read posts.');
    }

    return this.prismaService.post.findMany({ where: filter });
  }

  async findOne(id: string) {
    const ability = this.abilityService.ability;

    if (!ability.can('read', 'Post')) {
      throw new ForbiddenException('You do not have permission to read posts.');
    }

    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const ability = this.abilityService.ability;

    if (!ability.can('update', 'Post')) {
      throw new ForbiddenException(
        'You do not have permission to update this post.',
      );
    }

    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return this.prismaService.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: string) {
    const ability = this.abilityService.ability;

    if (!ability.can('delete', 'Post')) {
      throw new ForbiddenException(
        'You do not have permission to delete this post.',
      );
    }

    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return this.prismaService.post.delete({ where: { id } });
  }
}
