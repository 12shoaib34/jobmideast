import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import {
  applyToJob,
  changeAppliedStatus,
  getConnected,
  getJobPost,
} from "./thunk";

const thunks = [getConnected, changeAppliedStatus, getJobPost, applyToJob];

const initialState = {
  status: "idle",
  connected: [],
  updateSuccess: false,
  appliedSuccess: false,
  postedJobs: [],
};

export const slice = createSlice({
  name: "connected",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConnected.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConnected.fulfilled, (state, action) => {
        state.status = "idle";
        state.connected = action.payload;
      })
      .addCase(changeAppliedStatus.fulfilled, (state, action) => {
        state.status = "idle";
        state.updateSuccess = true;
      })
      .addCase(applyToJob.fulfilled, (state) => {
        state.status = "idle";
        state.appliedSuccess = true;
      })
      .addCase(getJobPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.postedJobs = action.payload;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.updateTeamNoteSuccess = false;
        state.updateSuccess = false;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.updateSuccess = false;
      });
  },
});

export const selectStatus = (state) => state.connected.status === "loading";
export const selectConnected = (state) => state.connected.connected;
export const selectUpdateSuccess = (state) => state.connected.updateSuccess;
export const selectApplySuccess = (state) => state.connected.appliedSuccess;
export const selectPostedJobs = (state) => state.connected.postedJobs;

export default slice.reducer;
