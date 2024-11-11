import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConsistentData } from "../../utils/helper";
import {
  getFamilyStatus as getFamilyStatusAPI,
  getMedicalCondition as getMedicalConditionAPI,
  getNoticePeriod as getNoticePeriodAPI,
  getVisaStatus as getVisaStatusAPI,
  getFilters as getFiltersAPI,
  getProfiles as getProfilesAPI,
  saveFilter as saveFilterAPI,
  getLanguage as getLanguageAPI,
  getExcludeList as getExcludeListAPI,
  getFilterById as getFilterByIdAPI,
  updateFilterById as updateFilterByIdAPI,
  createCandidateList as createCandidateListAPI,
  getCandidateList as getCandidateListAPI,
  // getUsers as getUsersAPI,
} from "./service";

export const getProfiles = createAsyncThunk(
  "profile-search/get",
  async (params) => {
    console.log(params);
    const response = await getProfilesAPI(params);
    console.log(response);
    return response;
  }
);
export const getExcludeList = createAsyncThunk("exclude-list/get", async () => {
  const response = await getExcludeListAPI();
  return response.data;
});
export const getFilterById = createAsyncThunk(
  "profile-search/filter-by-id/get",
  async (id) => {
    const response = await getFilterByIdAPI(id);
    return response.data;
  }
);
export const updateFilterById = createAsyncThunk(
  "profile-search/update-filter-by-id/put",
  async ({ id, payload }) => {
    const response = await updateFilterByIdAPI(id, payload);
    return response.data;
  }
);

export const saveFilter = createAsyncThunk(
  "profile-search/save-filter",
  async ({ payload }) => {
    const response = await saveFilterAPI(payload);
    return response.data;
  }
);

export const getFilters = createAsyncThunk(
  "profile-search/get-filters",
  async () => {
    const response = await getFiltersAPI();
    return response.data;
  }
);

export const getFamilyStatus = createAsyncThunk(
  "profileSearch/get-familyStatus",
  async () => {
    const response = await getFamilyStatusAPI();
    return response.data;
  }
);
export const getNoticePeriod = createAsyncThunk(
  "profileSearch/get-noticePeriod",
  async () => {
    const response = await getNoticePeriodAPI();
    return response.data;
  }
);
export const getVisaStatus = createAsyncThunk(
  "profileSearch/get-visaStatus",
  async () => {
    const response = await getVisaStatusAPI();
    return response.data;
  }
);
// export const getNationality = createAsyncThunk(
//   "profileSearch/get-nationality",
//   async (qs) => {
//     const response = await getNationalityAPI(qs);
//     return response.data;
//   }
// );
export const getMedicalCondition = createAsyncThunk(
  "profileSearch/get-medicalCondition",
  async () => {
    const response = await getMedicalConditionAPI();
    return response.data;
  }
);

export const getCandidateList = createAsyncThunk(
  "profileSearch/get-candidate-list",
  async () => {
    const response = await getCandidateListAPI();
    return response.data;
  }
);

export const createCandidateList = createAsyncThunk(
  "profileSearch/create-candidate-list",
  async ({ payload }) => {
    const response = await createCandidateListAPI(payload);
    return response.data;
  }
);
