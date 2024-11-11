import { post, get, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  getConnected: (params) => `/connect/connected-list?${params}`,
  changeAppliedStatus: () => `/connect/change-status`,
  applyToJob: () => `/connect/apply-job`,
  getJobPost: () => `/job-post`,
};

export const getConnected = (params = "page=1&limit=100") =>
  get(SERVICE_URLS.getConnected(params));

export const changeAppliedStatus = (body) =>
  put(SERVICE_URLS.changeAppliedStatus(), body);

export const getJobPost = () => {
  return get(SERVICE_URLS.getJobPost());
};

export const applyToJob = (body) => put(SERVICE_URLS.applyToJob(), body);
