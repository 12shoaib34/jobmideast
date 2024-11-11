import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { getCandidates } from "./thunk";

const thunks = [getCandidates];

const initialState = {
  status: "idle",
  candidates: [],
};

export const slice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCandidates.fulfilled, (state, action) => {
        state.status = "idle";
        state.candidates = action.payload;
      })

      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.updateTeamNoteSuccess = false;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export const selectStatus = (state) => state.candidates.status === "loading";
export const selectCandidates = (state) => state.candidates.candidates;

// export const { getProfile } = slice.actions;

export default slice.reducer;
