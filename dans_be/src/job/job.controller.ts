import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { JobsService } from './job.service';
import { JwtAuthGuard } from 'src/auth/jwt-aut.guard';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getJobs(
    @Query('description') description?: string,
    @Query('location') location?: string,
    @Query('full_time') fullTime?: string,
    @Query('page') page?: string,
  ) {
    try {
      return this.jobsService.getJobs(description, location, fullTime, page);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getJobDetail(@Param('id') id: string) {
    try {
      return this.jobsService.getJobDetail(id);
    } catch (error) {
      throw error;
    }
  }
}
