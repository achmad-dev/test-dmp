import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JobsService {
  private readonly apiUrl =
    'https://dev6.dansmultipro.com/api/recruitment/positions';

  constructor(private httpService: HttpService) {}

  async getJobs(
    description?: string,
    location?: string,
    fullTime?: string,
    page?: string,
  ) {
    const params: any = {};
    if (description) params.description = description;
    if (location) params.location = location;
    if (fullTime === 'true') params.full_time = 'true';
    if (page) params.page = page;

    const response = await lastValueFrom(
      this.httpService.get(this.apiUrl + '.json', { params }),
    );
    return response.data;
  }

  async getJobDetail(id: string) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.apiUrl}/${id}`),
    );
    return response.data;
  }
}
