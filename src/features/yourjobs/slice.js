import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import {
  getCounter,
  getJobList,
  duplicateJob,
  deleteJobs,
  getJobInformationTemplate,
  getJobInformationTemplatebyId,
  getJobBenefitsTemplate,
  getJobBenefitsTemplateById,
  getJobRequirementsTemplate,
  getJobRequirementsTemplateById,
  getJobDescriptionTemplate,
  getJobDescriptionTemplateById,
  getJobTitles,
  getCitiesById,
  postJobInformationTemplate,
  editJobInfoTemplate,
  postJobBenefitsTemplate,
  editJobBenefitsTemplate,
  postJobRequirementsTemplate,
  editJobRequirementsTemplate,
  postJobDescriptionTemplate,
  editJobDescriptionTemplate,
  postJobPost,
  updateJobPost,
  getJobPost,
  getJobDetailsById,
  getPostedJobs,
  getFilters,
  postFilter,
  getFilterById,
} from "./thunk";

const thunks = [
  getCounter,
  getJobList,
  duplicateJob,
  deleteJobs,
  getJobInformationTemplate,
  getJobInformationTemplatebyId,
  getJobBenefitsTemplate,
  getJobBenefitsTemplateById,
  getJobRequirementsTemplate,
  getJobRequirementsTemplateById,
  getJobDescriptionTemplate,
  getJobDescriptionTemplateById,
  getJobTitles,
  getCitiesById,
  postJobInformationTemplate,
  editJobInfoTemplate,
  postJobBenefitsTemplate,
  editJobBenefitsTemplate,
  postJobRequirementsTemplate,
  editJobRequirementsTemplate,
  postJobDescriptionTemplate,
  editJobDescriptionTemplate,
  postJobPost,
  // updateJobPost,
  // getJobPost,
  getPostedJobs,
  postFilter,
  getFilters,
];

const initialState = {
  counter: {},
  status: "idle",
  jobPostIsLoading: false,
  errorMessage: "",
  jobList: [],
  duplicateSuccess: false,
  deleteSuccess: false,
  jobInfoTemplate: [],
  jobInfoTemplateById: null,
  jobBenefitsTemplate: [],
  jobBenefitsTemplateById: null,
  jobRequirementsTemplate: [],
  jobRequirementsTemplateById: null,
  jobDescriptionTemplate: [],
  jobDescriptionTemplateById: null,
  jobTitles: [],
  citiesById: [],
  jobInfoTempCreatedSuccessfully: false,
  jobInfoEditSuccess: false,
  jobBenefitsTempCreateSuccess: false,
  jobBenefitsEditSuccess: false,
  jobRequirementsCreateSuccess: false,
  jobRequirementsEditSuccess: false,
  jobDescriptionCreateSuccess: false,
  jobDescriptionEditSuccess: false,
  jobPostedSuccessFully: false,
  jobUpdatedSuccessfully: false,
  jobPost: null,
  postedJobs: [],
  postedFilterSuccesfully: false,
  filterById: null,
  filters: [],
  resetJobInFoSuccess: false,
  resetJobBenefitSuccess: false,
  resetJobDescriptionSuccess: false,
  resetJobRequirementsSuccess: false,
  jobByIdSuccess: false,
};

export const slice = createSlice({
  name: "yourJobs",
  initialState,
  reducers: {
    resetJobInfo(state) {
      state.jobInfoTemplateById = null;
    },
    resetJobBenefit(state) {
      state.jobBenefitsTemplateById = null;
    },
    resetJobRequirements(state) {
      state.jobRequirementsTemplateById = null;
    },
    resetJobDescription(state) {
      state.jobDescriptionTemplateById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCounter.fulfilled, (state, action) => {
        state.status = "idle";
        state.counter = action.payload;
      })
      .addCase(getJobList.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobList = action.payload.data;
        state.jobListPage = action.payload.meta;
      })
      .addCase(duplicateJob.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobList = action.payload;
        state.duplicateSuccess = true;
      })
      .addCase(deleteJobs.fulfilled, (state, action) => {
        state.status = "idle";
        state.deleteSuccess = true;
      })
      .addCase(getJobInformationTemplate.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobInfoTemplate = action.payload;
      })
      .addCase(getJobInformationTemplatebyId.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobInfoTemplateById = action.payload;
      })
      .addCase(getJobBenefitsTemplate.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobBenefitsTemplate = action.payload;
      })
      .addCase(getJobBenefitsTemplateById.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobBenefitsTemplateById = action.payload;
      })
      .addCase(getJobRequirementsTemplate.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobRequirementsTemplate = action.payload;
      })
      .addCase(getJobRequirementsTemplateById.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobRequirementsTemplateById = action.payload;
      })
      .addCase(getJobDescriptionTemplate.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobDescriptionTemplate = action.payload;
      })
      .addCase(getJobDescriptionTemplateById.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobDescriptionTemplateById = action.payload;
      })
      .addCase(getJobTitles.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobTitles = action.payload;
      })
      .addCase(getCitiesById.fulfilled, (state, action) => {
        state.status = "idle";
        state.citiesById = action.payload;
      })
      .addCase(postJobInformationTemplate.fulfilled, (state) => {
        state.status = "idle";
        state.jobInfoTempCreatedSuccessfully = true;
      })
      .addCase(editJobInfoTemplate.fulfilled, (state) => {
        state.status = "idle";
        state.jobInfoEditSuccess = true;
      })
      .addCase(postJobBenefitsTemplate.fulfilled, (state) => {
        state.status = "idle";
        state.jobBenefitsTempCreateSuccess = true;
      })
      .addCase(editJobBenefitsTemplate.fulfilled, (state) => {
        state.status = "idle";
        state.jobBenefitsEditSuccess = true;
      })
      .addCase(postJobRequirementsTemplate.fulfilled, (state) => {
        state.status = "idle";
        state.jobRequirementsCreateSuccess = true;
      })
      .addCase(editJobRequirementsTemplate.fulfilled, (state) => {
        state.status = "idle";
        state.jobRequirementsEditSuccess = true;
      })
      .addCase(postJobDescriptionTemplate.fulfilled, (state) => {
        state.status = "idle";
        state.jobDescriptionCreateSuccess = true;
      })
      .addCase(editJobDescriptionTemplate.fulfilled, (state) => {
        state.status = "idle";
        state.jobDescriptionEditSuccess = true;
      })
      .addCase(postJobPost.fulfilled, (state) => {
        state.status = "idle";
        state.jobPostedSuccessFully = true;
        state.jobPostIsLoading = false;
      })
      .addCase(postJobPost.rejected, (state) => {
        state.status = "failed";
        state.jobPostIsLoading = false;
      })
      .addCase(postJobPost.pending, (state) => {
        state.status = "loading";
        state.jobPostIsLoading = true;
      })
      .addCase(updateJobPost.fulfilled, (state) => {
        state.status = "idle";
        state.jobUpdatedSuccessfully = true;
        state.jobPostIsLoading = false;
      })
      .addCase(updateJobPost.pending, (state) => {
        state.status = "loading";
        state.jobUpdatedSuccessfully = false;
        state.jobPostIsLoading = true;
      })
      .addCase(updateJobPost.rejected, (state) => {
        state.status = "failed";
        state.jobUpdatedSuccessfully = false;
        state.jobPostIsLoading = false;
      })
      .addCase(getJobPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobPost = action.payload;
      })
      .addCase(getJobDetailsById.fulfilled, (state, action) => {
        state.status = "idle";
        // state.jobPost = action.payload;
        state.jobList = [action.payload];
        state.jobByIdSuccess = true;
      })
      .addCase(getJobDetailsById.pending, (state) => {
        state.status = "loading";
        state.jobByIdSuccess = false;
      })
      .addCase(getJobDetailsById.rejected, (state) => {
        state.status = "failed";
        state.jobByIdSuccess = false;
      })

      .addCase(getPostedJobs.fulfilled, (state, action) => {
        state.status = "idle";
        state.postedJobs = action.payload;
      })
      .addCase(postFilter.fulfilled, (state) => {
        state.status = "idle";
        state.postedFilterSuccesfully = true;
      })
      .addCase(getFilters.fulfilled, (state, action) => {
        state.status = "idle";
        state.filters = action.payload;
      })
      .addCase(getFilterById.fulfilled, (state, action) => {
        state.status = "idle";
        state.filterById = action.payload;
      })
      .addMatcher(isPending(...thunks), (state, action) => {
        state.status = action?.meta?.arg?.params?.skipLoading
          ? "idle"
          : "loading";
        state.errorMessage = "";
        state.deleteSuccess = false;
        state.duplicateSuccess = false;
        state.jobInfoTempCreatedSuccessfully = false;
        state.jobInfoEditSuccess = false;
        state.jobBenefitsTempCreateSuccess = false;
        state.jobBenefitsEditSuccess = false;
        state.jobRequirementsCreateSuccess = false;
        state.jobRequirementsEditSuccess = false;
        state.jobDescriptionCreateSuccess = false;
        state.jobDescriptionEditSuccess = false;
        state.jobPostedSuccessFully = false;
        state.jobUpdatedSuccessfully = false;
        state.postedFilterSuccesfully = false;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.deleteSuccess = false;
        state.duplicateSuccess = false;
        state.jobInfoEditSuccess = false;
        state.jobBenefitsTempCreateSuccess = false;
        state.jobBenefitsEditSuccess = false;
        state.jobRequirementsCreateSuccess = false;
        state.jobRequirementsEditSuccess = false;
        state.jobDescriptionCreateSuccess = false;
        state.jobDescriptionEditSuccess = false;
        state.jobPostedSuccessFully = false;
        state.jobUpdatedSuccessfully = false;
        state.postedFilterSuccesfully = false;
      });
  },
});

export const selectCounter = (state) => state.yourJobs.counter;
export const selectStatus = (state) => state.yourJobs.status === "loading";
export const selectError = (state) => state.yourJobs.errorMessage;
export const selectJobList = (state) => state.yourJobs.jobList;
export const selectJobByIdSuccess = (state) => state.yourJobs.jobByIdSuccess;
export const selectJobListPage = (state) => state.yourJobs.jobListPage;
export const selectDeleteSuccess = (state) => state.yourJobs.deleteSuccess;
export const selectJobPostLoadingStatus = (state) =>
  state.yourJobs.jobPostIsLoading;
export const selectDuplicateSuccess = (state) =>
  state.yourJobs.duplicateSuccess;
export const selectJobInfoTemplate = (state) => state.yourJobs.jobInfoTemplate;
export const selectJobInfoTemplatebyId = (state) =>
  state.yourJobs.jobInfoTemplateById;
export const selectJobBenefitsTemplate = (state) =>
  state.yourJobs.jobBenefitsTemplate;
export const selectJobBenefitsTemplateById = (state) =>
  state.yourJobs.jobBenefitsTemplateById;
export const selectJobRequirementsTemplate = (state) =>
  state.yourJobs.jobRequirementsTemplate;
export const selectJobRequirementsTemplateById = (state) =>
  state.yourJobs.jobRequirementsTemplateById;
export const selectJobDescriptionTemplate = (state) =>
  state.yourJobs.jobDescriptionTemplate;
export const selectJobDescriptionTemplateById = (state) =>
  state.yourJobs.jobDescriptionTemplateById;
export const selectJobTitles = (state) => state.yourJobs.jobTitles;
export const selectCitiesById = (state) => state.yourJobs.citiesById;
export const selectJobInfoTempCreatedSuccessfully = (state) =>
  state.yourJobs.jobInfoTempCreatedSuccessfully;
export const selectJobInfoEditSuccess = (state) =>
  state.yourJobs.jobInfoEditSuccess;
export const selectJobBenefitsTempCreateSuccess = (state) =>
  state.yourJobs.jobBenefitsTempCreateSuccess;
export const selectJobBenefitsEditSuccess = (state) =>
  state.yourJobs.jobBenefitsEditSuccess;
export const selectJobRequirementsCreateSuccess = (state) =>
  state.yourJobs.jobRequirementsCreateSuccess;
export const selectJobRequirementsEditSuccess = (state) =>
  state.yourJobs.jobRequirementsEditSuccess;
export const selectJobDescriptionCreateSuccess = (state) =>
  state.yourJobs.jobDescriptionCreateSuccess;
export const selectJobDescriptionEditSuccess = (state) =>
  state.yourJobs.jobDescriptionEditSuccess;
export const selectPostJobSuccess = (state) =>
  state.yourJobs.jobPostedSuccessFully;
export const selectUpdateJobSuccess = (state) =>
  state.yourJobs.jobUpdatedSuccessfully;
export const selectJobPost = (state) => state.yourJobs.jobPost;
export const selectPostedJobs = (state) => state.yourJobs.postedJobs;
export const postFilterSuccess = (state) =>
  state.yourJobs.postedFilterSuccesfully;
export const selectFilters = (state) => state.yourJobs.filters;
export const selectFilterById = (state) => state.yourJobs.filterById;

export const {
  resetJobInfo,
  resetJobBenefit,
  resetJobRequirements,
  resetJobDescription,
} = slice.actions;

export default slice.reducer;
