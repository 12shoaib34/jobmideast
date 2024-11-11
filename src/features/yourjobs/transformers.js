import { getTitleById, findCurrencyCodeById } from "../../utils/helper";

export const transformJobData = (
  data = {},
  jobTitles = null,
  employmentTypes = null,
  countries = null,
  salaryTypes = null,
  currencyType = null
) => {
  const title = getTitleById(jobTitles, data?.jobTitleId);
  const employmentType = getTitleById(employmentTypes, data?.employmentTypeId);
  const country = getTitleById(countries, data?.countryId);
  const salaryType = getTitleById(salaryTypes, data?.salaryTypeId);
  const currency = findCurrencyCodeById(currencyType, data?.currencyId);
  return {
    ...data,
    title,
    employmentType,
    country,
    salaryType,
    currency,
  };
};
