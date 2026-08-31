import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcrypt';
import { isEmail, isPhoneNumber } from 'class-validator';
import { NotFoundError } from 'rxjs';

interface ICreateDataUser {
  name: string;
  passwordHash: string;
  phone?: string;
  email?: string;
}

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  fields = {id: true, name: true, email: true, phone: true, passwordHash: true, role: true};

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.login },
          { phone: createUserDto.login },
        ]
      }
    });

    if (user) throw new ConflictException('This email or phone number is already in use.');

    const dataUser: ICreateDataUser = {
      name: createUserDto.name,
      passwordHash: await bcrypt.hash(createUserDto.password, 5),
    }

    if (isEmail(createUserDto.login)) {
      dataUser.email = createUserDto.login;
    } 
    else if (isPhoneNumber(createUserDto.login, 'RU')) {
      dataUser.phone = createUserDto.login;
    }

    const createdUser = await this.prisma.user.create({
      data: dataUser,
      select: {id: true, name: true, email: true, phone: true, role: true}
    })

    return {
      success: true,
      data: createdUser
    }
  }

  getAll() {
    return `This action returns all users`;
  }

  getUserById(id: number) {
    const user = this.prisma.user.findUnique({
      where: {id},
      select: this.fields
    });
    if (!user) throw new NotFoundException('');
    return user; 
  }

  getUserByLogin(login: string) {
    const user = this.prisma.user.findFirst({
      where: {
        OR: [
          { email: login },
          { phone: login }
        ]
      },
      select: this.fields
    });
    if (!user) throw new NotFoundException('');
    return user; 
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
