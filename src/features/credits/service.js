import { post, get, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  getPackages: () => `/jobsmideast-package/employer`,
  getPackageAddOns: () => `/jobsmideast-package/employer-addons`,
  buyPackage: (packageId) => `/employer-package/buy-package/${packageId}`,
  buyAddOns: (packageAddonsId) =>
    `/employer-package/buy-connect-only/${packageAddonsId}`,
  getTransactionHistory: () => `/employer-transaction-history?page=1&limit=100`,
  removeStripe: () => `/employer-package/remove-stripe`,
  addCard: () => `/employer-package/add-card`,
  getCards: () => `/employer-package/get-cards`,
  deleteCard: () => `/employer-package/delete-card`,
  buyCart: () => `/employer-package/buy-package-cart`,
  setAsDefaultCard: () => `/employer-package/set-default-source-for-customer`,
  getPaymentDetails: () => `employer-package/get-details`,
};

export const getPackages = () => get(SERVICE_URLS.getPackages());

export const getPackageAddOns = () => get(SERVICE_URLS.getPackageAddOns());

export const buyPackage = (packageId, body) =>
  post(SERVICE_URLS.buyPackage(packageId), body);

export const buyAddOns = (packageAddonsId, body) =>
  post(SERVICE_URLS.buyAddOns(packageAddonsId), body);

export const getTransactionHistory = () =>
  get(SERVICE_URLS.getTransactionHistory());

export const removeStripe = () => put(SERVICE_URLS.removeStripe());

export const addCard = (payload) => post(SERVICE_URLS.addCard(), payload);

export const getCards = () => get(SERVICE_URLS.getCards());

export const deleteCard = (payload) => post(SERVICE_URLS.deleteCard(), payload);

export const buyCart = (payload) => post(SERVICE_URLS.buyCart(), payload);

export const setDefaultCard = (payload) =>
  post(SERVICE_URLS.setAsDefaultCard(), payload);

export const getPaymentDetails = () => get(SERVICE_URLS.getPaymentDetails());
