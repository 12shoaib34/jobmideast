import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonToQueryString } from "../../utils/helper";

import {
  getConversation as getConversationAPI,
  postStartConversation as postStartConversationAPI,
  deleteConversation as deleteConversationAPI,
  getSentFiles as getSentFilesAPI,
  getRecievedFiles as getReceivedFilesAPI,
  postMeeting as postMeetingAPI,
  getAppliedJobs as getAppliedJobsAPI,
  getInterviewPanel as getInterviewPanelAPI,
  getJobseekerRole as getJobseekerRoleAPI,
  deleteConversationFiles as deleteConversationFilesAPI,
} from "./service";

// GET APIs
export const getConversation = createAsyncThunk(
  "chat/get-conversation",
  async ({ qs }) => {
    const _qs = jsonToQueryString(qs);
    const response = await getConversationAPI(_qs);
    return response.data;
  }
);

// POST APIs
export const postStartConversation = createAsyncThunk(
  "chat/start-conversation",
  async ({ payload }) => {
    const response = await postStartConversationAPI(payload);
    return response.data;
  }
);

// PUT APIs
export const deleteConversation = createAsyncThunk(
  "chat/delete-conversation",
  async ({ id }) => {
    const response = await deleteConversationAPI(id);
    return response.data;
  }
);

// DEL APIs
export const deleteConversationFiles = createAsyncThunk(
  "chat/delete-conversation-files",
  async (id) => {
    const response = await deleteConversationFilesAPI(id);
    return response.data;
  }
);

//  get sent files
// below both calling from auth, not from here
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

export const postMeeting = createAsyncThunk(
  "meeting-with-candidate/get",
  async ({ payload }) => {
    const response = await postMeetingAPI(payload);
    return response.data;
  }
);

export const getAppliedJobs = createAsyncThunk(
  "applied-to-jobs-interview/get",
  async (id) => {
    const response = await getAppliedJobsAPI(id);
    return response.data;
  }
);

export const getInterviewPanel = createAsyncThunk(
  "interview-panel-list/get",
  async () => {
    const response = await getInterviewPanelAPI();
    return response.data;
  }
);

export const getJobseekerRole = createAsyncThunk(
  "role-for-jobseeker",
  async () => {
    const response = await getJobseekerRoleAPI();
    return response.data;
  }
);
