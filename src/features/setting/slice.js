import { createSlice } from "@reduxjs/toolkit";

import { getSettings, createSettings, deleteAccount, postFeedback, updatePassword, } from "./thunk";




const initialState = {
  settings: {},
  status: "idle",
  feedBackSuccess: false,
  updatePasswordSuccess: false,
};

const thunks = [

  deleteAccount,
  postFeedback,
  updatePassword,
];

export const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = "idle";
        state.updatePasswordSuccess = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.status = "idle";
        state.settings = action.payload;
      })
      .addCase(getSettings.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSettings.fulfilled, (state, action) => {
        state.status = "idle";
        state.settings = action.payload;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(postFeedback.fulfilled, (state) => {
        state.status = "idle";
        state.postFeedback = true;
        state.feedBackSuccess = true
      })
      .addCase(createSettings.rejected, (state) => {
        state.status = "failed";
      });

  },
});
export const selectUpdatePasswordSuccess = (state) =>
  state.settings.updatePasswordSuccess;
export const selectStatus = (state) => state.settings.status === "loading";
export const selectSettings = (state) => state.settings.settings;
export const selectFeedbackSuccess = (state) => state.settings.feedBackSuccess;


export default slice.reducer;
