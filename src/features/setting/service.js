import { post, get, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  getSettings: () => `/employer-setting/userId`,
  postSettings: () => `/employer-setting`,
  updateSettings: () => `/employer-setting/edit`,
  deleteAccount: () => `/user/account-delete`,
  postFeedback: () => `/user/feedback`,
  updatePassword: () => `/user/change-password`,
};

export const updatePassword = (body) =>
  put(SERVICE_URLS.updatePassword(), body);

export const getSettings = (id) => get(SERVICE_URLS.getSettings());

export const createSettings = () => post(SERVICE_URLS.postSettings());

export const updateSettings = (body) =>
  put(SERVICE_URLS.updateSettings(), body);

export const deleteAccount = () => {
  del(SERVICE_URLS.deleteAccount());
};

export const postFeedback = (body) => post(SERVICE_URLS.postFeedback(), body);
