import { jsonToQueryString } from "../../utils/helper";
import { get, post, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  verifyToken: () => `/auth/verify`,
  getEmployerProfle: () => `/employer-profile`,
  getCountry: (qs) => `/country${qs}`,
  getSalaryType: () => `/salary-type`,
  getCurrencyType: () => `/currency`,
  getAccomodationType: () => `/accommodation-list`,
  getOtherBenefits: () => `/other-benefits-list?page=1&limit=100`,
  getQualifications: () => `/qualification`,
  getLanguage: () => `/language?page=1&limit=500`,
  getSuitableJobs: () => `/suitable-job-list`,
  getSuitableJobById: (id) => `/suitable-job-list/${id}`,
  getEmploymentType: () => `/employment-type`,
  getSector: (qs) => `/categories${qs}`,
  getCities: () => `/city?page=1&limit=1000`,
  getCityById: (id) => `city/${id}`,
  getCategory: () => `/categories`,
  getJobTitles: () => `/jobtitle?page=1&limit=100`,
  updateEmployerProfile: (id) => `/employer-profile/edit/${id}`,
  uploadProfileImage: () => `/file-handle/avatar`,
  getCitiesByCountry: (id) => `/city/by-country-id/${id}?page=1&limit=500`,
  getCitiesByCountryWithParams: (qs, categoryId) =>
    `/city/by-country-id/${categoryId}${qs}`,
  getCitiesByCountries: (qs) => `/city${qs}`,
  getJobTitleById: (id) => `/jobtitle/by-its/${id}`,
  getQualificationById: (id) => `/qualification/${id}`,
  getFamilyStatus: () => `/family-status?page=1&limit=100`,
  getTeamMembers: () => `/user/company-user`,
  getCountryByIp: () => `https://pro.ip-api.com/json?key=YQnoAYJbrHbV7qS`,
  getNoticePeriod: () => `/notice-period?page=1&limit=100`,
  getMedicalCondition: () => `/medical-condition`,
  getVisaStatus: () => `/visa-status`,
  getJobseekerProfileById: (id) => `jobseeker/profile/for-employer/${id}`,

  // Moving from dashboard
  getTeamNotes: (id) => `/note/${id}`,
  getNoteTags: () => `/tag`,
  addTeamNote: () => `/note/create`,
  deleteTeamNote: (id) => `/note/${id}`,
  addTeamMember: () => `/dashboard/invite-new-user`,
  deleteTeamMember: (id) => `/dashboard/updaterole/${id}`,
  updateTeamNote: (id) => `note/edit/${id}`,
  filterTeamNote: (id, query) => `/note/tag/${id}?jobseekerId=${query}`,
  searchTeamNote: (id, query) => `/note/${id}${query}`,
  getTeamMembers: () => `/dashboard/employer-profile`,
  getTransactionHistoryDownload: () =>
    `/employer-transaction-history/download-pdf`,
  getSentFiles: () => `/chat/sentFiles`, //chat api
  getReceivedFiles: () => `/chat/receivedFiles`, //chat api
  getjobStatus: () => `/job-status`,
};

// Moving from dashboard
export const addTeamMember = (body) => post(SERVICE_URLS.addTeamMember(), body);
export const getTeamNotes = (id) => get(SERVICE_URLS.getTeamNotes(id));
export const getNoteTags = () => get(SERVICE_URLS.getNoteTags());
export const addTeamNote = (body) => post(SERVICE_URLS.addTeamNote(), body);
export const deleteNote = (id) => del(SERVICE_URLS.deleteTeamNote(id));
export const deleteTeamMember = (id) => del(SERVICE_URLS.deleteTeamMember(id));
export const updateTeamNote = (id, body) =>
  put(SERVICE_URLS.updateTeamNote(id), body);

export const filterTeamNote = (id, query) =>
  get(SERVICE_URLS.filterTeamNote(id, query));
export const searchTeamNote = (id, query) =>
  get(SERVICE_URLS.searchTeamNote(id, query));

// =======================

export const getJobseekerProfileById = (id) =>
  get(SERVICE_URLS.getJobseekerProfileById(id));
export const verifyToken = () => get(SERVICE_URLS.verifyToken());
export const getEmployerProfle = () => get(SERVICE_URLS.getEmployerProfle());
export const getCountry = (params = {}) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCountry(qs));
};
export const getFamilyStatus = () => get(SERVICE_URLS.getFamilyStatus());
export const getSalaryType = () => get(SERVICE_URLS.getSalaryType());
export const getJobTitleById = (id) => get(SERVICE_URLS.getJobTitleById(id));
export const getQualificationById = (id) =>
  get(SERVICE_URLS.getQualificationById(id));
export const getSuitableJobById = (id) =>
  get(SERVICE_URLS.getSuitableJobById(id));
export const getCurrencyType = () => get(SERVICE_URLS.getCurrencyType());
export const getAccomodationType = () =>
  get(SERVICE_URLS.getAccomodationType());
export const getOtherBenefits = () => get(SERVICE_URLS.getOtherBenefits());
export const getQualifications = () => get(SERVICE_URLS.getQualifications());
export const getLanguage = () => get(SERVICE_URLS.getLanguage());
export const getSuitableJobs = () => get(SERVICE_URLS.getSuitableJobs());
export const getEmploymentType = () => get(SERVICE_URLS.getEmploymentType());
export const getSector = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getSector(qs));
};
export const getCities = () => get(SERVICE_URLS.getCities());
export const getCityById = (id) => get(SERVICE_URLS.getCityById(id));
export const getCategory = () => get(SERVICE_URLS.getCategory());
export const getJobTitles = () => get(SERVICE_URLS.getJobTitles());
export const updateEmployerProfile = (id, payload) =>
  put(SERVICE_URLS.updateEmployerProfile(id), payload);
export const uploadProfileImage = (body, params) =>
  post(SERVICE_URLS.uploadProfileImage(), body, params);
export const getCitiesByCountry = (id) =>
  get(SERVICE_URLS.getCitiesByCountry(id));

export const getCitiesByCountryWithParams = (params, categoryId) => {
  console.log("id from service", categoryId);
  if (!categoryId) {
    return null;
  }
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCitiesByCountryWithParams(qs, categoryId));
};
export const getCitiesByCountries = (countryIds) => {
  const params = {
    limit: 100,
    page: 1,
    countryIds,
  };
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getCitiesByCountries(qs));
};

export const getTeamMembers = () => get(SERVICE_URLS.getTeamMembers());
export const getCountryByIp = () =>
  fetch("https://pro.ip-api.com/json?key=YQnoAYJbrHbV7qS");
// export const getNoticePeriod = () => get(SERVICE_URLS.getNoticePeriod());
// export const getCountryByIp = () => get(SERVICE_URLS.getCountryByIp());
export const getMedicalCondition = () =>
  get(SERVICE_URLS.getMedicalCondition());
export const getNoticePeriod = () => get(SERVICE_URLS.getNoticePeriod());
export const getTransactionHistoryDownload = () =>
  get(SERVICE_URLS.getTransactionHistoryDownload());
export const getVisaStatus = () => get(SERVICE_URLS.getVisaStatus());

export const getSentFiles = (body) => post(SERVICE_URLS.getSentFiles(), body); //chat api
export const getReceivedFiles = (body) =>
  post(SERVICE_URLS.getReceivedFiles(), body); //chat api
export const getJobStatus = () => get(SERVICE_URLS.getjobStatus());
