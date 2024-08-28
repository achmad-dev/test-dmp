import { Module } from '@nestjs/common';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
