import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [PrismaModule, CaslModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
