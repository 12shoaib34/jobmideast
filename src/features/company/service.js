import { post, get, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  getCompanyProfile: (id) => `/company-profile/${id}`,
  getReviews: (id) => `/company-rating/get-by-companyId/${id}`,
  editCompanyProfile: (id) => `/company-profile/${id}`,
  uploadMultiPics: () => `/file-handle/multifile-upload`,
  uploadFile: () => `/file-handle/file-upload`,
  postReviewReply: () => `/review-reply`,
  getCompanyNameType: () => `/company-name-types`,
};

export const getCompanyProfile = (id) =>
  get(SERVICE_URLS.getCompanyProfile(id));
export const getReviews = (id) => get(SERVICE_URLS.getReviews(id));
export const editCompanyProfile = (id, body) =>
  put(SERVICE_URLS.editCompanyProfile(id), body);

export const uploadMultiPics = (body, params) =>
  post(SERVICE_URLS.uploadMultiPics(), body, params);

export const uploadFile = (body) => post(SERVICE_URLS.uploadFile(), body);

export const postReviewReply = (body) =>
  post(SERVICE_URLS.postReviewReply(), body);

export const getCompanyNameType = () => get(SERVICE_URLS.getCompanyNameType());
