import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    await this.createDemoUser();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async createDemoUser() {
    const existingUser = await this.user.findUnique({
      where: { username: 'demo' },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password', 10);
      await this.user.create({
        data: {
          username: 'demo',
          password: hashedPassword,
        },
      });
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
