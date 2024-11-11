import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import {
  verifyToken,
  getEmployerProfle,
  getCountry,
  getSalaryType,
  getCurrencyType,
  getAccomodationType,
  getOtherBenefits,
  getQualifications,
  getLanguage,
  getSuitableJobs,
  getEmploymentType,
  getSector,
  getCities,
  getCityById,
  getCategories,
  getJobTitles,
  updateEmployerProfile,
  uploadProfileImage,
  getCitiesByCountry,
  getCitiesByCountries,
  getJobTitleById,
  getQualificationById,
  getFamilyStatus,
  getTeamMembers,
  getCountryByIp,
  getNoticePeriod,
  getMedicalCondition,
  getVisaStatus,
  getJobseekerProfileById,
  getTeamNotes,
  searchTeamNote,
  getNoteTags,
  addTeamNote,
  deleteNote,
  addTeamMember,
  deleteTeamMember,
  updateTeamNote,
  filterTeamNote,
  getTransactionHistoryDownload,
  getReceivedFiles, //chat api
  getSentFiles,
  getJobStatus,
  getDesiredCountry, //chat api
  getSuitableJobById,
} from "./thunk";

const thunks = [
  verifyToken,
  getCountry,
  getSalaryType,
  getCurrencyType,
  getAccomodationType,
  getOtherBenefits,
  getQualifications,
  getLanguage,
  getSuitableJobs,
  getEmploymentType,
  getSector,
  getCities,
  getCityById,
  getFamilyStatus,
  getCategories,
  getJobTitles,
  getNoticePeriod,
  getMedicalCondition,
  getVisaStatus,
  getJobStatus,
];

const initialState = {
  status: "idle",
  errorMessage: null,
  authSuccess: false,
  employerProfile: {},
  countries: [],
  salaryType: [],
  currencyType: [],
  familyStatus: [],
  accomodationType: [],
  otherBenefits: [],
  qualifications: [],
  languages: [],
  suitableJobs: [],
  employmentType: [],
  sector: [],
  cities: [],
  city: {},
  experienceList: [],
  categories: [],
  jobTitles: [],
  updateProfileSuccess: false,
  isProfileImageLoading: false,
  profileImage: null,
  citiesByCountry: [],
  jobTitleById: null,
  qualificationById: null,
  suitableJobById: null,
  teamMembers: [],
  recievedFiles: [],
  sentFiles: [],
  countryByIp: {},
  noticePeriod: [],
  medicalCondition: [],
  visaStatus: [],
  jobseekerProfileById: [],
  jobseekerProfileByIdIsLoading: false,
  // moving from dashboard
  teamNotes: [],
  noteTags: [],
  teamMembersAddSuccess: false,
  createTeamNoteSuccess: false,
  deleteNoteSuccess: false,
  deleteTeamMemberSuccess: false,
  updateTeamNoteSuccess: false,
  filteredTeamNote: [],
  teamMembers: [],
  getTransactionHistoryDownload: [],
  jobStatus: [],
  desiredCountries: [],
  isTeamNotesLoading: false,
  isProfileUpdateLoading: false,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeJobseekerProfileById: (state) => {
      state.jobseekerProfileById = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // moving from dashboard
      .addCase(getTeamNotes.fulfilled, (state, action) => {
        state.status = "idle";
        state.teamNotes = action.payload;
      })
      .addCase(searchTeamNote.fulfilled, (state, action) => {
        state.status = "idle";
        state.teamNotes = action.payload;
      })
      .addCase(getNoteTags.fulfilled, (state, action) => {
        state.status = "idle";
        state.noteTags = action.payload;
      })
      .addCase(addTeamNote.fulfilled, (state) => {
        state.status = "idle";
        state.createTeamNoteSuccess = true;
        state.isTeamNotesLoading = false;
      })
      .addCase(addTeamNote.pending, (state) => {
        state.createTeamNoteSuccess = false;
        state.isTeamNotesLoading = true;
      })
      .addCase(addTeamNote.rejected, (state) => {
        state.status = "rejected";
        state.createTeamNoteSuccess = false;
        state.isTeamNotesLoading = false;
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.status = "idle";
        state.deleteNoteSuccess = true;
      })
      .addCase(deleteNote.pending, (state) => {
        state.deleteNoteSuccess = false;
      })
      .addCase(deleteNote.rejected, (state) => {
        state.status = "rejected";
        state.deleteNoteSuccess = false;
      })
      .addCase(addTeamMember.fulfilled, (state) => {
        state.status = "idle";
        state.teamMembersAddSuccess = true;
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.status = "idle";
        state.deleteTeamMemberSuccess = true;
      })
      .addCase(updateTeamNote.fulfilled, (state) => {
        state.status = "idle";
        state.updateTeamNoteSuccess = true;
        state.isTeamNotesLoading = false;
      })
      .addCase(updateTeamNote.pending, (state) => {
        state.updateTeamNoteSuccess = false;
        state.isTeamNotesLoading = true;
      })
      .addCase(updateTeamNote.rejected, (state) => {
        state.status = "rejected";
        state.updateTeamNoteSuccess = false;
        state.isTeamNotesLoading = false;
      })
      .addCase(filterTeamNote.fulfilled, (state, action) => {
        state.status = "idle";
        state.filteredTeamNote = action.payload;
      })
      // ----------------------------------------------------
      .addCase(verifyToken.fulfilled, (state) => {
        state.status = "idle";
        state.authSuccess = true;
      })
      .addCase(getJobseekerProfileById.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobseekerProfileById = action.payload;
        state.jobseekerProfileByIdIsLoading = false;
      })
      .addCase(getJobseekerProfileById.pending, (state) => {
        state.jobseekerProfileByIdIsLoading = true;
      })
      .addCase(getJobseekerProfileById.rejected, (state) => {
        state.jobseekerProfileByIdIsLoading = true;
      })

      .addCase(verifyToken.rejected, (state) => {
        state.status = "failed";
        state.authSuccess = false;
      })
      .addCase(getCountryByIp.fulfilled, (state, action) => {
        state.status = "idle";
        state.countryByIp = action.payload;
      })
      .addCase(getEmployerProfle.fulfilled, (state, action) => {
        state.status = "idle";
        state.employerProfile = action.payload;
      })
      .addCase(updateEmployerProfile.fulfilled, (state) => {
        state.status = "idle";
        state.updateProfileSuccess = true;
        state.isProfileUpdateLoading = false;
      })
      .addCase(updateEmployerProfile.pending, (state) => {
        state.isProfileUpdateLoading = true;
        state.updateProfileSuccess = false;
      })
      .addCase(updateEmployerProfile.rejected, (state) => {
        state.isProfileUpdateLoading = false;
        state.updateProfileSuccess = false;
      })
      .addCase(getEmployerProfle.rejected, (state, action) => {
        state.status = "failed";
        // state.errorMessage = action.errorMessage;
        console.log("ERROR MESSAGE  REJECTED", action);
      })
      .addCase(getJobTitleById.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobTitleById = action.payload;
      })
      .addCase(getQualificationById.fulfilled, (state, action) => {
        state.status = "idle";
        state.qualificationById = action.payload;
      })
      .addCase(getSuitableJobById.fulfilled, (state, action) => {
        state.status = "idle";
        state.suitableJobById = action.payload;
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.status = "idle";
        state.countries = action.payload;
      })
      .addCase(getDesiredCountry.fulfilled, (state, action) => {
        state.status = "idle";
        state.desiredCountries = action.payload;
      })
      //2 use cases, one is direct chat filter modal other owais knows
      .addCase(getFamilyStatus.fulfilled, (state, action) => {
        state.status = "idle";
        state.familyStatus = action.payload;
      })
      .addCase(getCitiesByCountry.fulfilled, (state, action) => {
        state.status = "idle";
        state.citiesByCountry = action.payload;
      })
      .addCase(getCitiesByCountries.fulfilled, (state, action) => {
        state.status = "idle";
        state.citiesByCountry = action.payload;
      })
      .addCase(getSalaryType.fulfilled, (state, action) => {
        state.status = "idle";
        state.salaryType = action.payload;
      })
      .addCase(getCurrencyType.fulfilled, (state, action) => {
        state.status = "idle";
        state.currencyType = action.payload;
      })
      .addCase(getAccomodationType.fulfilled, (state, action) => {
        state.status = "idle";
        state.accomodationType = action.payload;
      })
      .addCase(getOtherBenefits.fulfilled, (state, action) => {
        state.status = "idle";
        state.otherBenefits = action.payload;
      })
      .addCase(getQualifications.fulfilled, (state, action) => {
        state.status = "idle";
        state.qualifications = action.payload;
      })
      .addCase(getLanguage.fulfilled, (state, action) => {
        state.status = "idle";
        state.languages = action.payload;
      })
      .addCase(getSuitableJobs.fulfilled, (state, action) => {
        state.status = "idle";
        state.suitableJobs = action.payload;
      })
      .addCase(getEmploymentType.fulfilled, (state, action) => {
        state.status = "idle";
        state.employmentType = action.payload;
      })
      .addCase(getSector.fulfilled, (state, action) => {
        state.status = "idle";
        state.sector = action.payload;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.status = "idle";
        state.cities = action.payload;
      })
      .addCase(getCityById.fulfilled, (state, action) => {
        state.status = "idle";
        state.city = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(getJobTitles.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobTitles = action.payload;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.status = "idle";
        state.isProfileImageLoading = false;
        state.profileImage = action.payload;
      })
      //chat api
      .addCase(getSentFiles.fulfilled, (state, action) => {
        state.status = "idle";
        state.sentFiles = action.payload;
      })
      //chat api
      .addCase(getReceivedFiles.fulfilled, (state, action) => {
        state.status = "idle";
        state.recievedFiles = action.payload;
      })
      .addCase(uploadProfileImage.pending, (state) => {
        state.isProfileImageLoading = true;
        // state.status = "loading";
      })
      .addCase(getTeamMembers.fulfilled, (state, action) => {
        state.status = "idle";
        state.teamMembers = action.payload;
      })
      .addCase(getNoticePeriod.fulfilled, (state, action) => {
        //direct chat filter modal
        state.status = "idle";
        state.noticePeriod = action.payload;
      })
      .addCase(getMedicalCondition.fulfilled, (state, action) => {
        //direct chat filter modal
        state.status = "idle";
        state.medicalCondition = action.payload;
      })
      .addCase(getVisaStatus.fulfilled, (state, action) => {
        //direct chat filter modal
        state.status = "idle";
        state.visaStatus = action.payload;
      })
      .addCase(getTransactionHistoryDownload.fulfilled, (state, action) => {
        state.status = "idle";
        state.getTransactionHistoryDownload = action.payload;
      })
      .addCase(getJobStatus.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobStatus = action.payload;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.teamMembersAddSuccess = false;
        state.deleteTeamMemberSuccess = false;
        state.updateTeamNoteSuccess = false;
      })
      .addMatcher(isRejected(...thunks), (state) => {
        state.status = "failed";
        state.isProfileImageLoading = false;
        state.teamMembersAddSuccess = false;
        state.deleteTeamMemberSuccess = false;
        state.updateTeamNoteSuccess = false;
      });
  },
});

export const selectAuthSuccess = (state) => state.auth.authSuccess;
export const selectErrorMessage = (state) => state.auth.errorMessage;
export const selectIsLoadingJobseekerById = (state) =>
  state.auth.jobseekerProfileByIdIsLoading;
export const selectStatus = (state) => state.auth.status === "loading";
export const selectEmployerProfile = (state) => state.auth.employerProfile;
export const selectCurrentEmployerId = (state) =>
  state.auth.employerProfile.userId;
export const selectIsMainAdmin = (state) =>
  state.auth.employerProfile?.companyRole?.title === "Main Admin";
export const selectIsAdmin = (state) =>
  state.auth.employerProfile?.companyRole?.title === "Admin";
export const selectCountries = (state) => state.auth.countries;
export const selectDesiredCountries = (state) => state.auth.desiredCountries;
export const selectJobseekerProfileById = (state) =>
  state.auth.jobseekerProfileById;
export const selectFamilyStatus = (state) => state.auth.familyStatus;
export const selectSalaryType = (state) => state.auth.salaryType;
export const selectCurrencyType = (state) => state.auth.currencyType;
export const selectAccomodationType = (state) => state.auth.accomodationType;
export const selectOtherBenefits = (state) => state.auth.otherBenefits;
export const selectQualifications = (state) => state.auth.qualifications;
export const selectLanguages = (state) => state.auth.languages;
export const selectSuitableJobs = (state) => state.auth.suitableJobs;
export const selectEmploymentType = (state) => state.auth.employmentType;
export const selectSector = (state) => state.auth.sector;
export const selectCities = (state) => state.auth.cities;
export const selectCity = (state) => state.auth.city;
export const selectCategories = (state) => state.auth.categories;
export const selectJobTitles = (state) => state.auth.jobTitles;
export const selectUpdateProfileSuccess = (state) =>
  state.auth.updateProfileSuccess;
export const selectIsProfileUpdateLoading = (state) =>
  state.auth.isProfileUpdateLoading;
export const selectIsProfileImageLoading = (state) =>
  state.auth.isProfileImageLoading;
export const selectProfileImage = (state) => state.auth.profileImage;
export const selectTeamMembers = (state) => state.auth.teamMembers;

export const selectCitiesByCountry = (state) => state.auth.citiesByCountry;
export const selectJobTitleById = (state) => state.auth.jobTitleById;
export const selectQualificationById = (state) => state.auth.qualificationById;
export const selectSuitableJobById = (state) => state.auth.suitableJobById;
export const selectCountryByIp = (state) => state.auth.countryByIp;
export const selectSentFiles = (state) => state.auth.sentFiles; //chat api
export const selectRecievedFiles = (state) => state.auth.recievedFiles; //chat api
export const selectNoticePeriod = (state) => state.auth.noticePeriod; //direct caht filter modal
export const selectMedicalCondition = (state) => state.auth.medicalCondition; //direct caht filter modal
export const selectVisaStatus = (state) => state.auth.visaStatus; //direct caht filter modal

export const selectTransactionHistoryDownload = (state) =>
  state.auth.getTransactionHistoryDownload;
export const selectCompanyCountry = (state) => state.auth.employerProfile;

// ------moving from dashboard----------------
export const selectTeamMembersAddSuccess = (state) =>
  state.auth.teamMembersAddSuccess;
export const selectTeamNotes = (state) => state.auth.teamNotes;
export const selectNoteTags = (state) => state.auth.noteTags;
export const selectCreateTeamNoteSuccess = (state) =>
  state.auth.createTeamNoteSuccess;
export const selectIsTeamNotesLoading = (state) =>
  state.auth.isTeamNotesLoading;
export const selectDeleteNoteSuccess = (state) => state.auth.deleteNoteSuccess;
export const selectTeamMemberDeleteSuccess = (state) =>
  state.auth.deleteTeamMemberSuccess;
export const selectUpdateTeamNoteSuccess = (state) =>
  state.auth.updateTeamNoteSuccess;
export const selectFilterTeamNotes = (state) => state.auth.filteredTeamNote;
// ------moving from dashboard----------------
export const selectJobStatus = (state) => state.auth.jobStatus;

export const { removeJobseekerProfileById } = slice.actions;

export default slice.reducer;
