import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import {
  getConversation,
  postStartConversation,
  deleteConversation,
  getSentFiles,
  postMeeting,
  getAppliedJobs,
  getInterviewPanel,
  getReceivedFiles,
  getJobseekerRole,
  deleteConversationFiles,
} from "./thunk";

const thunks = [
  getConversation,
  postStartConversation,
  deleteConversation,
  // getSentFiles,
  // getReceivedFiles,
  postMeeting,
  getAppliedJobs,
  getJobseekerRole,
];

const initialState = {
  status: "idle",
  errorMessage: "",
  startChatSuccess: false,
  deleteChatSuccess: false,
  conversations: [],
  recievedFiles: [],
  sentFiles: [],
  postMeetingSuccess: false,
  appliedForJobs: [],
  interviewPanelList: [],
  postedFilterSuccesfully: false,
  jobseekrRole: [],
  deleteFileSuccess: false,
};

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postStartConversation.fulfilled, (state) => {
        state.status = "idle";
        state.startChatSuccess = true;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.status = "idle";
        state.conversations = action.payload;
      })
      .addCase(deleteConversation.fulfilled, (state) => {
        state.status = "idle";
        state.deleteChatSuccess = true;
      })
      .addCase(deleteConversationFiles.fulfilled, (state) => {
        state.status = "idle";
        state.deleteFileSuccess = true;
      })
      .addCase(deleteConversationFiles.rejected, (state) => {
        state.status = "failed";
        state.deleteFileSuccess = false;
      })
      .addCase(deleteConversationFiles.pending, (state) => {
        state.deleteFileSuccess = false;
      })
      .addCase(getSentFiles.fulfilled, (state, action) => {
        state.status = "idle";
        state.sentFiles = action.payload;
      })
      .addCase(getReceivedFiles.fulfilled, (state, action) => {
        state.status = "idle";
        state.recievedFiles = action.payload;
      })
      .addCase(postMeeting.fulfilled, (state) => {
        state.status = "idle";
        state.postMeetingSuccess = true;
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.status = "idle";
        state.appliedForJobs = action.payload;
      })
      .addCase(getInterviewPanel.fulfilled, (state, action) => {
        state.status = "idle";
        state.interviewPanelList = action.payload;
      })
      .addCase(getJobseekerRole.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobseekrRole = action.payload;
      })

      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.errorMessage = null;
        state.startChatSuccess = false;
        state.deleteChatSuccess = false;
        state.postMeetingSuccess = false;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.startChatSuccess = false;
        state.deleteChatSuccess = false;
        state.postMeetingSuccess = false;
      });
  },
});

export const selectStatus = (state) => state.chat.status === "loading";
export const selectError = (state) => state.chat.errorMessage;
export const selectConversations = (state) => state.chat.conversations;
export const selectDeleteFileSuccess = (state) => state.chat.deleteFileSuccess;
export const selectChatSuccess = (state) => state.chat.startChatSuccess;
export const selectDeleteChatSuccess = (state) => state.chat.deleteChatSuccess;
export const selectPostMeetingSuccess = (state) =>
  state.chat.postMeetingSuccess;
export const selectAppliedForJobs = (state) => state.chat.appliedForJobs;
export const selectInterviewPanelList = (state) =>
  state.chat.interviewPanelList;

// get sent files, now calling from auth
export const selectSentFiles = (state) => state.chat.sentFiles;
export const selectRecievedFiles = (state) => state.chat.recievedFiles;
export const selectJobseekerRole = (state) => state.chat.jobseekrRole;

// export const { getProfile } = slice.actions;

export default slice.reducer;
