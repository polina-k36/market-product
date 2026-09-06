import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcrypt';
import { VerificationType } from '../verifications/enums/verification-type.enum.js';
import { Prisma } from '../generated/prisma/client.js';
import { ICreateDataUser } from './interfaces/create-data-user.interface.js';
import { unescape } from 'querystring';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  fields = {
    id: true,
    name: true,
    email: true,
    emailVerified: true,
    phone: true,
    passwordHash: true,
    role: true,
  };

  async create(createData: ICreateDataUser, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    const user = await client.user.findFirst({
      where: {
        OR: [
          {
            email: createData.email,
          },
          {
            phone: createData.phone,
          },
        ],
      },
    });

    if (user)
      throw new ConflictException(
        'This email or phone number is already in use.',
      );

    const { password, ...createDataWithoutPassword } = createData;

    return client.user.create({
      data: {
        passwordHash: password ? await bcrypt.hash(password, 4) : null,
        ...createDataWithoutPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        phone: true,
        role: true,
      },
    });
  }

  getAll() {
    return `This action returns all users`;
  }

  getUserById(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id },
      select: this.fields,
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  getUsersContactInfoById(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id },
      select: {
        phone: true,
        email: true,
      },
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  getUserByLogin(login: string) {
    const user = this.prisma.user.findFirst({
      where: {
        OR: [{ email: login }, { phone: login }],
      },
      select: this.fields,
    });
    if (!user) throw new NotFoundException('');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  updateVerificationStatus(
    id: number,
    type: VerificationType,
    verified: boolean,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;

    switch (type) {
      case VerificationType.EMAIL:
        return client.user.update({
          where: { id },
          data: {
            emailVerified: verified,
          },
          select: {
            id: true,
            emailVerified: true,
            role: true,
          },
        });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
