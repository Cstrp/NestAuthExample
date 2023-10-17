import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/services/prisma.service';
import { prismaMock } from '../../utils/prismaMock';
import { CreateUserDto } from '../dto/create-user.dto';

describe('User service', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error when creating a user with missing required fields', async () => {
    let error;

    try {
      await service.create({
        username: 'test',
        email: 'test@example.com',
      } as CreateUserDto);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('data and salt arguments required');
  });
});
