import { post, get, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  getCandidates: () => `/employment-activities?page=1&limit=10`,
};

export const getCandidates = () => get(SERVICE_URLS.getCandidates());
