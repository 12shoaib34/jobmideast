import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getReviews as getReviewsAPI,
  getCompanyProfile as getCompanyProfileAPI,
  editCompanyProfile as editCompanyProfileAPI,
  uploadMultiPics as uploadMultiPicsAPI,
  postReviewReply as postReviewReplyAPI,
  getCompanyNameType as getCompanyNameTypeAPI,
} from "./service";

export const getCompanyProfile = createAsyncThunk(
  "company/get-profile",
  async ({ id }) => {
    const response = await getCompanyProfileAPI(id);
    return response.data;
  }
);


export const getReviews = createAsyncThunk(
  "company/get-reviews",
  async ({ id }) => {
    const response = await getReviewsAPI(id);
    return response.data;
  }
);

export const editCompanyProfile = createAsyncThunk(
  "company/edit-profile",
  async ({ id, payload }) => {
    const response = await editCompanyProfileAPI(id, payload);
    return response.data;
  }
);

export const uploadMultiPics = createAsyncThunk(
  "attestation/upload--multiple-pictures",
  async ({ payload }) => {
    const params = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await uploadMultiPicsAPI(payload, params);
    return response.data;
  }
);

export const postReviewReply = createAsyncThunk(
  "company/post-review-reply",
  async ({ body }) => {
    const response = await postReviewReplyAPI(body);
    return response.data;
  }
);

export const getCompanyNameType = createAsyncThunk(
  "company-name-types",
  async () => {
    const response = await getCompanyNameTypeAPI();
    return response.data;
  }
);