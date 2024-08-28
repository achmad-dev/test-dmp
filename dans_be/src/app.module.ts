import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

import { JobsModule } from './job/job.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserExistsMiddleware } from './auth/auth.middleware';

@Module({
  imports: [AuthModule, JobsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserExistsMiddleware).forRoutes('jobs');
  }
}
