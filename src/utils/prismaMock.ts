import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import 'jest';

const prisma = new PrismaClient();

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
