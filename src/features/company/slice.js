import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";


import {
  getCompanyProfile,
  getReviews,
  editCompanyProfile,
  uploadMultiPics,
  // postReviewReply,
  getCompanyNameType,
} from "./thunk";

const initialState = {
  companyProfile: {},
  status: "idle",
  reviews: [],
  editCompanyProfileSuccess: false,
  picturesList: [],
  uploadSuccess: false,
  reviewReplies: [],
  createReviewReplySuccess: false,
  // reviewReply: [],
  companyNameTypes : ['Services', 'Product', 'Audit firm'],
};
const thunks = [
  getCompanyProfile,
  getReviews,
  editCompanyProfile,
  uploadMultiPics,
  getCompanyNameType,
];

export const slice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyProfile = action.payload;
      })
      .addCase(getCompanyNameType.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyNameTypes= action.payload;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.status = "idle";
        state.reviews = action.payload;
      })
      .addCase(editCompanyProfile.fulfilled, (state) => {
        state.status = "idle";
        state.editCompanyProfileSuccess = true;
      })
      .addCase(uploadMultiPics.fulfilled, (state, action) => {
        state.status = "idle";
        state.uploadSuccess = true;
        state.picturesList = action.payload;
      })
      // .addCase(postReviewReply.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.createReviewReplySuccess = true;
      //   state.reviewReplies = action.payload;
      // })
      // .addCase(postReviewReply.rejected, (state) => {
      //   state.status = "failed";
      //   state.createReviewReplySuccess = false;
      //   // state.reviewReplies = action.payload;
      // })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.editCompanyProfileSuccess = false;
        state.uploadSuccess = false;
        // state.createReviewReplySuccess = false;
      })
      .addMatcher(isRejected(...thunks), (state) => {
        state.status = "failed";
        state.editCompanyProfileSuccess = false;
        state.uploadSuccess = false;
        // state.createReviewReplySuccess = false;
      });
  },
});
export const selectCompanyNameTypes = (state) => state.company.companyNameTypes;
export const selectStatus = (state) => state.company.status === "loading";
export const selectCompanyProfile = (state) => state.company.companyProfile;
export const selectReviews = (state) => state.company.reviews;
export const selectCreateReviewReply = (state) =>
  state.company.createReviewReplySuccess;
export const selectEditCompanyProfileSuccess = (state) =>
  state.company.editCompanyProfileSuccess;
export const selectPicturesList = (state) => state.company.picturesList;

export default slice.reducer;
