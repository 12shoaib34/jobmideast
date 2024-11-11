import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getSettings as getSettingsAPI,
  createSettings as createSettingsAPI,
  updateSettings as updateSettingsAPI,
  deleteAccount as deleteAccountAPI,
  postFeedback as postFeedbackAPI,
  updatePassword as updatePasswordAPI,
} from "./service";

export const getSettings = createAsyncThunk("settings/get", async (id) => {
  const response = await getSettingsAPI(id);
  return response.data;
});

export const updatePassword = createAsyncThunk(
  "settings/update-password",
  async ({ payload }) => {
    const response = await updatePasswordAPI(payload);
    return response.data;
  }
);

export const createSettings = createAsyncThunk("settings/post", async () => {
  const response = await createSettingsAPI();
  return response.data;
});

export const updateSettings = createAsyncThunk(
  "settings/put",
  async ({ payload }) => {
    // console.log("payload from thunk===>", { payload });
    const response = await updateSettingsAPI(payload);
    return response.data;
  }
);

export const deleteAccount = createAsyncThunk(
  "settings/delete-account",
  async ({ payload }) => {
    // console.log("yeh bhejna hai thunk se", paylaod);
    const response = await deleteAccountAPI(payload);
    return response.data;
  }
);

export const postFeedback = createAsyncThunk(
  "settings/post-feedback",
  async ({ payload }) => {
    const response = await postFeedbackAPI(payload);
    return response.data;
  }
);
