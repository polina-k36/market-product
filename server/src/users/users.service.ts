import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcrypt';
import { VerificationType } from '../verifications/enums/verification-type.enum.js';
import { Prisma } from '../generated/prisma/client.js';
import { ICreateDataUser } from './interfaces/create-data-user.interface.js';
import { SessionsService } from '../sessions/sessions.service.js';
import { UserIdentitiesService } from '../user-identities/user-identities.service.js';
import { FilterUsersDto } from './dto/filter-users.dto.js';
import { normalizePhone } from '../common/utils/phone.util.js';
import { GetUsersQueryDto } from './dto/get-users-query.dto.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sessionsService: SessionsService,
    private readonly userIdentitiesService: UserIdentitiesService,
  ) {}

  fields = {
    id: true,
    name: true,
    email: true,
    emailVerified: true,
    phone: true,
    passwordHash: true,
    role: true,
    isBanned: true,
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
        isDeleted: false,
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
        isBanned: true,
      },
    });
  }

  async getAll(query: GetUsersQueryDto) {
    const { page, limit, ...filters } = query;

    const where = this.buildFilters(filters);

    const [total, users] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      page,
      limit,
      total,
      totalPages,
      data: users,
    };
  }

  buildFilters(filters: FilterUsersDto): Prisma.UserWhereInput {
    const { name, phone, email, emailVerified, roleId, isBanned } = filters;

    const where: Prisma.UserWhereInput = {
      isDeleted: false,
      email,
      emailVerified,
      roleId,
      isBanned,
      phone: phone ? normalizePhone(phone) : undefined,
      name: {
        contains: name,
      },
    };
    return where;
  }

  getUserById(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id, isDeleted: false },
      select: this.fields,
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  getUsersContactInfoById(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id, isDeleted: false },
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
        isDeleted: false,
      },
      select: this.fields,
    });
    if (!user) throw new NotFoundException('');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id, isDeleted: true },
      select: {
        email: true,
        isBanned: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.isBanned) {
      throw new ForbiddenException('Your account has been banned.');
    }

    const emailChanged =
      updateUserDto.email !== undefined && updateUserDto.email !== user.email;

    return await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        emailVerified: emailChanged ? false : undefined,
      },
    });
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
          where: { id, isDeleted: false },
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
    //добавить удаление адресов и подумать над картами но они хранятся в заказе пожтому стоит быть аккуратнее(возможно оставлять данные о карте пустыми и все)
    this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        data: { isDeleted: true },
        where: {
          id,
        },
      });
      await this.sessionsService.removeByUserId(id, tx);
      tx.verification.deleteMany({
        where: { userId: id },
      });
      await this.userIdentitiesService.removeByUserId(id, tx);
    });
  }
}
