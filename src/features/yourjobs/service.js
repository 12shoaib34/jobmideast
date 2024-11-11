import { post, get, put, del } from "../../utils/httpService";
import { jsonToQueryString } from "../../utils/helper";
const SERVICE_URLS = {
  getCounter: () => `/dashboard/counter`,
  getJobList: (qs) => `/jobs/employer${qs ? qs : "?limit=10&page=1"}`,
  duplicateJob: (id) => `job-post/duplicate-job/byId?page=1&limit=100${id}`,
  deleteJob: (id) => `job-post?page=1&limit=10${id}`,
  getJobInformationTemplate: () => `job-information/template`,
  getJobInformationTemplatebyId: (id) => `job-information/template/${id}`,
  getJobBenefitsTemplate: () => `job-benefits/template`,
  getJobBenefitsTemplateById: (id) => `job-benefits/template/${id}`,
  getJobRequirementsTemplate: () => `job-requirements/template`,
  getJobRequirementsTemplateById: (id) => `job-requirements/template/${id}`,
  getJobDescriptionTemplate: () => `job-description/template`,
  getJobDescriptionTemplateById: (id) => `job-description/template/${id}`,
  postJobInformationTemplate: () => `/job-information/template/create`,
  getJobTitles: (id) => `/jobtitle/${id}`,
  getCitiesById: (id) => `/city/by-country-id/${id}?page=1&limit=100`,
  editJobInfoTemplate: (id) => `/job-information/template/edit/${id}`,
  postJobBenefitsTemplate: () => `/job-benefits/template/create`,
  editJobBenefitsTemplate: (id) => `/job-benefits/template/edit/${id}`,
  postJobRequirementsTemplate: () => `/job-requirements/template/create`,
  editJobRequirementsTemplate: (id) => `/job-requirements/template/edit/${id}`,
  postJobDescriptionTemplate: () => `/job-description/template/create`,
  editJobDescriptionTemplate: (id) => `/job-description/template/edit/${id}`,
  postJobPost: () => `/job-post/create?page=1&limit=10`,
  updateJobPost: (id) => `/job-post/edit/${id}`,
  getJobPost: (id) => `/job-post/${id}`,
  getPostedJobs: (qs) => `/job-post${qs}`,
  getAppliedProfiles: (jobPostId, qs) =>
    `/employment-activities/by-applied/${jobPostId}?${qs}`,
  setEmploymentActivityViewed: (id) => `/employment-activities/viewed/${id}`,
  getOtherProfiles: (jobPostId, qs) =>
    `/employment-activities/by-other/${jobPostId}${qs}`,
  updateEmploymentActivities: (id, qs) => `/employment-activities/${id}${qs}`,
  // filter modal
  postFilter: () => `/canban/save-filter`,
  getFilters: () => `/canban/filter`,
  getFilterById: (id) => `/conversation/filter/${id}`,
  getJobDetailsById: (id) => `/jobs/employer/${id}`,
};

// export const getPostedJobs = () => get(SERVICE_URLS.getPostedJobs());

export const getPostedJobs = (params) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getPostedJobs(qs));
};




export const getCounter = () => get(SERVICE_URLS.getCounter());

export const getJobList = (params) => {
  // const pageLimitString = "";
  // var query = pageLimitString;
  if (params) {
    if (typeof params === "object") {
      return get(SERVICE_URLS.getJobList());
    }
    const qs = `?${params}`;
    const query = qs;
    return get(SERVICE_URLS.getJobList(query));
  }
  return get(SERVICE_URLS.getJobList());
};

export const duplicateJob = (id) => get(SERVICE_URLS.duplicateJob(id));

export const deleteJobs = (id) => del(SERVICE_URLS.deleteJob(id));

export const getJobInformationTemplate = () =>
  get(SERVICE_URLS.getJobInformationTemplate());
export const getJobInformationTemplatebyId = (id) =>
  get(SERVICE_URLS.getJobInformationTemplatebyId(id));

export const getJobBenefitsTemplate = () =>
  get(SERVICE_URLS.getJobBenefitsTemplate());
export const getJobBenefitsTemplateById = (id) =>
  get(SERVICE_URLS.getJobBenefitsTemplateById(id));

export const getJobRequirementsTemplate = () =>
  get(SERVICE_URLS.getJobRequirementsTemplate());
export const getJobRequirementsTemplateById = (id) =>
  get(SERVICE_URLS.getJobRequirementsTemplateById(id));

export const getJobDescriptionTemplate = () =>
  get(SERVICE_URLS.getJobDescriptionTemplate());
export const getJobDescriptionTemplateById = (id) =>
  get(SERVICE_URLS.getJobDescriptionTemplateById(id));

export const postJobInformationTemplate = (body) =>
  post(SERVICE_URLS.postJobInformationTemplate(), body);

export const getJobTitles = (id) => get(SERVICE_URLS.getJobTitles(id));

export const getCitiesById = (id) => get(SERVICE_URLS.getCitiesById(id));

export const editJobInfoTemplate = (id, body) =>
  put(SERVICE_URLS.editJobInfoTemplate(id), body);

export const postJobBenefitsTemplate = (body) =>
  post(SERVICE_URLS.postJobBenefitsTemplate(), body);

export const editJobBenefitsTemplate = (id, body) =>
  put(SERVICE_URLS.editJobBenefitsTemplate(id), body);

export const postJobRequirementsTemplate = (body) =>
  post(SERVICE_URLS.postJobRequirementsTemplate(), body);

export const editJobRequirementsTemplate = (id, body) =>
  put(SERVICE_URLS.editJobRequirementsTemplate(id), body);

export const postJobDescriptionTemplate = (body) =>
  post(SERVICE_URLS.postJobDescriptionTemplate(), body);

export const editJobDescriptionTemplate = (id, body) =>
  put(SERVICE_URLS.editJobDescriptionTemplate(id), body);

export const postJobPost = (body) => post(SERVICE_URLS.postJobPost(), body);

export const updateJobPost = (id, body) =>
  put(SERVICE_URLS.updateJobPost(id), body);

export const getJobPost = (id) => get(SERVICE_URLS.getJobPost(id));
export const getJobDetailsById = (id) => get(SERVICE_URLS.getJobDetailsById(id));

export const getAppliedProfiles = (jobPostId, params = "page=1&limit=100") => {
  return get(SERVICE_URLS.getAppliedProfiles(jobPostId, params));
};

export const setEmploymentActivityViewed = (id) => {
  return put(SERVICE_URLS.setEmploymentActivityViewed(id), null);
};

export const getOtherProfiles = (
  jobPostId,
  params = { limit: 100, page: 1 }
) => {
  const qs = jsonToQueryString(params);
  return get(SERVICE_URLS.getOtherProfiles(jobPostId, qs));
};

export const updateEmploymentActivities = (id, body) => {
  const qs = jsonToQueryString(body);
  return put(SERVICE_URLS.updateEmploymentActivities(id, qs), null);
};

export const postFilterSuccess = (body) => {
  return post(SERVICE_URLS.postFilter(), body);
};
export const getFilters = () => {
  return get(SERVICE_URLS.getFilters());
};
export const getFilterById = (id) => {
  return get(SERVICE_URLS.getFilterById(id));
};
