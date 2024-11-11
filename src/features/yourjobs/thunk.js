import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCounter as getCounterAPI,
  getJobList as getJobListAPI,
  duplicateJob as duplicateJobAPI,
  deleteJobs as deleteJobsAPI,
  getJobInformationTemplate as getJobInformationTemplateAPI,
  getJobInformationTemplatebyId as getJobInformationTemplatebyIdAPI,
  getJobBenefitsTemplate as getJobBenefitsTemplateAPI,
  getJobBenefitsTemplateById as getJobBenefitsTemplateByIdAPI,
  getJobRequirementsTemplate as getJobRequirementsTemplateAPI,
  getJobRequirementsTemplateById as getJobRequirementsTemplateByIdAPI,
  getJobDescriptionTemplate as getJobDescriptionTemplateAPI,
  getJobDescriptionTemplateById as getJobDescriptionTemplateByIdAPI,
  postJobInformationTemplate as postJobInformationTemplateAPI,
  getJobTitles as getJobTitlesAPI,
  getCitiesById as getCitiesByIdAPI,
  editJobInfoTemplate as editJobInfoTemplateAPI,
  postJobBenefitsTemplate as postJobBenefitsTemplateAPI,
  editJobBenefitsTemplate as editJobBenefitsTemplateAPI,
  postJobRequirementsTemplate as postJobRequirementsTemplateAPI,
  editJobRequirementsTemplate as editJobRequirementsTemplateAPI,
  postJobDescriptionTemplate as postJobDescriptionTemplateAPI,
  editJobDescriptionTemplate as editJobDescriptionTemplateAPI,
  postJobPost as postJobPostAPI,
  updateJobPost as updateJobPostAPI,
  getJobPost as getJobPostAPI,
  getJobDetailsById as getJobDetailsByIdAPI,
  getPostedJobs as getPostedJobsAPI,
  postFilterSuccess as postFilterSuccessAPI,
  getFilters as getFiltersAPI,
  getFilterById as getFilterByIdAPI,
} from "./service";

export const getPostedJobs = createAsyncThunk("get/posted-jobs", async () => {
  const response = await getPostedJobsAPI();
  return response.data;
});

export const getCounter = createAsyncThunk("yourjobs/get-counter", async () => {
  const response = await getCounterAPI();
  return response.data;
});

export const getJobList = createAsyncThunk(
  "yourjobs/get-job-list",
  async (params) => {
    const response = await getJobListAPI(params);
    return response;
  }
);

export const duplicateJob = createAsyncThunk(
  "yourjobs/post-duplicate-job",
  async (id) => {
    const newId = id.map((i) => `&jobPostId=${i}`);
    const newIDString = newId.join("");
    const response = await duplicateJobAPI(newIDString);
    return response.data;
  }
);

export const deleteJobs = createAsyncThunk(
  "yourjobs/delete-job",
  async (id) => {
    const newId = id.map((i) => `&jobPostId=${i}`);
    const newIDString = newId.join("");
    const response = await deleteJobsAPI(newIDString);
    return response.data;
  }
);

export const getJobInformationTemplate = createAsyncThunk(
  "yourjobs/get-job-info-template",
  async () => {
    const response = await getJobInformationTemplateAPI();
    return response.data;
  }
);

export const getJobBenefitsTemplate = createAsyncThunk(
  "yourjobs/get-job-benefits-template",
  async () => {
    const response = await getJobBenefitsTemplateAPI();
    return response.data;
  }
);

export const getJobInformationTemplatebyId = createAsyncThunk(
  "yourjobs/get-job-info-template-by-id",
  async (id) => {
    const response = await getJobInformationTemplatebyIdAPI(id);
    return response.data;
  }
);

export const getJobBenefitsTemplateById = createAsyncThunk(
  "yourjobs/get-job-benefits-template-by-id",
  async (id) => {
    const response = await getJobBenefitsTemplateByIdAPI(id);
    return response.data;
  }
);

export const getJobRequirementsTemplate = createAsyncThunk(
  "yourjobs/get-job-requirements-template",
  async (id) => {
    const response = await getJobRequirementsTemplateAPI(id);
    return response.data;
  }
);

export const getJobRequirementsTemplateById = createAsyncThunk(
  "yourjobs/get-job-requirements-template-by-id",
  async (id) => {
    const response = await getJobRequirementsTemplateByIdAPI(id);
    return response.data;
  }
);
export const getJobDescriptionTemplate = createAsyncThunk(
  "yourjobs/get-job-description-template",
  async (id) => {
    const response = await getJobDescriptionTemplateAPI(id);
    return response.data;
  }
);

export const getJobDescriptionTemplateById = createAsyncThunk(
  "yourjobs/get-job-description-template-by-id",
  async (id) => {
    const response = await getJobDescriptionTemplateByIdAPI(id);
    return response.data;
  }
);

export const postJobInformationTemplate = createAsyncThunk(
  "yourjobs/post-job-info-temp",
  async ({ payload }) => {
    const response = await postJobInformationTemplateAPI(payload);
    return response.data;
  }
);
export const getJobTitles = createAsyncThunk(
  "auth/get-jobtitles",
  async (id) => {
    const response = await getJobTitlesAPI(id);
    return response.data;
  }
);

export const getCitiesById = createAsyncThunk("auth/get-cities", async (id) => {
  const response = await getCitiesByIdAPI(id);
  return response.data;
});

export const editJobInfoTemplate = createAsyncThunk(
  "yourjobs/put-job-info-temp",
  async ({ id, payload }) => {
    const response = await editJobInfoTemplateAPI(id, payload);
    return response.data;
  }
);

export const postJobBenefitsTemplate = createAsyncThunk(
  "yourjobs/post-job-benefits-temp",
  async ({ payload }) => {
    const response = await postJobBenefitsTemplateAPI(payload);
    return response.data;
  }
);

export const editJobBenefitsTemplate = createAsyncThunk(
  "yourjobs/put-job-benefits-temp",
  async ({ id, payload }) => {
    const response = await editJobBenefitsTemplateAPI(id, payload);
    return response.data;
  }
);

export const postJobRequirementsTemplate = createAsyncThunk(
  "yourjobs/post-job-requirements-temp",
  async ({ payload }) => {
    const response = await postJobRequirementsTemplateAPI(payload);
    return response.data;
  }
);

export const editJobRequirementsTemplate = createAsyncThunk(
  "yourjobs/put-job-requirements-temp",
  async ({ id, payload }) => {
    const response = await editJobRequirementsTemplateAPI(id, payload);
    return response.data;
  }
);

export const postJobDescriptionTemplate = createAsyncThunk(
  "yourjobs/post-job-description-temp",
  async ({ payload }) => {
    const response = await postJobDescriptionTemplateAPI(payload);
    return response.data;
  }
);
export const editJobDescriptionTemplate = createAsyncThunk(
  "yourjobs/put-job-description-temp",
  async ({ id, payload }) => {
    const response = await editJobDescriptionTemplateAPI(id, payload);
    return response.data;
  }
);

export const postJobPost = createAsyncThunk(
  "yourjobs/post-job-post",
  async ({ payload }) => {
    const response = await postJobPostAPI(payload);
    return response.data;
  }
);
export const updateJobPost = createAsyncThunk(
  "yourjobs/put-job-post",
  async ({ id, payload }) => {
    const response = await updateJobPostAPI(id, payload);
    return response.data;
  }
);

export const getJobPost = createAsyncThunk(
  "yourjobs/get-job-post",
  async (id) => {
    const response = await getJobPostAPI(id);
    console.log("response.data", response.data);
    return response.data;
  }
);
export const getJobDetailsById = createAsyncThunk(
  "yourjobs/get-job-detail-by-id",
  async (id) => {
    const response = await getJobDetailsByIdAPI(id);
    console.log("response.data", response.data);
    return response.data;
  }
);

export const postFilter = createAsyncThunk(
  "filter-modal/post-filter",
  async ({ payload }) => {
    const response = await postFilterSuccessAPI(payload);
    return response.data;
  }
);
export const getFilters = createAsyncThunk(
  "filter-modal/get-filters",
  async () => {
    const response = await getFiltersAPI();
    return response.data;
  }
);

export const getFilterById = createAsyncThunk(
  "filter-modal/get-filter/id",
  async (payload) => {
    const response = await getFilterByIdAPI(payload);
    return response.data;
  }
);
