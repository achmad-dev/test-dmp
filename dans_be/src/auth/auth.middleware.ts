import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = req['user']; // The user object is attached by the JwtAuthGuard

    if (!user) {
      next();
      return;
    }

    const dbUser = await this.prismaService.user.findUnique({
      where: { username: user.username },
    });

    if (!dbUser) {
      throw new UnauthorizedException('User not found in the database');
    }

    next();
  }
}
