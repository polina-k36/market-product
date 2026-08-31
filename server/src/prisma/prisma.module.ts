import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // чтобы не импортировать в каждый модуль мы разрешаем доступ всем сервисам доступ к эому модулю
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
