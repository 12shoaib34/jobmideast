import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConsistentData } from "../../utils/helper";

import {
  getConnected as getConnectedAPI,
  changeAppliedStatus as changeAppliedStatusAPI,
  getJobPost as getJobPostAPI,
  applyToJob as applyToJobAPI,
} from "./service";

export const getConnected = createAsyncThunk(
  "Connected/get",
  async (params) => {
    const response = await getConnectedAPI(params);
    return response.data;
  }
);

export const changeAppliedStatus = createAsyncThunk(
  "Connected/change-applied-status",
  async ({ payload }) => {
    const response = await changeAppliedStatusAPI(payload);
    return response.data;
  }
);

export const getJobPost = createAsyncThunk(
  "connected/get-job-post",
  async () => {
    const response = await getJobPostAPI();
    return response.data;
  }
);

export const applyToJob = createAsyncThunk(
  "connected/apply-to-job",
  async ({ payload }) => {
    const response = await applyToJobAPI(payload);
    return response.data;
  }
);
