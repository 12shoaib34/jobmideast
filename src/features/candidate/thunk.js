import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConsistentData } from "../../utils/helper";

import { getCandidates as getCandidatesAPI } from "./service";

export const getCandidates = createAsyncThunk("candidates/get", async () => {
  const response = await getCandidatesAPI();
  return response.data;
});
