import { post, get, put, del } from "../../utils/httpService";
import { jsonToQueryString } from "../../utils/helper";

const SERVICE_URLS = {
  getCategories: (qs) => `/categories${qs}`,
  getJobTitle: (qs, id) => `/jobtitle/${id}${qs}`,
  getCity: (qs) => `/city${qs}`,
  getNationalities: (qs) => `/nationality${qs}`,
  getLanguages: (qs) => `/language${qs}`,
  getProfiles: (qs) => `/profile-search${qs}`,
  getFamilyStatus: () => `/family-status?page=1&limit=100`,
  getMedicalCondition: () => `/medical-condition`,
  getNoticePeriod: () => `/notice-period`,
  getVisaStatus: () => `/visa-status`,
  getFilters: () => `/profile-search/filter`,
  getFilterById: (id) => `/profile-search/filter/${id}`,
  updateFilterById: (id) => `/profile-search/update-filter/${id}`,
  saveFilter: (id) => `/profile-search/save-filter`,
  getExcludeList: () => `/exclude-list/employer/all`,
  createCandidateList: () => `/candidate-list/create`,
  getCandidateList: () => `/candidate-list`,
};

export const saveFilter = (payload) => post(SERVICE_URLS.saveFilter(), payload);

export const getCategories = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCategories(qs));
};

export const getFilterById = (id) => {
  return get(SERVICE_URLS.getFilterById(id));
};

export const updateFilterById = (id, body) => {
  return put(SERVICE_URLS.updateFilterById(id), body);
};

export const getProfiles = (params) => {
  const pageLimitString = "";
  var query = pageLimitString;
  if (params) {
    const qs = `?${params}`;
    query = qs
    // query = pageLimitString.concat(qs);
  }
  return get(SERVICE_URLS.getProfiles(query));
};

export const getJobTitle = (params, id) => {
  const qs = jsonToQueryString(params);
  if (!id) {
    return null;
  }
  return get(SERVICE_URLS.getJobTitle(qs, id));
};

export const getCity = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCity(qs));
};

export const getNationalities = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getNationalities(qs));
};

export const getLanguages = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getLanguages(qs));
};

export const getExcludeList = () => get(SERVICE_URLS.getExcludeList());
export const getFilters = () => get(SERVICE_URLS.getFilters());

export const getFamilyStatus = () => get(SERVICE_URLS.getFamilyStatus());
export const getNoticePeriod = () => get(SERVICE_URLS.getNoticePeriod());
export const getVisaStatus = () => get(SERVICE_URLS.getVisaStatus());
export const getMedicalCondition = () =>
  get(SERVICE_URLS.getMedicalCondition());

export const createCandidateList = (body) => {
  return post(SERVICE_URLS.createCandidateList(), body);
};

export const getCandidateList = () => {
  return get(SERVICE_URLS.getCandidateList());
};
