import axios from "axios";
import Cookies from "js-cookie";
import { LoginPayload, jobsListParams } from "@/model/request";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const baseRepository = {
  login(loginPayload: LoginPayload) {
    return instance.post("auth/login", {
      username: loginPayload.username,
      password: loginPayload.password,
    });
  },
  getAllJob(params: jobsListParams) {
    const url = `/jobs?page=${params.page}&description=${params.description}&location=${params.location}&full_time=${params.full_time}`;
    return instance.get(url, {
        headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
    });
  },
  getJobById(id: string) {
    return instance.get(`/jobs/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
    });
  },
};

export default baseRepository;