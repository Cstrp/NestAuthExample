import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
})
export class UsersModule {}
