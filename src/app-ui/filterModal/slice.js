import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { postFilter, getFilters, getFilterById, updateFilter } from "./thunk";

const thunks = [postFilter, getFilters, updateFilter];

const initialState = {
  status: "idle",
  errorMessage: null,
  postedFilterSuccesfully: false,
  filterById: null,
  filters: [],
  citiesId: [],
  updatedFilterSuccessfully: false,
};
export const slice = createSlice({
  name: "filterModal",
  initialState,
  reducers: {
    setCitiesArr(state, action) {
      state.citiesId = action.payload;
    },
    emptyFilterById(state) {
      state.filterById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postFilter.fulfilled, (state) => {
        state.status = "idle";
        state.postedFilterSuccesfully = true;
      })
      .addCase(getFilters.fulfilled, (state, action) => {
        state.status = "idle";
        state.filters = action.payload;
      })
      .addCase(getFilterById.fulfilled, (state, action) => {
        state.status = "idle";
        state.filterById = action.payload;
      })
      .addCase(updateFilter.fulfilled, (state) => {
        state.status = "idle";
        state.updatedFilterSuccessfully = true;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.postedFilterSuccesfully = false;
        state.updatedFilterSuccessfully = false;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.postedFilterSuccesfully = false;
        state.updatedFilterSuccessfully = false;
      });
  },
});

export const selectStatus = (state) => state.filterModal.status === "loading";
export const postFilterSuccess = (state) =>
  state.filterModal.postedFilterSuccesfully;
export const selectFilters = (state) => state.filterModal.filters;
export const selectFilterById = (state) => state.filterModal.filterById;
export const selectCitiesId = (state) => state.filterModal.citiesId;
export const selectUpdatedFilterSuccessfully = (state) =>
  state.filterModal.updatedFilterSuccessfully;

export const { setCitiesArr, emptyFilterById } = slice.actions;

export default slice.reducer;
