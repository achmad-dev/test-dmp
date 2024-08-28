export interface LoginPayload {
  username: string;
  password: string;
}

export interface jobsListParams {
  description?: string;
  location?: string;
  full_time?: string;
  page?: string;
}