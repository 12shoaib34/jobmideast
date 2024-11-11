import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import {
  getPackages,
  getPackageAddOns,
  buyPackage,
  buyAddOns,
  getTransactionHistory,
  getCards,
  deleteCard,
  addCard,
  buyCart,
  setDefaultCard,
  getPaymentDetails,
} from "./thunk";

const thunks = [
  getPackages,
  getPackageAddOns,
  buyPackage,
  buyAddOns,
  getTransactionHistory,
  deleteCard,
  // addCard,
  buyCart,
  setDefaultCard,
  getPaymentDetails,
];

const initialState = {
  status: "idle",
  errorMessage: null,
  packages: [],
  packagesAddOns: [],
  packageBoughtSuccess: false,
  packageBoughtAmount: null,
  addOnBoughtSuccess: false,
  transactionHistory: [],
  cards: [],
  buyCartSuccess: false,
  deleteSuccessFull: false,
  iscardsLoading: false,
  addCardSuccess: false,
  setDefaultCardSuccess: false,
  paymentDetails: null,
  cart: [
    { id: 2, type: "package", title: "Standard ad", amount: 300, quantity: 0 },
    { id: 3, type: "package", title: "Job bundle", amount: 1000, quantity: 0 },
    {
      id: 5,
      type: "package",
      title: "Premium bundle",
      amount: 5000,
      quantity: 0,
    },
    {
      id: 1,
      type: "addOn",
      title: "10 Credits",
      quantity: 0,
      amount: 150,
    },
    {
      id: 2,
      type: "addOn",
      title: "20 Credits",
      quantity: 0,
      amount: 200,
    },
    {
      id: 3,
      type: "addOn",
      title: "50 Credits",
      quantity: 0,
      amount: 450,
    },
  ],
};

export const slice = createSlice({
  name: "credits",
  initialState,
  reducers: {
    addToCart(state, action) {
      var tempCart;
      tempCart = state.cart.map((cartItem) => {
        if (
          cartItem.id === action.payload.id &&
          action.payload.type === cartItem.type
        ) {
          cartItem = { ...cartItem, quantity: 1 };
          return cartItem;
        }
        return cartItem;
      });

      state.cart = tempCart;
    },
    defaultBuyCartSuccess(state) {
      state.buyCartSuccess = false;
    },
    changeQuantities(state, action) {
      var tempCart = state.cart.map((cartItem) => {
        if (
          cartItem.id === action.payload.id &&
          action.payload.type === cartItem.type
        ) {
          cartItem = { ...cartItem, quantity: action.payload.quantity };
          return cartItem;
        }
        return cartItem;
      });

      state.cart = tempCart;
    },
    emptyCart(state) {
      state.cart = [
        {
          id: 5,
          type: "package",
          title: "Premium bundle",
          amount: 5000,
          quantity: 0,
        },
        {
          id: 2,
          type: "package",
          title: "Standard ad",
          amount: 300,
          quantity: 0,
        },
        {
          id: 3,
          type: "package",
          title: "Job bundle",
          amount: 1000,
          quantity: 0,
        },
        {
          id: 1,
          type: "addOn",
          title: "10 Credits",
          quantity: 0,
          amount: 150,
        },
        {
          id: 2,
          type: "addOn",
          title: "20 Credits",
          quantity: 0,
          amount: 200,
        },
        {
          id: 3,
          type: "addOn",
          title: "50 Credits",
          quantity: 0,
          amount: 450,
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPackages.fulfilled, (state, action) => {
        state.status = "idle";
        state.packages = action.payload;
      })
      .addCase(getPackageAddOns.fulfilled, (state, action) => {
        state.status = "idle";
        state.packagesAddOns = action.payload;
      })
      .addCase(buyPackage.fulfilled, (state) => {
        state.status = "idle";
        state.packageBoughtSuccess = true;
      })
      .addCase(buyAddOns.fulfilled, (state) => {
        state.status = "idle";
        state.addOnBoughtSuccess = true;
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.status = "idle";
        state.transactionHistory = action.payload;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.status = "idle";
        state.iscardsLoading = false;
        state.cards = action.payload;
      })
      .addCase(addCard.fulfilled, (state) => {
        state.status = "idle";
        state.addCardSuccess = true;
        state.iscardsLoading = false;
      })
      .addCase(addCard.pending, (state) => {
        state.status = "loading";
        state.addCardSuccess = false;
        state.iscardsLoading = true;
      })
      .addCase(addCard.rejected, (state) => {
        state.status = "failed";
        state.addCardSuccess = true;
        state.iscardsLoading = false;
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.status = "idle";
        state.deleteSuccessFull = true;
      })
      .addCase(getCards.pending, (state) => {
        state.iscardsLoading = true;
      })
      .addCase(getCards.rejected, (state) => {
        state.iscardsLoading = false;
      })
      .addCase(buyCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.buyCartSuccess = true;
        state.packageBoughtAmount = action.payload;
      })
      .addCase(setDefaultCard.fulfilled, (state) => {
        state.status = "idle";
        state.setDefaultCardSuccess = true;
      })
      .addCase(getPaymentDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.paymentDetails = action.payload;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.packageBoughtSuccess = false;
        state.addOnBoughtSuccess = false;
        state.errorMessage = null;
        state.deleteSuccessFull = false;
        // state.addCardSuccess = false;
        state.buyCartSuccess = false;
        state.setDefaultCardSuccess = false;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.packageBoughtSuccess = false;
        state.addOnBoughtSuccess = false;
        state.deleteSuccessFull = false;
        // state.addCardSuccess = false;
        state.buyCartSuccess = false;
        state.setDefaultCardSuccess = false;
      });
  },
});
export const selectStatus = (state) => state.credits.status === "loading";
export const selectError = (state) => state.credits.errorMessage;
export const selectPackages = (state) => state.credits.packages;
export const selectPackagesAddOns = (state) => state.credits.packagesAddOns;
export const selectPackageBoughtSuccess = (state) =>
  state.credits.packageBoughtSuccess;
export const selectPackageBoughtAmount = (state) =>
  state.credits.packageBoughtAmount;
export const selectAddOnBoughtSuccess = (state) =>
  state.credits.addOnBoughtSuccess;
export const selectTransactionHistory = (state) =>
  state.credits.transactionHistory;
export const selectCart = (state) => state.credits.cart;
export const selectCards = (state) => state.credits.cards;
export const selectIsCardsLoading = (state) => state.credits.iscardsLoading;
export const selectCardDeleteSuccess = (state) =>
  state.credits.deleteSuccessFull;
export const selectAddCardSuccess = (state) => state.credits.addCardSuccess;
export const selectCartBuySuccess = (state) => state.credits.buyCartSuccess;
export const selectSetDefaultCardSuccess = (state) =>
  state.credits.setDefaultCardSuccess;
export const selectPaymentDetails = (state) => state.credits.paymentDetails;

export const { addToCart, changeQuantities, emptyCart, defaultBuyCartSuccess } =
  slice.actions;

export default slice.reducer;
