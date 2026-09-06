import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcrypt';
import { isEmail, isPhoneNumber } from 'class-validator';
import { NotFoundError } from 'rxjs';
import { VerificationType } from '../verifications/enums/verification-type.enum.js';
import { Prisma } from '../generated/prisma/client.js';

interface ICreateDataUser {
  name: string;
  passwordHash?: string;
  phone?: string;
  email?: string;
}

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

  async create(createUserDto: CreateUserDto, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;

    const user = await client.user.findFirst({
      where: {
        OR: [{ email: createUserDto.login }, { phone: createUserDto.login }],
      },
    });

    if (user)
      throw new ConflictException(
        'This email or phone number is already in use.',
      );

    const dataUser: ICreateDataUser = {
      name: createUserDto.name,
      passwordHash: createUserDto.password
        ? await bcrypt.hash(createUserDto.password, 5)
        : undefined,
    };

    if (createUserDto.login) {
      if (isEmail(createUserDto.login)) {
        dataUser.email = createUserDto.login;
      } else if (isPhoneNumber(createUserDto.login, 'RU')) {
        dataUser.phone = createUserDto.login;
      }
    }

    return client.user.create({
      data: dataUser,
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
