import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { encrypt } from '../../utils';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    const password = this.hashedPasswd(createUserDto.password);
    const data = { ...createUserDto, password };

    return await this.prismaService.user.create({ data });
  }

  public async findAll() {
    return await this.prismaService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  public async findOne(id: string) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: { id },
        select: {
          id: true,
          username: true,
          email: true,
          refreshToken: true,
        },
      });
    } catch (err) {
      throw new NotFoundException(`User with id ${id} not found`, err);
    }
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

  private hashedPasswd(passwd: string) {
    return encrypt(passwd);
  }
}
