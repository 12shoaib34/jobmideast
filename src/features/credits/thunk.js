import { createAsyncThunk } from "@reduxjs/toolkit";

import { getConsistentData } from "../../utils/helper";
import {
  getPackages as getPackagesAPI,
  getPackageAddOns as getPackageAddOnsAPI,
  buyPackage as buyPackageAPI,
  buyAddOns as buyAddOnsAPI,
  getTransactionHistory as getTransactionHistoryAPI,
  getCards as getCardsAPI,
  addCard as addCardAPI,
  deleteCard as deleteCardAPI,
  buyCart as buyCartAPI,
  setDefaultCard as setDefaultCardAPI,
  getPaymentDetails as getPaymentDetailsAPI,
} from "./service";

export const getPackages = createAsyncThunk(
  "credits/get-packages",
  async () => {
    const response = await getPackagesAPI();
    return response.data;
  }
);

export const getPackageAddOns = createAsyncThunk(
  "credits/get-packages-addons",
  async () => {
    const response = await getPackageAddOnsAPI();
    return response.data;
  }
);

export const buyPackage = createAsyncThunk(
  "credits/post-buy-package",
  async ({ id, payload }) => {
    const response = await buyPackageAPI(id, payload);
    return response.data;
  }
);

export const buyAddOns = createAsyncThunk(
  "credits/post-buy-addOns",
  async ({ id, payload }) => {
    const response = await buyAddOnsAPI(id, payload);
    return response.data;
  }
);

export const getTransactionHistory = createAsyncThunk(
  "credits/get-transaction-history",
  async () => {
    const response = await getTransactionHistoryAPI();
    return getConsistentData(response);
  }
);

export const getCards = createAsyncThunk("credits/get-cards", async () => {
  const response = await getCardsAPI();
  return response.data;
});

export const addCard = createAsyncThunk(
  "credits/add-card",
  async ({ payload }) => {
    const response = await addCardAPI(payload);
    return response.data;
  }
);

export const deleteCard = createAsyncThunk(
  "credits/delete-card",
  async ({ payload }) => {
    const response = await deleteCardAPI(payload);
    return response.data;
  }
);

export const buyCart = createAsyncThunk(
  "credits/buy-cart",
  async ({ payload }) => {
    const response = await buyCartAPI(payload);
    return response.data;
  }
);

export const setDefaultCard = createAsyncThunk(
  "credits/set-default-card",
  async ({ payload }) => {
    const response = await setDefaultCardAPI(payload);
    return response.data;
  }
);

export const getPaymentDetails = createAsyncThunk(
  "credits/get-payment-details",
  async () => {
    const response = await getPaymentDetailsAPI();
    return response.data;
  }
);
