import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jsonToQueryString } from "../../utils/helper";

import {
  getEmployerProfle as getEmployerProfleAPI,
  verifyToken as verifyTokenAPI,
  getCountry as getCountryAPI,
  getSalaryType as getSalaryTypeAPI,
  getCurrencyType as getCurrencyTypeAPI,
  getAccomodationType as getAccomodationTypeAPI,
  getOtherBenefits as getOtherBenefitsAPI,
  getQualifications as getQualificationsAPI,
  getLanguage as getLanguageAPI,
  getSuitableJobs as getSuitableJobsAPI,
  getEmploymentType as getEmploymentTypeAPI,
  getSector as getSectorAPI,
  getCities as getCitiesAPI,
  getCityById as getCityByIdAPI,
  getCategory as getCategoryAPI,
  getJobTitles as getJobTitlesAPI,
  updateEmployerProfile as updateEmployerProfileAPI,
  uploadProfileImage as uploadProfileImageAPI,
  getCitiesByCountry as getCitiesByCountryAPI,
  getCitiesByCountries as getCitiesByCountriesAPI,
  getJobTitleById as getJobTitleByIdAPI,
  getQualificationById as getQualificationByIdAPI,
  getSuitableJobById as getSuitableJobByIdAPI,
  getFamilyStatus as getFamilyStatusAPI,
  getNoticePeriod as getNoticePeriodAPI,
  getTeamMembers as getTeamMembersAPI,
  getCountryByIp as getCountryByIpAPI,
  getMedicalCondition as getMedicalConditionAPI,
  getVisaStatus as getVisaStatusAPI,
  getJobseekerProfileById as getJobseekerProfileByIdAPI,
  // moving from dashboard
  getTeamNotes as getTeamNotesAPI,
  getNoteTags as getNoteTagsAPI,
  addTeamNote as addTeamNoteAPI,
  deleteNote as deleteNoteAPI,
  addTeamMember as addTeamMemberAPI,
  updateTeamNote as updateTeamNoteAPI,
  deleteTeamMember as deleteTeamMemberAPI,
  filterTeamNote as filterTeamNoteAPI,
  searchTeamNote as searchTeamNoteAPI,
  getTransactionHistoryDownload as getTransactionHistoryDownloadAPI,
  getSentFiles as getSentFilesAPI, //chat api
  getReceivedFiles as getReceivedFilesAPI, //chat api
  getJobStatus as getJobStatusAPI,
} from "./service";
// moving from dashboard
export const getTeamNotes = createAsyncThunk(
  "auth/get-team-notes",
  async (id) => {
    const response = await getTeamNotesAPI(id);
    return response.data;
  }
);
export const getNoteTags = createAsyncThunk(
  "auth/get-note-tags",
  async (id) => {
    const response = await getNoteTagsAPI();
    return response.data;
  }
);
export const addTeamNote = createAsyncThunk(
  "auth/add-team-note-post",
  async ({ payload }) => {
    const response = await addTeamNoteAPI(payload);
    return response.data;
  }
);
export const deleteNote = createAsyncThunk(
  "auth/team-note-delete",
  async (id) => {
    const response = await deleteNoteAPI(id);
    return response.data;
  }
);
export const addTeamMember = createAsyncThunk(
  "add-team-member/post",
  async ({ payload }) => {
    const response = await addTeamMemberAPI(payload);
    return response.data;
  }
);
export const deleteTeamMember = createAsyncThunk(
  "delete-team-member/del",
  async (id) => {
    const response = await deleteTeamMemberAPI(id);
    return response.data;
  }
);
export const updateTeamNote = createAsyncThunk(
  "auth/team-note-put",
  async ({ id, body }) => {
    const response = await updateTeamNoteAPI(id, body);
    return response.data;
  }
);
export const filterTeamNote = createAsyncThunk(
  "auth/get-filtered-team-notes",
  async ({ id, jobseekerId }) => {
    const response = await filterTeamNoteAPI(id, jobseekerId);
    return response.data;
  }
);
export const searchTeamNote = createAsyncThunk(
  "auth/get-search-team-notes",
  async ({ id, query }) => {
    const _qs = jsonToQueryString(query);
    const response = await searchTeamNoteAPI(id, _qs);
    return response.data;
  }
);

// ========================
export const getJobseekerProfileById = createAsyncThunk(
  "auth/get-jobseeker-profile-by-id",
  async (id) => {
    const response = await getJobseekerProfileByIdAPI(id);
    return response.data;
  }
);
export const verifyToken = createAsyncThunk("auth/verify", async () => {
  const response = await verifyTokenAPI();
  return response.data;
});
export const getEmployerProfle = createAsyncThunk(
  "auth/get-employer-profile",
  async () => {
    try {
      const response = await getEmployerProfleAPI();
      return response.data;
    } catch (err) {
      if (err) {
        console.log("You will be logout as far as i know!!!!!!");
        localStorage.clear();
        window.location = process.env.REACT_APP_HOMEPAGE_URL + "?logout=true";
      }
    }
    // console.log("Response data from get employer profiles ", response);
    // return response.data;
  }
);
export const getCountry = createAsyncThunk("auth/get-country", async () => {
  const response = await getCountryAPI();
  return response.data;
});
//aslo uses for direct chat filter modal
export const getFamilyStatus = createAsyncThunk(
  "auth/get-familyStatus",
  async () => {
    const response = await getFamilyStatusAPI();
    return response.data;
  }
);
export const getJobTitles = createAsyncThunk("auth/get-job-title", async () => {
  const response = await getJobTitlesAPI();
  // console.log("Response", response);
  return response.data;
});
export const updateEmployerProfile = createAsyncThunk(
  "auth/update-employer-profile",
  async ({ id, payload }) => {
    // console.log(id, payload);
    const response = await updateEmployerProfileAPI(id, payload);
    // console.log(id, payload);
    return response.data;
  }
);
export const uploadProfileImage = createAsyncThunk(
  "auth/upload-image",
  async ({ payload }) => {
    const params = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await uploadProfileImageAPI(payload, params);
    return response.data;
  }
);
export const getSalaryType = createAsyncThunk(
  "auth/get-salary-type",
  async () => {
    const response = await getSalaryTypeAPI();
    return response.data;
  }
);
export const getCurrencyType = createAsyncThunk(
  "auth/get-currency-type",
  async () => {
    const response = await getCurrencyTypeAPI();
    return response.data;
  }
);
export const getAccomodationType = createAsyncThunk(
  "auth/get-acommodation-type",
  async () => {
    const response = await getAccomodationTypeAPI();
    return response.data;
  }
);
export const getJobTitleById = createAsyncThunk(
  "auth/get-job-title-by-id",
  async (id) => {
    // console.log(id);
    const response = await getJobTitleByIdAPI(id);
    return response.data;
  }
);
export const getQualificationById = createAsyncThunk(
  "auth/get-qualification-by-id",
  async (id) => {
    const response = await getQualificationByIdAPI(id);
    return response.data;
  }
);
export const getSuitableJobById = createAsyncThunk(
  "auth/get-suitable-job-by-id",
  async (id) => {
    const response = await getSuitableJobByIdAPI(id);
    return response.data;
  }
);
export const getOtherBenefits = createAsyncThunk(
  "auth/get-other-benefits",
  async () => {
    const response = await getOtherBenefitsAPI();
    return response.data;
  }
);
export const getQualifications = createAsyncThunk(
  "auth/get-Qualifications",
  async () => {
    const response = await getQualificationsAPI();
    return response.data;
  }
);
export const getLanguage = createAsyncThunk("auth/get-language", async () => {
  const response = await getLanguageAPI();
  return response.data;
});
export const getSuitableJobs = createAsyncThunk(
  "auth/get-suitable-jobs",
  async () => {
    const response = await getSuitableJobsAPI();
    return response.data;
  }
);
export const getEmploymentType = createAsyncThunk(
  "auth/get-employment-type",
  async () => {
    const response = await getEmploymentTypeAPI();
    return response.data;
  }
);
export const getSector = createAsyncThunk("auth/get-sectors", async () => {
  const response = await getSectorAPI();
  return response.data;
});
export const getCities = createAsyncThunk("auth/get-cities", async () => {
  const response = await getCitiesAPI();
  return response.data;
});
export const getCityById = createAsyncThunk(
  "auth/get-city-by-id",
  async (id) => {
    const response = await getCityByIdAPI(id);
    return response.data;
  }
);

export const getDesiredCountry = createAsyncThunk(
  "auth/get-desired-country",
  async () => {
    const response = await getCountryAPI({ isDesired: true });
    return response.data;
  }
);
export const getCitiesByCountry = createAsyncThunk(
  "auth/get-city-by-country",
  async (id) => {
    const response = await getCitiesByCountryAPI(id);
    return response.data;
  }
);
export const getCitiesByCountries = createAsyncThunk(
  "auth/get-city-by-countries",
  async (ids) => {
    if (ids?.length) {
      const response = await getCitiesByCountriesAPI(ids);
      return response.data;
    }
    return [];
  }
);
export const getCategories = createAsyncThunk("auth/get-category", async () => {
  const response = await getCategoryAPI();
  return response.data;
});
export const getTeamMembers = createAsyncThunk(
  "auth/get-team-members",
  async () => {
    const response = await getTeamMembersAPI();
    return response.data;
  }
);
export const getCountryByIp = createAsyncThunk(
  "signup/country-by-ip",
  async () => {
    // const response = await getCountryByIpAPI();
    // return response.json();
    return {
      query: "103.244.174.48",
      status: "success",
      country: "Pakistan",
      countryCode: "PK",
      region: "SD",
      regionName: "Sindh",
      city: "Karachi",
      zip: "74600",
      lat: 24.8591,
      lon: 66.9983,
      timezone: "Asia/Karachi",
      isp: "Cyber Internet Services (Private) Limited",
      org: "Cyber Internet Services Pakistan",
      as: "AS9541 Cyber Internet Services (Pvt) Ltd.",
    };
  }
);
//direct chat filter modal
export const getNoticePeriod = createAsyncThunk(
  "auth/get-noticePeriod",
  async () => {
    const response = await getNoticePeriodAPI();
    return response.data;
  }
);
export const getMedicalCondition = createAsyncThunk(
  "auth/get-medicalCondition",
  async () => {
    const response = await getMedicalConditionAPI();
    return response.data;
  }
);
export const getVisaStatus = createAsyncThunk(
  "auth/get-visaStatus",
  async () => {
    const response = await getVisaStatusAPI();
    return response.data;
  }
);
export const getTransactionHistoryDownload = createAsyncThunk(
  "transaction-history-download",
  async () => {
    const response = await getTransactionHistoryDownloadAPI();
    return response.data;
  }
);
//  get sent files
export const getSentFiles = createAsyncThunk(
  "sent-files/get",
  async ({ payload }) => {
    const response = await getSentFilesAPI(payload);
    return response.data;
  }
);
export const getReceivedFiles = createAsyncThunk(
  "chat/received-files",
  async ({ payload }) => {
    const response = await getReceivedFilesAPI(payload);
    return response.data;
  }
);
export const getJobStatus = createAsyncThunk(
  "auth/get-job-status",
  async () => {
    const response = await getJobStatusAPI();
    return response.data;
  }
);
