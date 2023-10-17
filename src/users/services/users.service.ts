import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  public async findAll() {
    return await this.prismaService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async findOne(id: string) {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  public async remove(id: string) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
