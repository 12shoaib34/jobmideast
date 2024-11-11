import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
// import { getFamilyStatus } from "./thunk";
import {
  getProfiles,
  getFamilyStatus,
  // getNationality,
  getMedicalCondition,
  getNoticePeriod,
  getVisaStatus,
  getFilters,
  saveFilter,
  getExcludeList,
  getFilterById,
  updateFilterById,
  createCandidateList,
  getCandidateList,
} from "./thunk";

const thunks = [
  getFilterById,
  saveFilter,
  createCandidateList,
  getCandidateList,
  updateFilterById,
];

const initialState = {
  status: "idle",
  authSuccess: false,
  profilesLoading: false,
  profile: {},
  editTemplateSuccess: false,
  selectedFilter: null,
  familyStatus: [],
  filters: [],
  saveFilterSuccess: false,
  visaStatus: [],
  noticePeriod: [],
  excludeLists: [],
  medicalCondition: [],
  jobTitles: [],
  employmentTypes: [],
  countries: [],
  cities: [],
  qualifications: [],
  fieldsOfStudy: [],
  grades: [],
  companies: [],
  accommodations: [],
  categories: [],
  salaryType: [],
  suitableFor: [],
  excludeList: [],
  profileSearch: [],
  filterByIdGetSuccess: false,
  filterByIdGetSuccessIsLoading: false,
  candidateListCreateSuccess: false,
  candidateList: [],
};

export const slice = createSlice({
  name: "layout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveFilter.fulfilled, (state) => {
        state.status = "idle";
        state.saveFilterSuccess = true;
      })
      .addCase(updateFilterById.fulfilled, (state) => {
        state.status = "idle";
        state.editTemplateSuccess = true;
      })
      .addCase(getFilterById.fulfilled, (state, action) => {
        state.status = "idle";
        state.filterByIdGetSuccess = true;
        state.filterByIdGetSuccessIsLoading = false;
        state.selectedFilter = action.payload;
      })
      .addCase(getFilterById.pending, (state) => {
        state.filterByIdGetSuccessIsLoading = true;
      })

      .addCase(getExcludeList.fulfilled, (state, action) => {
        state.status = "idle";
        state.excludeLists = action.payload;
      })
      .addCase(getFamilyStatus.fulfilled, (state, action) => {
        state.status = "idle";
        state.authSuccess = true;
        state.familyStatus = action.payload;
      })
      .addCase(getFilters.fulfilled, (state, action) => {
        state.status = "idle";
        state.filters = action.payload;
      })
      .addCase(getNoticePeriod.fulfilled, (state, action) => {
        state.status = "idle";
        state.noticePeriod = action.payload;
        // state.nationality = action.payload;
        // console.log(state.nationality);
        // console.log(state.status);
      })
      .addCase(getVisaStatus.fulfilled, (state, action) => {
        state.status = "idle";
        state.visaStatus = action.payload;
      })

      .addCase(getMedicalCondition.fulfilled, (state, action) => {
        state.status = "idle";
        state.medicalCondition = action.payload;
      })

      .addCase(createCandidateList.fulfilled, (state) => {
        state.status = "idle";
        state.candidateListCreateSuccess = true;
      })
      .addCase(getCandidateList.fulfilled, (state, action) => {
        state.status = "idle";
        state.candidateList = action.payload;
      })

      .addCase(getProfiles.fulfilled, (state, action) => {
        state.status = "idle";
        state.profileSearch = action.payload.data;
        state.profileSearchPage = action.payload.meta;
        console.log("PROFILE", action);
        state.profilesLoading = false;
      })
      .addCase(getProfiles.pending, (state) => {
        state.status = "loading";
        state.profilesLoading = true;
      })
      .addCase(getProfiles.rejected, (state) => {
        state.status = "failed";
        state.profilesLoading = false;
      })

      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.errorMessage = null;
        state.filterByIdGetSuccess = false;
        state.candidateListCreateSuccess = false;
        state.editTemplateSuccess = false;
      })

      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.filterByIdGetSuccess = false;
        state.profilesLoading = false;
        state.errorMessage = action.error.message;
        state.candidateListCreateSuccess = false;
        state.editTemplateSuccess = false;
      });
  },
});

export const selectStatus = (state) => state.profileSearch.status === "loading";
export const selectFilterByIdGetSuccess = (state) =>
  state.profileSearch.filterByIdGetSuccess;
export const selectFilterByIdGetSuccessIsLoading = (state) =>
  state.profileSearch.filterByIdGetSuccessIsLoading;
export const selectProfile = (state) => state.profileSearch.profileSearch;
export const selectProfilePageMeta = (state) =>
  state.profileSearch.profileSearchPage;
export const selectExcludeList = (state) => state.profileSearch.excludeLists;
export const selectUsers = (state) => state.profileSearch.users;
export const selectProfilesLoading = (state) =>
  state.profileSearch.profilesLoading;
export const selectFamilyStatus = (state) => state.profileSearch.familyStatus;
export const selectFilters = (state) => state.profileSearch.filters;
export const selectUpdateFilterById = (state) =>
  state.profileSearch.editTemplateSuccess;
export const selectNoticePeriod = (state) => state.profileSearch.noticePeriod;
export const selectVisaStatus = (state) => state.profileSearch.visaStatus;
export const selectSaveFilter = (state) =>
  state.profileSearch.saveFilterSuccess;
export const selectFilterById = (state) => state.profileSearch.selectedFilter;
export const selectMedicalCondition = (state) =>
  state.profileSearch.medicalCondition;
export const selectCandidateListCreateSuccess = (state) =>
  state.profileSearch.candidateListCreateSuccess;
export const selectCandidateList = (state) => state.profileSearch.candidateList;

export default slice.reducer;
