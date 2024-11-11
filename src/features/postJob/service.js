import { jsonToQueryString } from "../../utils/helper";
import { get, post, put } from "../../utils/httpService";
const SERVICE_URLS = {
  getSectors: (qs) => `categories${qs}`,
  getJobTitle: (qs, id) => `/jobtitle/${id}${qs}`,
  getCurrencies: (qs) => `currency${qs}`,
  getQualification: (qs) => `qualification${qs}`,
  getLanguage: (qs) => `language${qs}`,
  getCitiesById: (qs, id) => `/city/by-country-id/${id}${qs}`,
};

export const getSectors = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getSectors(qs));
};

export const getJobTitle = (params, id) => {
  const qs = jsonToQueryString(params);
  if (!id) {
    return null;
  }
  return get(SERVICE_URLS.getJobTitle(qs, id));
};

export const getCurrencies = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCurrencies(qs));
};

export const getQualification = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getQualification(qs));
};

export const getLanguage = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getLanguage(qs));
};

export const getCitiesById = (params, id) => {
  const qs = jsonToQueryString(params);
  if (!id) {
    return null;
  }
  return get(SERVICE_URLS.getCitiesById(qs, id));
};
