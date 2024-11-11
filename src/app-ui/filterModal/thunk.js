import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  postFilterSuccess as postFilterSuccessAPI,
  getFilters as getFiltersAPI,
  getFilterById as getFilterByIdAPI,
  updateFilter as updateFilterAPI,
} from "./service";

export const postFilter = createAsyncThunk(
  "filter-modal/post-filter",
  async ({ payload }) => {
    const response = await postFilterSuccessAPI(payload);
    return response.data;
  }
);
export const getFilters = createAsyncThunk(
  "filter-modal/get-filters",
  async () => {
    const response = await getFiltersAPI();
    return response.data;
  }
);

export const getFilterById = createAsyncThunk(
  "filter-modal/get-filter/id",
  async (payload) => {
    const response = await getFilterByIdAPI(payload);
    return response.data;
  }
);

export const updateFilter = createAsyncThunk(
  "filter-modal/update-filter/id",
  async ({ id, payload }) => {
    const response = await updateFilterAPI(id, payload);
    return response.data;
  }
);
