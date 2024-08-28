export interface IJob {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  created_at: string;
}

export interface IJobDetail {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
}
