import { jsonToQueryString } from "../../utils/helper";
import { get, post, put } from "../../utils/httpService";


// Add service: /city/by-country-id/{countryId}
const SERVICE_URLS = {
  getNationality: (qs) => `nationality${qs}`,
  getLanguage: (qs) => `language${qs}`,
  // getCity: (qs) => `city?page=1&limit=100&search=${qs}`,
  getCity: (qs) => `city${qs}`,
  getCityByCountryId: (qs,countryId) => `/city/by-country-id/${countryId}${qs}`,
  postFilter: () => `generic-employer-filter`,
  updateFilter: (id) => `generic-employer-filter/${id}`,
  getFilters: () => `generic-employer-filter`,
  getFilterById: (id) => `generic-employer-filter/${id}`,
  getCategories: (qs) => `/categories${qs}`,
  getJobTitle: (qs, id) => `/jobtitle/${id}${qs}`,
};

export const getNationality = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getNationality(qs));
};

export const getLanguage = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getLanguage(qs));
};

export const getCity = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCity(qs));
};

export const getCityByCountryId = (params, id) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCityByCountryId(qs,id))
}

export const postFilterSuccess = (body) => {
  return post(SERVICE_URLS.postFilter(), body);
};

export const getFilters = () => {
  return get(SERVICE_URLS.getFilters());
};

export const getFilterById = (id) => {
  return get(SERVICE_URLS.getFilterById(id));
};

export const updateFilter = (id, body) => {
  return put(SERVICE_URLS.updateFilter(id), body);
};

export const getCategories = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCategories(qs));
};

export const getJobTitle = (params, id) => {
  const qs = jsonToQueryString(params);
  if (!id) {
    return null;
  }
  return get(SERVICE_URLS.getJobTitle(qs, id));
};
