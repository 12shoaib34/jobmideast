import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import {
  editTask,
  getTasks,
  deleteTasks,
  createTask,
  getConnects,
  getTask,
  getCounter,
  getTeamMembers,
  getCompanyRole,
  updateRole,
  addTeamMember,
  getNewProfiles,
  getJobTitle,
  getQualification,
  getFamilyStatus,
  getTeamNotes,
  getNoteTags,
  addTeamNote,
  updateTeamNote,
  filterTeamNote,
  getBranches,
  deleteNote,
  deleteTeamMember,
  completeTask,
  addConnectByEmployer,
} from "./thunk";

const thunks = [
  editTask,
  getTasks,
  getConnects,
  deleteTasks,
  createTask,
  getTask,
  getCounter,
  getTeamMembers,
  getCompanyRole,
  updateRole,
  addTeamMember,
  getNewProfiles,
  getJobTitle,
  getQualification,
  getFamilyStatus,
  getTeamNotes,
  getNoteTags,
  updateTeamNote,
  addTeamNote,
  filterTeamNote,
  deleteTeamMember,
  completeTask,
  addConnectByEmployer,
];

const initialState = {
  tasks: [],
  status: "idle",
  task: {},
  connects: {},
  taskDeletedSuccessful: false,
  connectsByEmployer: [],
  connectedByEmployerSuccess: false,
  taskCreatedSuccessful: false,
  taskEditSuccessful: false,
  taskCompletedSuccessfully: false,
  counter: {},
  teamMembers: [],
  teamMembersAddSuccess: false,
  companyRole: [],
  newProfiles: [],
  updateSuccess: false,
  jobTitles: [],
  qualifications: [],
  familyStatuses: [],
  teamNotes: [],
  noteTags: [],
  errorMessage: "",
  filteredTeamNote: [],
  branches: [],
  updateTeamNoteSuccess: false,
  createTeamNoteSuccess: false,
  deleteNoteSuccess: false,
  newProfilesLoading: false,
  deleteTeamMemberSuccess: false,
};

export const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setErrorEmpty(state) {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
      })
      .addCase(getConnects.fulfilled, (state, action) => {
        state.status = "idle";
        state.connects = action.payload;
      })

      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
        state.taskEditSuccessful = true;
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
        state.taskDeletedSuccessful = true;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
        state.taskCreatedSuccessful = true;
      })
      .addCase(addConnectByEmployer.fulfilled, (state, action) => {
        state.status = "idle";
        state.connectsByEmployer = action.payload;
        state.connectedByEmployerSuccess = true;
      })

      .addCase(completeTask.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
        state.taskCompletedSuccessfully = true;
      })

      .addCase(getCounter.fulfilled, (state, action) => {
        state.status = "idle";
        state.counter = action.payload;
      })

      .addCase(getTeamMembers.fulfilled, (state, action) => {
        state.status = "idle";
        state.teamMembers = action.payload;
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.status = "idle";
        state.deleteTeamMemberSuccess = true;
      })

      .addCase(getCompanyRole.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyRole = action.payload;
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        state.status = "idle";
        state.updateSuccess = true;
      })

      .addCase(addTeamMember.fulfilled, (state) => {
        state.status = "idle";
        state.teamMembersAddSuccess = true;
      })
      .addCase(getNewProfiles.pending, (state) => {
        state.status = "loading";
        state.newProfilesLoading = true;
      })

      .addCase(getNewProfiles.fulfilled, (state, action) => {
        state.status = "idle";
        state.newProfiles = action.payload;
        state.newProfilesLoading = false;
      })

      .addCase(getJobTitle.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobTitles = action.payload;
      })
      .addCase(getQualification.fulfilled, (state, action) => {
        state.status = "idle";
        state.qualifications = action.payload;
      })
      .addCase(getFamilyStatus.fulfilled, (state, action) => {
        state.status = "idle";
        state.familyStatuses = action.payload;
      })
      .addCase(getTeamNotes.fulfilled, (state, action) => {
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
      })
      .addCase(updateTeamNote.fulfilled, (state) => {
        state.status = "idle";
        state.updateTeamNoteSuccess = true;
      })
      .addCase(filterTeamNote.fulfilled, (state, action) => {
        state.status = "idle";
        state.filteredTeamNote = action.payload;
      })
      .addCase(getBranches.fulfilled, (state, action) => {
        state.status = "idle";
        state.branches = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.status = "idle";
        state.deleteNoteSuccess = true;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.errorMessage = "";
        state.updateTeamNoteSuccess = false;
        state.createTeamNoteSuccess = false;
        state.taskCreatedSuccessful = false;
        state.taskEditSuccessful = false;
        state.deleteNoteSuccess = false;
        state.taskDeletedSuccessful = false;
        state.teamMembersAddSuccess = false;
        state.deleteTeamMemberSuccess = false;
        state.connectedByEmployerSuccess = false;
        state.taskCompletedSuccessfully = false;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.taskCreatedSuccessful = false;
        state.taskEditSuccessful = false;
        state.taskDeletedSuccessful = false;
        state.createTeamNoteSuccess = false;
        state.deleteNoteSuccess = false;
        state.teamMembersAddSuccess = false;
        state.deleteTeamMemberSuccess = false;
        state.connectedByEmployerSuccess = false;
        state.taskCompletedSuccessfully = false;
      });
  },
});

export const selectStatus = (state) => state.dashboard.status === "loading";
export const selectError = (state) => state.dashboard.errorMessage;
export const selectTasks = (state) => state.dashboard.tasks;
// export const selectConnects = (state) => state.dashboard.connects;
export const selectCreateTaskSuccess = (state) =>
  state.dashboard.taskCreatedSuccessful;
export const selectCompletedTaskSuccess = (state) =>
  state.dashboard.taskCompletedSuccessfully;
export const selectConnectByEmplyerSuccess = (state) =>
  state.dashboard.connectedByEmployerSuccess;
export const selectUpdateTaskSuccess = (state) =>
  state.dashboard.taskEditSuccessful;
export const selectDeleteTaskSuccess = (state) =>
  state.dashboard.taskDeletedSuccessful;
export const selectCounter = (state) => state.dashboard.counter;
export const selectTeamMembers = (state) => state.dashboard.teamMembers;
export const selectTeamMembersAddSuccess = (state) =>
  state.dashboard.teamMembersAddSuccess;
export const selectCompanyRole = (state) => state.dashboard.companyRole;
export const selectNewProfiles = (state) => state.dashboard.newProfiles;
export const selectNewProfilesLoading = (state) =>
  state.dashboard.newProfilesLoading;
export const selectUpdateSuccess = (state) => state.dashboard.updateSuccess;
export const selectJobTitles = (state) => state.dashboard.jobTitles;
export const selectQualifications = (state) => state.dashboard.qualifications;
export const selectFamilyStatus = (state) => state.dashboard.familyStatuses;
export const selectTeamNotes = (state) => state.dashboard.teamNotes;
export const selectNoteTags = (state) => state.dashboard.noteTags;
export const selectFilterTeamNotes = (state) =>
  state.dashboard.filteredTeamNote;
export const selectUpdateTeamNoteSuccess = (state) =>
  state.dashboard.updateTeamNoteSuccess;
export const selectCreateTeamNoteSuccess = (state) =>
  state.dashboard.createTeamNoteSuccess;
export const selectDeleteNoteSuccess = (state) =>
  state.dashboard.deleteNoteSuccess;

export const selectBranches = (state) => state.dashboard.branches;
export const selectTeamMemberDeleteSuccess = (state) =>
  state.dashboard.deleteTeamMemberSuccess;

export const { setErrorEmpty } = slice.actions;

export default slice.reducer;
