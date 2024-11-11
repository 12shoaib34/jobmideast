import React, { useEffect, useRef, useState } from "react";

import {
  Input,
  Select,
  Form,
  ConfigProvider,
  DatePicker,
  Switch,
  Row,
  Col,
  Spin,
  Modal,
} from "antd";
import useRefState from "react-usestateref";
// import PremiumFeature from "../../app-ui/PremiumFeature/PremiumFeature";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./_PostJob.scss";
import "./_Responsive.scss";
import * as rules from "../../utils/rules";
import Button from "../../shared-ui/Button/Button";
import Form_Wrapper from "../../shared-ui/PostJobForms/PostJobFrom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { transformJobData } from "./../yourjobs/transformers";
import {
  selectJobInfoTemplate,
  selectJobInfoTemplatebyId,
  selectJobBenefitsTemplate,
  selectJobBenefitsTemplateById,
  selectJobRequirementsTemplate,
  selectJobRequirementsTemplateById,
  selectJobDescriptionTemplate,
  selectJobDescriptionTemplateById,
  selectJobTitles,
  selectJobInfoTempCreatedSuccessfully,
  selectJobInfoEditSuccess,
  selectJobBenefitsTempCreateSuccess,
  selectJobBenefitsEditSuccess,
  selectJobRequirementsCreateSuccess,
  selectJobRequirementsEditSuccess,
  selectJobDescriptionCreateSuccess,
  selectError,
  selectUpdateJobSuccess,
  selectJobPost,
  selectPostJobSuccess,
  resetJobInfo,
  resetJobBenefit,
  resetJobRequirements,
  resetJobDescription,
  selectJobDescriptionEditSuccess,
  selectJobPostLoadingStatus,
} from "../yourjobs/slice";
import {
  getJobBenefitsTemplateById,
  getJobInformationTemplate,
  getJobInformationTemplatebyId,
  getJobBenefitsTemplate,
  getJobRequirementsTemplate,
  getJobRequirementsTemplateById,
  getJobDescriptionTemplate,
  getJobDescriptionTemplateById,
  postJobInformationTemplate,
  editJobInfoTemplate,
  postJobBenefitsTemplate,
  editJobBenefitsTemplate,
  postJobRequirementsTemplate,
  editJobRequirementsTemplate,
  postJobDescriptionTemplate,
  editJobDescriptionTemplate,
  postJobPost,
  updateJobPost,
  getJobPost,
  getJobList,
} from "../yourjobs/thunk";
import moment from "moment";
import {
  selectAccomodationType,
  selectCurrencyType,
  selectQualifications,
  selectSalaryType,
  selectLanguages,
  selectSuitableJobs,
  selectEmployerProfile,
  selectEmploymentType,
  selectSector,
  selectCountries,
  selectJobTitleById,
  selectCitiesByCountry,
  selectQualificationById,
  selectSuitableJobById,
  selectCities,
} from "../auth/slice";
import {
  findTitleById,
  findCurrencyCodeById,
  findIdByTitle,
  removeUndefinedFromObj,
  checkDisabledDate,
  disabledEndDate,
} from "../../utils/helper";
import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
} from "../../utils/message";
import { useHistory } from "react-router";
import JobDetails from "../../app-ui/JobDetails/JobDetails";
import { SuperSelect } from "../../shared-ui/SuperSelect/SuperSelect";
import {
  getCitiesById,
  getCurrencies,
  getJobTitle,
  getLanguage,
  getQualification,
  getSectors,
} from "./service";
import {
  getJobTitleById,
  getCitiesByCountry,
  getSuitableJobById,
  getQualificationById,
} from "../auth/thunk";
import { getCountry } from "../auth/service";
import CounterInput from "../../shared-ui/CounterInput/CounterInput";
import TagRender from "../../shared-ui/TagRender/TagRender";

const { Option } = Select;
const { confirm } = Modal;

const Test = ({
  jobPostId,
  setPost,
  HandleForm,
  showJobPost,
  setJobPostId,
  setSelectJob,
}) => {
  // console.log("POST JOB")
  const dispatch = useAppDispatch();
  const [premium, setPremium] = useState(false);
  const [selectedSector, setSelectedSector] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [salaryStart, setSalaryStart] = useState(0);
  const [salaryEnd, setSalaryEnd] = useState(0);
  const [postitionsAvailable, setPostitionsAvailable] = useState(1);
  const [minimumExperience, setMinimumExperience] = useState(0);
  const [minimumAge, setMinimumAge] = useState(16);
  const [fieldsMissing, setFieldsMissing, fieldsMissingRef] = useRefState(null);
  const [previewJob, setPreviewJob] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  // const [gratuityBonus, setGratuityBonus] = useState(false);
  // const [selectedSectorId, setSelectedSectorId] = useState(null);
  // const [collapseOpen, setCollapseOpen] = useState(true)

  const [jobInfoForm] = Form.useForm();
  const [jobBenfitForm] = Form.useForm();
  const [jobRequirementsForm] = Form.useForm();
  const [jobDescriptionForm] = Form.useForm();

  const cityByCountry = useAppSelector(selectCitiesByCountry);
  const jobInfoTemplate = useAppSelector(selectJobInfoTemplate);
  const isJobPostLoading = useAppSelector(selectJobPostLoadingStatus);
  const jobBenefitsTemplate = useAppSelector(selectJobBenefitsTemplate);
  const jobInfoTemplatebyId = useAppSelector(selectJobInfoTemplatebyId);
  const jobBenefitsTemplateById = useAppSelector(selectJobBenefitsTemplateById);
  const jobRequirementsTemplate = useAppSelector(selectJobRequirementsTemplate);
  const jobRequirementsTemplateById = useAppSelector(
    selectJobRequirementsTemplateById
  );

  const [
    jobRequirementsTemplateByIdLoading,
    setjobRequirementsTemplateByIdLoading,
  ] = useState(false);
  const [
    getJobInformationTemplatebyIdLoading,
    setgetJobInformationTemplatebyIdLoading,
  ] = useState(false);
  const [
    getjobBenefitsTemplateByIdLoading,
    setgetjobBenefitsTemplateByIdLoading,
  ] = useState(false);
  const [
    jobDescriptionTemplateByIdLoading,
    setjobDescriptionTemplateByIdLoading,
  ] = useState(false);

  const jobDescriptionTemplate = useAppSelector(selectJobDescriptionTemplate);
  const jobDescriptionTemplateById = useAppSelector(
    selectJobDescriptionTemplateById
  );
  const employerProfile = useAppSelector(selectEmployerProfile);
  const jobPost = useAppSelector(selectJobPost);
  const jobPostSuccess = useAppSelector(selectPostJobSuccess);
  const jobUpdatedSuccessfully = useAppSelector(selectUpdateJobSuccess);

  const salaryTypes = useAppSelector(selectSalaryType);
  const currencyType = useAppSelector(selectCurrencyType);
  const accomodationType = useAppSelector(selectAccomodationType);
  const qualifications = useAppSelector(selectQualifications);
  const languages = useAppSelector(selectLanguages);
  const suitableJobs = useAppSelector(selectSuitableJobs);
  const employmentType = useAppSelector(selectEmploymentType);
  const sector = useAppSelector(selectSector);
  // const jobTitles = useAppSelector(selectJobTitles);
  const countries = useAppSelector(selectCountries);
  const cities = useAppSelector(selectCities);
  const jobTitles = useAppSelector(selectJobTitles);
  const employmentTypes = useAppSelector(selectEmploymentType);
  const jobTitleById = useAppSelector(selectJobTitleById);
  const qualificationById = useAppSelector(selectQualificationById);
  const selectSuitableJob = useAppSelector(selectSuitableJobById);

  const jobInfoTempCreatedSuccessfully = useAppSelector(
    selectJobInfoTempCreatedSuccessfully
  );
  const jobInfoEditSuccess = useAppSelector(selectJobInfoEditSuccess);
  const jobBenefitsTempCreateSuccess = useAppSelector(
    selectJobBenefitsTempCreateSuccess
  );
  const jobBenefitsEditSuccess = useAppSelector(selectJobBenefitsEditSuccess);
  const jobRequirementsCreateSuccess = useAppSelector(
    selectJobRequirementsCreateSuccess
  );
  const jobRequirementsEditSuccess = useAppSelector(
    selectJobRequirementsEditSuccess
  );
  const jobDescriptionCreateSuccess = useAppSelector(
    selectJobDescriptionCreateSuccess
  );
  const jobDescriptionEditSuccess = useAppSelector(
    selectJobDescriptionEditSuccess
  );

  const errorMessage = useAppSelector(selectError);
  const customizeRenderEmpty = (content) => (
    <div style={{ textAlign: "center" }}>
      {/* <SmileOutlined style={{ fontSize: 20 }} /> */}
      <p>{content}</p>
    </div>
  );

  useEffect(() => {
    setStartDate(moment());
    window.scrollTo({ top: 0, behavior: "smooth" });
    // setCollapseOpen(true)
  }, []);
  useEffect(() => {
    let cityId = jobInfoForm.getFieldsValue(["cityId"]);
    let cityName = cityByCountry.find((city) => city.id === cityId.cityId);
    if (cityName) jobInfoForm.setFieldsValue({ ["cityId"]: cityName.id });
  }, [cityByCountry]);

  useEffect(() => {
    if (!jobInfoTemplatebyId) {
      jobInfoForm.resetFields([
        "countryId",
        "title",
        "cityId",
        "gender",
        // "endDate",
        // "startDate",
        "savedTemplate",
        "wfh",
        "jobTitleId",
        "employmentTypeId",
        "jobBrief",
        "branchName",
        "categoriesId",
      ]);
    }
    if (!jobBenefitsTemplateById) {
      jobBenfitForm.resetFields();
    }
    if (!jobDescriptionTemplateById) {
      jobDescriptionForm.resetFields();
    }
    if (!jobRequirementsTemplateById) {
      jobRequirementsForm.resetFields();
    }
  }, [
    jobInfoTemplatebyId,
    jobBenefitsTemplateById,
    jobDescriptionTemplateById,
    jobRequirementsTemplateById,
  ]);

  useEffect(() => {
    dispatch(getJobInformationTemplate());
    dispatch(getJobBenefitsTemplate());
    dispatch(getJobRequirementsTemplate());
    dispatch(getJobDescriptionTemplate());
  }, []);

  useEffect(() => {
    if (errorMessage) {
      showErrorMessage(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (jobPostId) {
      dispatch(getJobPost(jobPostId));
    }
  }, [jobPostId]);

  useEffect(() => {
    if (employerProfile && jobInfoTemplatebyId) {
      const startDate = moment(jobInfoTemplatebyId?.startDate)._isValid
        ? moment(jobInfoTemplatebyId?.startDate)
        : "";
      const endDate = moment(jobInfoTemplatebyId?.endDate)._isValid
        ? moment(jobInfoTemplatebyId?.endDate)
        : "";
      const companyId = employerProfile?.companyProfile?.companyName;
      console.log(startDate, endDate);

      const positionsAvaibale = setPostitionsAvailable(
        jobInfoTemplatebyId?.positionsAvaibale
          ? jobInfoTemplatebyId?.positionsAvaibale
          : 1
      );
      if (jobInfoTemplatebyId?.categoriesId) {
        setSelectedSector(true);
      }

      let _jobInfoTemplatebyId = removeUndefinedFromObj(jobInfoTemplatebyId);
      const countryId = _jobInfoTemplatebyId
        ? _jobInfoTemplatebyId.countryId
        : employerProfile?.companyProfile?.country?.title;
      let cityId = _jobInfoTemplatebyId
        ? _jobInfoTemplatebyId.cityId
        : employerProfile?.companyProfile?.city?.title;
      setCountryId(countryId);
      dispatch(getCitiesByCountry(countryId));

      jobInfoForm.setFieldsValue({
        // for this form only cityId is seeting is useEffect
        ..._jobInfoTemplatebyId,
        startDate,
        endDate,
        companyId,
        countryId,
        cityId,
        positionsAvaibale,
      });
    }
  }, [jobInfoTemplatebyId, employerProfile]);

  useEffect(() => {
    if (employerProfile) {
      const companyId = employerProfile?.companyProfile?.companyName;
      const countryId = employerProfile?.companyProfile?.country?.title;
      const cityId = employerProfile?.companyProfile?.city?.title;
      jobInfoForm.setFieldsValue({
        ...jobInfoTemplatebyId,
        companyId,
        // countryId,
        // cityId,
      });
    }
  }, [employerProfile, showJobPost]);

  useEffect(() => {
    setCategoryId(jobInfoTemplatebyId?.categoriesId);
    setSelectedSector(true);
    setgetJobInformationTemplatebyIdLoading(false);
  }, [jobInfoTemplatebyId]);

  useEffect(() => {
    setJobDetails({ ...jobDetails, jobTitle: { title: jobTitleById?.title } });
  }, [jobTitleById]);
  useEffect(() => {
    setJobDetails({
      ...jobDetails,
      qualification: { title: qualificationById?.title },
    });
  }, [qualificationById]);
  useEffect(() => {
    setJobDetails({
      ...jobDetails,
      suitableJob: { title: selectSuitableJob?.title },
    });
  }, [selectSuitableJob]);

  useEffect(() => {
    if (jobPost) {
      console.log("JOB POST", jobPost);
      const languageId = Number(jobPost?.languageId);
      const languageTitle = findTitleById(languages, languageId);
      const otherLanguageId = jobPost?.otherLanguageId?.map((id) =>
        findTitleById(languages, Number(id))
      );
      // const accomodationTypeObj = findTitleById(
      //   accomodationType,
      //   Number(
      //     jobPost?.accommodationListId?.length
      //       ? jobPost?.accommodationListId[0]
      //       : 0
      //   )
      // );

      const startDate = jobPost.startDate ? moment(jobPost?.startDate) : "";
      const endDate = jobPost.endDate ? moment(jobPost?.endDate) : "";
      const companyId = employerProfile?.companyProfile?.companyName;
      const countryId = findTitleById(
        countries,
        employerProfile?.companyProfile?.countryId
      );
      const cityId = findTitleById(
        cities,
        jobPost.cityId
        // employerProfile?.companyProfile?.countryId
      );
      // const cityId = employerProfile?.companyProfile?.city?.title;

      setSalaryStart(jobPost?.salaryRangeFrom);

      const newjobPost = removeUndefinedFromObj(jobPost);

      jobDescriptionForm.setFieldsValue({ ...newjobPost });
      setSelectedCurrency(newjobPost.currencyId);
      // if (accomodationTypeObj) {
      //   jobBenfitForm.setFieldsValue({
      //     ...newjobPost,
      //     accommodationListId: accomodationTypeObj,
      //   });
      // } else {
      //   jobBenfitForm.setFieldsValue({
      //     ...newjobPost,
      //   });
      // }
      jobBenfitForm.setFieldsValue({
        ...newjobPost,
      });
      setMinimumExperience(jobPost?.experienceListId);
      jobRequirementsForm.setFieldsValue({
        ...newjobPost,
        languageId: languageTitle,
        otherLanguageId,
      });
      jobInfoForm.setFieldsValue({
        ...newjobPost,
        startDate,
        endDate,
        companyId,
        // countryId,
        cityId,
      });
      setSelectedSector(true);
      setCategoryId(jobPost?.categoriesId);
    }
  }, [jobPost]);

  useEffect(() => {
    if (
      jobInfoTempCreatedSuccessfully === true ||
      jobBenefitsTempCreateSuccess === true ||
      jobRequirementsCreateSuccess === true ||
      jobDescriptionCreateSuccess === true
    ) {
      showSuccessMessage("template created successfully");
      dispatch(getJobInformationTemplate());
      dispatch(getJobBenefitsTemplate());
      dispatch(getJobRequirementsTemplate());
      dispatch(getJobDescriptionTemplate());
    }
  }, [
    jobInfoTempCreatedSuccessfully,
    jobBenefitsTempCreateSuccess,
    jobRequirementsCreateSuccess,
    jobDescriptionCreateSuccess,
  ]);

  useEffect(() => {
    if (
      jobInfoEditSuccess ||
      jobBenefitsEditSuccess ||
      jobRequirementsEditSuccess ||
      jobDescriptionEditSuccess
    ) {
      showSuccessMessage("template updated successfully");
      dispatch(getJobInformationTemplate());
      dispatch(getJobBenefitsTemplate());
      dispatch(getJobRequirementsTemplate());
      dispatch(getJobDescriptionTemplate());
    }
  }, [jobInfoEditSuccess, jobBenefitsEditSuccess, jobRequirementsEditSuccess]);

  useEffect(() => {
    if (jobBenefitsTemplateById) {
      setgetjobBenefitsTemplateByIdLoading(false);
      const salaryTypeId = Number(jobBenefitsTemplateById?.salaryTypeId);
      setSelectedCurrency(jobBenefitsTemplateById?.currencyId);
      const accommodationListId =
        jobBenefitsTemplateById?.accommodationListId?.map((i) => Number(i));

      setSalaryStart(jobBenefitsTemplateById.salaryRangeFrom);
      let _jobBenefitsTemplateById = removeUndefinedFromObj(
        jobBenefitsTemplateById
      );
      jobBenfitForm.setFieldsValue({
        ..._jobBenefitsTemplateById,
        salaryTypeId,
        accommodationListId,
      });
    }
  }, [jobBenefitsTemplateById]);

  useEffect(() => {
    if (jobRequirementsTemplateById) {
      setjobRequirementsTemplateByIdLoading(false);

      const languageId = String(jobRequirementsTemplateById?.languageId);
      const otherLanguageId = jobRequirementsTemplateById?.otherLanguageId?.map(
        (id) => findTitleById(languages, Number(id))
      );

      const experienceListId = setMinimumExperience(
        jobRequirementsTemplateById?.experienceListId
          ? jobRequirementsTemplateById?.experienceListId
          : 1
      );
      const ageLimit = setMinimumAge(
        jobRequirementsTemplateById?.ageLimit
          ? jobRequirementsTemplateById?.ageLimit
          : 16
      );

      let _jobRequirementsTemplateById = removeUndefinedFromObj(
        jobRequirementsTemplateById
      );
      jobRequirementsForm.setFieldsValue({
        ..._jobRequirementsTemplateById,
        languageId,
        otherLanguageId,
        experienceListId,
        ageLimit,
      });
    }
  }, [jobRequirementsTemplateById]);

  useEffect(() => {
    if (jobPostSuccess === true || jobUpdatedSuccessfully === true) {
      console.log("GET JOB LIST IN POST JOBS");
      HandleForm();
      setPreviewJob(false);
      dispatch(getJobList());
      resetFormFields();
    }
  }, [jobPostSuccess, jobUpdatedSuccessfully]);

  useEffect(() => {
    if (
      jobDescriptionTemplateById !== null &&
      jobDescriptionTemplateById !== undefined
    ) {
      setjobDescriptionTemplateByIdLoading(false);
      let _jobDescriptionTemplateById = removeUndefinedFromObj(
        jobDescriptionTemplateById
      );
      jobDescriptionForm.setFieldsValue({ ..._jobDescriptionTemplateById });
    }
  }, [jobDescriptionTemplateById]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPremium(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const onFinishInfo = (values) => {
    delete values.savedTemplate;
    if (jobInfoTemplatebyId?.id) {
      // values.cityId = employerProfile?.companyProfile?.city?.id;
      values.companyId = employerProfile?.companyProfileId;
      // values.countryId = employerProfile?.companyProfile?.countryId;
      values.startDate = values.startDate
        ? moment(values.startDate).toISOString()
        : moment().toISOString();
      values.endDate = values.endDate
        ? moment(values.endDate).toISOString()
        : moment().toISOString();
      values.positionsAvaibale = postitionsAvailable;

      dispatch(
        editJobInfoTemplate({ id: jobInfoTemplatebyId?.id, payload: values })
      );
      dispatch(getJobInformationTemplate());
    } else {
      // values.cityId = employerProfile?.companyProfile?.city?.id;
      values.companyId = employerProfile?.companyProfileId;
      // values.countryId = employerProfile?.companyProfile?.countryId;
      values.startDate = values.startDate?.toISOString();
      values.endDate = values?.endDate?.toISOString();
      values.positionsAvaibale = postitionsAvailable;

      const payload = values;
      dispatch(postJobInformationTemplate({ payload }));
    }
  };

  const onFinishBenefits = (values) => {
    delete values.savedTemplate;
    const jobBenefitsData = removeUndefinedFromObj(values);

    if (jobBenefitsTemplateById?.id) {
      dispatch(
        editJobBenefitsTemplate({
          id: jobBenefitsTemplateById?.id,
          payload: jobBenefitsData,
        })
      );
    } else {
      jobBenefitsData.accommodationListId = [
        jobBenefitsData.accommodationListId,
      ];
      dispatch(postJobBenefitsTemplate({ payload: jobBenefitsData }));
    }
  };

  const onFinishRequirements = (values) => {
    delete values.savedTemplate;
    values.experienceListId = minimumExperience;
    values.ageLimit = minimumAge;
    if (jobRequirementsTemplateById?.id) {
      const ids = [];
      const otherLanguageId = values.otherLanguageId;
      otherLanguageId.map((l) => {
        if (isNaN(l)) {
          languages.map((v) => {
            if (v.title == l) {
              ids.push(v.id);
            }
          });
        } else {
          ids.push(l);
        }
      });
      if (ids.length) {
        values.otherLanguageId = ids;
      }
      dispatch(
        editJobRequirementsTemplate({
          id: jobRequirementsTemplateById?.id,
          payload: values,
        })
      );
    } else {
      const payload = values;
      dispatch(postJobRequirementsTemplate({ payload }));
    }
  };

  const resetJobDescriptionForm = () => {
    jobDescriptionForm.resetFields();
    dispatch(resetJobDescription());
  };
  const resetJobInfoForm = () => {
    jobInfoForm.resetFields([
      "countryId",
      "title",
      "cityId",
      "gender",
      // "endDate",
      // "startDate",
      "savedTemplate",
      "wfh",
      "jobTitleId",
      "employmentTypeId",
      "jobBrief",
      "branchName",
      "categoriesId",
      "positionsAvaibale",
    ]);
    setPostitionsAvailable(1);
    dispatch(resetJobInfo());
  };
  const resetJobBenefitsForm = () => {
    setSalaryStart(null);
    setSalaryEnd(null);
    setSelectedCurrency(null);
    jobBenfitForm.resetFields();
    dispatch(resetJobBenefit());
  };

  const resetJobRequrementsForm = () => {
    jobRequirementsForm.resetFields();
    dispatch(resetJobRequirements());
    setMinimumExperience(1);
    setMinimumAge(16);
  };

  const onFinishDescription = (values) => {
    delete values.savedTemplate;
    if (jobDescriptionTemplateById?.id) {
      dispatch(
        editJobDescriptionTemplate({
          id: jobDescriptionTemplateById?.id,
          payload: values,
        })
      );
    } else {
      const payload = values;
      dispatch(postJobDescriptionTemplate({ payload }));
    }
  };
  const startAndEndDate = (date) => {
    if (date) return date?.toISOString();
    else return null;
  };

  const handlePostJob = async () => {
    try {
      try {
        await jobInfoForm.validateFields();
      } catch (error) {
        showWarningMessage(
          "Please provide required fields to continue in Job Infomation form"
        );
        return;
      }
      try {
        await jobBenfitForm.validateFields();
      } catch (error) {
        showWarningMessage(
          "Please provide required fields to continue in Job Benefits form"
        );
        return;
      }
      try {
        await jobRequirementsForm.validateFields();
      } catch (error) {
        showWarningMessage(
          "Please provide required fields to continue in Requirements form"
        );
        return;
      }
      try {
        await jobDescriptionForm.validateFields();
      } catch (error) {
        showWarningMessage(
          "Please provide required fields to continue in Job Descriptions form"
        );
        return;
      }
      setFieldsMissing(false);
    } catch (error) {
      setFieldsMissing(true);

      showWarningMessage(error.errorFields[0].name[0] + " is missing in form");
    }

    if (
      jobInfoForm.isFieldsValidating &&
      jobBenfitForm.isFieldsValidating &&
      jobDescriptionForm.isFieldsValidating &&
      jobRequirementsForm.isFieldsValidating
    ) {
      if (fieldsMissingRef.current != true) {
        const jobInfoFormData = jobInfoForm.getFieldsValue();
        const jobBenefitsFormData = jobBenfitForm.getFieldsValue();
        const jobRequirementsFormData = jobRequirementsForm.getFieldsValue();
        const jobDescriptionFormData = jobDescriptionForm.getFieldsValue();
        const payload = Object.assign(
          jobInfoFormData,
          jobBenefitsFormData,
          jobRequirementsFormData,
          jobDescriptionFormData
        );
        // payload.cityId = employerProfile?.companyProfile?.city?.id;
        payload.companyId = employerProfile?.companyProfileId;

        payload.startDate = startAndEndDate(payload.startDate);
        payload.endDate = startAndEndDate(payload.endDate);
        if (isNaN(parseInt(payload.cityId))) payload.cityId = jobPost?.cityId;

        payload.positionsAvaibale = postitionsAvailable;
        payload.experienceListId = minimumExperience;
        payload.ageLimit = minimumAge;

        delete payload.title;
        if (!Array.isArray(payload.accommodationListId)) {
          payload.accommodationListId = [payload?.accommodationListId];
        }

        // payload.accommodationListId = [payload.accommodationListId];
        if (isNaN(payload.languageId)) {
          payload.languageId = findIdByTitle(languages, payload.languageId);
        }
        payload.otherLanguageId = payload?.otherLanguageId?.map((t) => {
          const id = findIdByTitle(languages, t);
          if (!id) {
            return t;
          } else {
            return id;
          }
        });
        if (payload.savedTemplate) {
          delete payload.savedTemplate;
        }
        if (!jobPostId) {
          dispatch(postJobPost({ payload }));
          // ------------------
          // dispatch(getJobList());
          // resetFormFields()
        } else if (jobPostId) {
          console.log("UPDATE", payload);
          dispatch(updateJobPost({ id: jobPostId, payload: payload }));
          // ------------------
          // dispatch(getJobList());
          // resetFormFields()
        }
      } else {
        return;
      }
    }
  };
  const handlePreview = async () => {
    try {
      try {
        await jobInfoForm.validateFields();
      } catch (error) {
        showWarningMessage(
          "Please provide required fields to continue in Job Infomation form"
        );
        return;
      }
      try {
        await jobBenfitForm.validateFields();
      } catch (error) {
        showWarningMessage(
          "Please provide required fields to continue in Job Benefits form"
        );
        return;
      }
      try {
        await jobRequirementsForm.validateFields();
      } catch (error) {
        showWarningMessage(
          "Please provide required fields to continue in Requirements form"
        );
        return;
      }
      try {
        await jobDescriptionForm.validateFields();
      } catch (error) {
        showWarningMessage(
          "Please provide required fields to continue in Job Descriptions form"
        );
        return;
      }
      setFieldsMissing(false);
    } catch (error) {
      setFieldsMissing(true);
      showWarningMessage(error.errorFields[0].name[0] + " is missing in form");
    }

    if (
      jobInfoForm.isFieldsValidating &&
      jobBenfitForm.isFieldsValidating &&
      jobDescriptionForm.isFieldsValidating &&
      jobRequirementsForm.isFieldsValidating
    ) {
      if (fieldsMissingRef.current != true) {
        const jobInfoFormData = jobInfoForm.getFieldsValue();
        const jobBenefitsFormData = jobBenfitForm.getFieldsValue();
        const jobRequirementsFormData = jobRequirementsForm.getFieldsValue();
        const jobDescriptionFormData = jobDescriptionForm.getFieldsValue();
        const payload = Object.assign(
          jobInfoFormData,
          jobBenefitsFormData,
          jobRequirementsFormData,
          jobDescriptionFormData
        );
        console.log("payload -> ", payload);
        payload.cityId = employerProfile?.companyProfile?.city?.id;
        payload.companyId = employerProfile?.companyProfileId;
        payload.startDate = startAndEndDate(payload.startDate); //payload.startDate?.toISOString();
        payload.endDate = startAndEndDate(payload.endDate); //payload.endDate?.toISOString();
        payload.positionsAvaibale = postitionsAvailable;
        delete payload.title;
        payload.countryId = employerProfile?.companyProfile?.countryId;
        payload.companyId = employerProfile?.companyProfileId;
        // payload.otherLanguageId = payload?.otherLanguageId?.map((t) => {
        //   return findIdByTitle(languages, t);
        // });
        const tagLine = employerProfile?.companyProfile?.tagLine;
        const companyName = employerProfile?.companyProfile?.companyName;
        const companyType = employerProfile?.companyProfile?.companyType;
        const photoUrl = employerProfile?.companyProfile?.photoUrl;
        const introduction = employerProfile?.companyProfile?.introduction;
        const videoUrl = employerProfile?.companyProfile?.videoUrl;
        const companyLogo = employerProfile?.companyProfile?.companyLogo;
        const companyBanner = employerProfile?.companyProfile?.companyBanner;
        const companyLocation =
          employerProfile?.companyProfile?.companyLocation;
        const company = {};
        payload.company = {
          ...company,
          tagLine,
          companyName,
          companyType,
          photoUrl,
          introduction,
          videoUrl,
          companyLogo,
          companyBanner,
          companyLocation,
        };
        dispatch(getJobTitleById(payload.jobTitleId));
        dispatch(getSuitableJobById(payload.suitableJobId));
        dispatch(getQualificationById(payload.qualificationId));
        setPreviewJob(true);
        setJobDetails(payload);
      } else {
        setPreviewJob(false);
      }
    }
  };

  const handleLocationSelect = (e) => {
    jobInfoForm.setFieldsValue({ cityId: "" });
    if (e) {
      setCountryId(e);
    }
  };

  const resetFormFields = () => {
    resetJobInfoForm();
    resetJobBenefitsForm();
    resetJobRequrementsForm();
    resetJobDescriptionForm();
    setJobPostId(null);
    setSelectJob(false);
    // setCollapseOpen(false)
  };

  function showConfirm() {
    confirm({
      title: "Discard all changes?",
      onOk() {
        window.requestIdleCallback(
          function (deadline) {
            while (deadline.timeRemaining() > 0) {
              HandleForm();
              setPreviewJob(false);
              resetFormFields();
            }
          },
          { timeout: 1000 }
        );

        // HandleForm();
        // setPreviewJob(false);
        // resetFormFields()
        // console.log("COnfirm waley jaga false krta hai")
      },
    });
  }

  const tagCheck = (e) => {
    if (e.length > 5) {
      e.pop();
      showWarningMessage("maximum 5 tags allowed");
    }
  };

  return (
    <>
      <div id="fix" className="post-job-main">
        <Spin spinning={false}>
          <img
            onClick={() => {
              showConfirm();
            }}
            className="back-icon"
            src={require("../../assets/images/icons/Back-white.svg")}
            alt=""
          />
          <Form onFinish={handlePostJob} id="mainForm">
            {/* Job information */}
            <Form
              style={{ zIndex: 200 }}
              form={jobInfoForm}
              onFinish={onFinishInfo}
              initialValues={{
                ...jobInfoTemplatebyId,
                startDate: jobInfoTemplatebyId?.startDate
                  ? moment(jobInfoTemplatebyId?.startDate)
                  : null,
                endDate: jobInfoTemplatebyId?.endDate
                  ? moment(jobInfoTemplatebyId?.endDate)
                  : null,
              }}
              layout="vertical"
              className="c-form p-0">
              <Form_Wrapper
                themeShadow=""
                formImgae="leftImage"
                formTitle="Job information"
                titleColor="black"
                // collapseOpen={collapseOpen}
                // setCollapseOpen={setCollapseOpen}
              >
                <ConfigProvider
                  renderEmpty={() =>
                    customizeRenderEmpty("No saved templates")
                  }>
                  <div
                    style={{ zIndex: 400 }}
                    className="flex-end drop-down-right">
                    <Form.Item
                      name="savedTemplate"
                      label={"Choose from saved templates"}
                      className="select-lg pb-3 ">
                      <Select
                        className="scroll-to-smooth"
                        allowClear={true}
                        onClear={() => {
                          dispatch(resetJobInfo());
                          jobInfoForm.resetFields([
                            "countryId",
                            "title",
                            "cityId",
                            "gender",
                            // "endDate",
                            // "startDate",
                            "savedTemplate",
                            "wfh",
                            "jobTitleId",
                            "employmentTypeId",
                            "jobBrief",
                            "branchName",
                            "categoriesId",
                          ]);
                        }}
                        getPopupContainer={(trigger) => trigger.parentNode}
                        placeholder="Select"
                        onSelect={(value) => {
                          setgetJobInformationTemplatebyIdLoading(true);
                          dispatch(getJobInformationTemplatebyId(value));
                        }}>
                        {jobInfoTemplate?.map((template, i) => (
                          <Option key={i} value={template?.id}>
                            {template?.title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </ConfigProvider>

                {getJobInformationTemplatebyIdLoading ? (
                  <div className="d-flex w-100 justify-content-center">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Row gutter={[32, 16]} className="form-rows form-content">
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          // rules={rules.requiredRule}
                          label={"Template Title"}
                          name="title"
                          className="c-input pb-3">
                          <Input
                            placeholder="Template title"
                            className="box-shadow"
                            type="text"
                            autoComplete={"" + Math.random()}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row
                      style={{ zIndex: 320 }}
                      gutter={[32, 16]}
                      className="form-rows">
                      <Col
                        span={24}
                        md={{ span: 24 }}
                        sm={{ span: 24 }}
                        lg={{ span: 24 }}>
                        <Form.Item
                          rules={rules.requiredRule}
                          label={" A brief explanation of who're looking for"}
                          name="jobBrief"
                          className="c-input">
                          <Input
                            placeholder="e.g We are searching for a Primary teacher to join our school in dubai immediately"
                            type="text"
                            autoComplete={"" + Math.random()}
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          name="companyId"
                          label={"Company name"}
                          name="companyId"
                          className="c-input">
                          <Input
                            disabled={true}
                            value={employerProfile?.companyProfile?.companyName}
                            type="text"></Input>
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          name="branchName"
                          label={" Branch name (if applicable)"}
                          className="c-input">
                          <Input placeholder="Branch Name" type="text"></Input>
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 300 }}>
                        <Form.Item
                          label={"Contract type"}
                          rules={rules.requiredRule}
                          name="employmentTypeId">
                          <Select
                            className="scroll-to-smooth"
                            allowClear={true}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            placeholder="Select"
                            onChange={null}>
                            {employmentType?.map((d, i) => (
                              <Option key={i} value={d?.id}>
                                {d?.title}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 290 }}>
                        <Form.Item
                          name="categoriesId"
                          rules={rules.requiredRule}
                          label={"Sector"}>
                          <SuperSelect
                            onClear={() => {
                              setCategoryId(null);
                              jobInfoForm.resetFields(["jobTitleId"]);
                            }}
                            onSelect={(v) => {
                              jobInfoForm.resetFields(["jobTitleId"]);
                              setSelectedSector(true);
                              setCategoryId(v);
                            }}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            fetchOptions={getSectors}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 280 }}>
                        <Form.Item
                          rules={rules.requiredRule}
                          name="jobTitleId"
                          label={"Job title"}>
                          <SuperSelect
                            disabled={!categoryId}
                            dependencyId={categoryId}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            fetchOptions={getJobTitle}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 270 }}>
                        <Form.Item
                          name="wfh"
                          label="Work from home"
                          rules={rules.requiredRule}>
                          <Select
                            allowClear={true}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            placeholder="Select">
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          className="c-date-picker"
                          label={"When will the job start?"}
                          name="startDate">
                          <DatePicker
                            // defaultValue={moment()}
                            format={"DD/MM/YYYY"}
                            disabledDate={checkDisabledDate}
                            onChange={(e) => {
                              setStartDate(e);
                              jobInfoForm.resetFields(["endDate"]);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          className="c-date-picker"
                          name="endDate"
                          label={"When will the job end?"}>
                          <DatePicker
                            // defaultValue={startDate}
                            format={"DD/MM/YYYY"}
                            disabled={!startDate}
                            disabledDate={(current) => {
                              return current && current < startDate;
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 260 }}>
                        <Form.Item name="gender" label={"Gender"}>
                          <Select
                            allowClear={true}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            placeholder="Select">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="both">Both</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 250 }}>
                        <Form.Item name="countryId" label={"Country"}>
                          <SuperSelect
                            onSelect={handleLocationSelect}
                            onClear={() => {
                              setCountryId("");
                              jobInfoForm.setFieldsValue({ cityId: "" });
                            }}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            fetchOptions={getCountry}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 240 }}>
                        <Form.Item
                          {...(countryId && { rules: rules.requiredRule })}
                          name="cityId"
                          label={"Job city"}>
                          <SuperSelect
                            dependencyId={countryId}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            fetchOptions={getCitiesById}
                            disabled={!countryId}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          name="positionsAvaibale"
                          label={"No of Positions available"}
                          className="c-input counter">
                          <Button
                            onClick={
                              postitionsAvailable > 1
                                ? () =>
                                    setPostitionsAvailable(
                                      postitionsAvailable - 1
                                    )
                                : () => setPostitionsAvailable(1)
                            }
                            className="rounded minus">
                            -
                          </Button>
                          <Button
                            onClick={
                              postitionsAvailable <= 19
                                ? () =>
                                    setPostitionsAvailable(
                                      postitionsAvailable + 1
                                    )
                                : () => setPostitionsAvailable(20)
                            }
                            className="rounded plus">
                            +
                          </Button>
                          <Input value={postitionsAvailable} />
                        </Form.Item>
                      </Col>
                      <div className="template-btns">
                        <Button
                          onClick={() => {
                            jobInfoForm.resetFields([
                              "countryId",
                              "title",
                              "cityId",
                              "gender",
                              // "endDate",
                              // "startDate",
                              "savedTemplate",
                              "wfh",
                              "jobTitleId",
                              "employmentTypeId",
                              "jobBrief",
                              "branchName",
                              "categoriesId",
                              "positionsAvaibale",
                            ]);
                            setPostitionsAvailable(1);
                            dispatch(resetJobInfo());
                          }}
                          themecolor="red-radian light">
                          Clear Form
                        </Button>
                        <Button htmlType="submit" themecolor="light">
                          Save template
                        </Button>
                      </div>
                    </Row>
                  </>
                )}
              </Form_Wrapper>
            </Form>
            {/* Job benefits */}
            <Form
              style={{ zIndex: 150 }}
              className="c-form p-0"
              layout="vertical"
              initialValues={jobBenefitsTemplateById}
              form={jobBenfitForm}
              onFinish={onFinishBenefits}>
              <Form_Wrapper
                formImgae="leftImage"
                formTitle="Job benefits"
                titleColor="black"
                // collapseOpen={collapseOpen}
                // setCollapseOpen={setCollapseOpen}
              >
                <ConfigProvider
                  renderEmpty={() =>
                    customizeRenderEmpty("No saved templates")
                  }>
                  <div
                    style={{ zIndex: 399 }}
                    className="flex-end drop-down-right">
                    <Form.Item
                      name="savedTemplate"
                      label={"Choose from saved templates"}
                      className="select-lg pb-3">
                      <Select
                        className="scroll-to-smooth"
                        allowClear={true}
                        dropdownClassName="custom-dropdown-2"
                        getPopupContainer={(trigger) => trigger.parentNode}
                        placeholder="Select"
                        onSelect={(value) => {
                          setgetjobBenefitsTemplateByIdLoading(true);
                          dispatch(getJobBenefitsTemplateById(value));
                        }}>
                        {jobBenefitsTemplate?.map((template, i) => (
                          <Option key={i} value={template?.id}>
                            {template?.title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </ConfigProvider>
                {getjobBenefitsTemplateByIdLoading ? (
                  <div className="d-flex w-100 justify-content-center">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Row gutter={[32, 16]} className="form-rows form-content ">
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          style={{ zIndex: 340 }}
                          // rules={rules.requiredRule}
                          label={"Template Title"}
                          name="title"
                          className="c-input">
                          <Input
                            placeholder="Template title"
                            type="text"
                            autoComplete={"off"}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="form-rows" gutter={[32, 16]} align="top">
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 330 }}>
                        <Form.Item
                          rules={rules.requiredRule}
                          name="salaryTypeId"
                          label={"Salary type"}>
                          <Select
                            className="scroll-to-smooth"
                            allowClear={true}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            placeholder="Select">
                            {salaryTypes?.map((d, i) => (
                              <Option key={i} value={d?.id}>
                                {d?.title}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 320 }}>
                        <Form.Item
                          rules={rules.requiredRule}
                          name="currencyId"
                          label={"Currency"}>
                          <SuperSelect
                            onSelect={(v) => setSelectedCurrency(v)}
                            style={{ zIndex: 500 }}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            fetchOptions={getCurrencies}
                            keys={["id", "code"]}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 310 }}>
                        <Form.Item
                          name="accommodationListId"
                          label={"Accommodation"}>
                          <Select
                            className="scroll-to-smooth"
                            allowClear={true}
                            showSearch={true}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            placeholder="Select">
                            {accomodationType?.map((d, i) => (
                              <Option key={i} value={d?.id}>
                                {d?.title}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          rules={rules.requiredRule}
                          name="salaryRangeFrom"
                          label={
                            <span className="d-flex justify-content-between">
                              Salary range from
                              <span className="selected-range">
                                {salaryStart == 0 ? " " : salaryStart}
                                {findCurrencyCodeById(
                                  currencyType,
                                  selectedCurrency
                                )}
                              </span>
                            </span>
                          }
                          className="c-input">
                          <Input
                            placeholder="0"
                            disabled={selectedCurrency ? false : true}
                            type="number"
                            min="0"
                            onChange={(e) => setSalaryStart(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          rules={rules.salaryRule}
                          name="salaryRangeUpto"
                          label={
                            <span className="d-flex justify-content-between">
                              Upto
                              <span className="selected-range">
                                {salaryEnd == 0 ? " " : salaryEnd}{" "}
                                {findCurrencyCodeById(
                                  currencyType,
                                  selectedCurrency
                                )}
                              </span>
                            </span>
                          }
                          className="c-input">
                          <Input
                            disabled={selectedCurrency ? false : true}
                            type="number"
                            placeholder="500"
                            min={salaryStart}
                            onChange={(e) => setSalaryEnd(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          name="gratuiltyBonus"
                          label={"Gratuity bonus"}
                          className="c-input">
                          <Input
                            type="text"
                            placeholder="Gratuity bonus"></Input>
                        </Form.Item>
                      </Col>

                      <Col
                        span={4}
                        md={{ span: 6 }}
                        xs={{ span: 24 }}
                        lg={{ span: 4 }}>
                        <Form.Item
                          className="c-switch"
                          valuePropName="checked"
                          label="Annual flight provided"
                          name="isAnnualFlight">
                          <Switch size="small" className="mr-2" />
                        </Form.Item>
                      </Col>

                      {/* <Col
                  span={4}
                  md={{ span: 6 }}
                  xs={{ span: 12 }}
                  lg={{ span: 4 }}>
                  <Form.Item
                    className="c-switch"
                    valuePropName="checked"
                    name="isGratuityBonus"
                    label="Provides Gratuity bonus">
                    {" "}
                    <Switch
                      onChange={(e) => {
                        e === true
                          ? setGratuityBonus(true)
                          : setGratuityBonus(false);
                        jobBenfitForm.resetFields(["gratuiltyBonus"]);
                      }}
                      size="small"
                      className="mr-2"
                    />
                  </Form.Item>
                </Col> */}

                      <Col
                        span={4}
                        sm={{ span: 6 }}
                        xs={{ span: 24 }}
                        lg={{ span: 4 }}>
                        <Form.Item
                          className="c-switch"
                          valuePropName="checked"
                          name="isFamilyFlight"
                          label="Include family flights">
                          <Switch size="small" className="mr-2" />
                        </Form.Item>
                      </Col>
                      <Col
                        span={4}
                        sm={{ span: 6 }}
                        xs={{ span: 24 }}
                        lg={{ span: 4 }}>
                        <Form.Item
                          className="c-switch"
                          valuePropName="checked"
                          name="isUtilityBills"
                          label="Include utility bills">
                          <Switch size="small" className="mr-2 " />
                        </Form.Item>
                      </Col>

                      <Col
                        span={4}
                        sm={{ span: 6 }}
                        xs={{ span: 24 }}
                        lg={{ span: 4 }}>
                        <Form.Item
                          className="c-switch"
                          valuePropName="checked"
                          name="isTuitionFee"
                          label="Include tuition fees">
                          <Switch size="small" className="mr-2 " />
                        </Form.Item>
                      </Col>
                      <Col
                        span={4}
                        sm={{ span: 6 }}
                        xs={{ span: 24 }}
                        lg={{ span: 4 }}>
                        <Form.Item
                          className="c-switch"
                          valuePropName="checked"
                          name="isProvideVisa"
                          label="Provides visa">
                          <Switch size="small" className="mr-2 " />
                        </Form.Item>
                      </Col>

                      <Col span={24} style={{ zIndex: 250 }}>
                        <Form.Item
                          valuePropName="data"
                          name="otherBenefits"
                          className="checking-ck"
                          label="Other Benefits"
                          getValueFromEvent={(event, editor) => {
                            const data = editor.getData();
                            return data;
                          }}>
                          <CKEditor
                            id="otherBenefits"
                            name="template"
                            editor={ClassicEditor}
                            config={{
                              toolbar: [
                                "bold",
                                "italic",
                                "link",
                                "numberedList",
                                "bulletedList",
                              ],
                              height: 500,
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <div className="template-btns">
                        <Button
                          onClick={() => {
                            setSalaryStart(null);
                            setSalaryEnd(null);
                            setSelectedCurrency(null);
                            jobBenfitForm.resetFields();
                            dispatch(resetJobBenefit());
                          }}
                          themecolor="red-radian light">
                          Clear Form
                        </Button>
                        <Button htmlType="submit" themecolor="light">
                          Save template
                        </Button>
                      </div>
                    </Row>
                  </>
                )}
              </Form_Wrapper>
            </Form>
            {/* Requirements */}
            <Form
              style={{ zIndex: 120 }}
              layout="vertical"
              form={jobRequirementsForm}
              // initialValues={jobRequirementsTemplateById}
              className="c-form p-0"
              onFinish={onFinishRequirements}>
              <Form_Wrapper
                themeShadow=""
                formImgae="leftImage"
                formTitle="Requirements"
                titleColor="black"
                // collapseOpen={collapseOpen}
                // setCollapseOpen={setCollapseOpen}
              >
                <ConfigProvider
                  renderEmpty={() =>
                    customizeRenderEmpty("No saved templates")
                  }>
                  <div
                    style={{ zIndex: 398 }}
                    className="flex-end drop-down-right">
                    <Form.Item
                      name="savedTemplate"
                      label={"Choose from saved templates"}
                      className="select-lg pb-3">
                      <Select
                        className="scroll-to-smooth"
                        allowClear={true}
                        dropdownClassName="custom-dropdown-3"
                        getPopupContainer={(trigger) => trigger.parentNode}
                        placeholder="Select"
                        onSelect={(value) => {
                          setjobRequirementsTemplateByIdLoading(true);
                          dispatch(
                            getJobRequirementsTemplateById(value, () => {
                              setjobRequirementsTemplateByIdLoading(false);
                            })
                          );
                        }}>
                        {jobRequirementsTemplate?.map((template, i) => (
                          <Option key={i} value={template?.id}>
                            {template?.title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </ConfigProvider>

                {jobRequirementsTemplateByIdLoading ? (
                  <div className="d-flex w-100 justify-content-center">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Row gutter={[32, 16]} className="form-rows form-content">
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          // rules={rules.requiredRule}
                          label={"Template Title"}
                          name="title"
                          className="c-input">
                          <Input
                            placeholder="Template title"
                            type="text"
                            autoComplete={"off"}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[32, 16]} className="form-rows">
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 270 }}>
                        <Form.Item
                          name="qualificationId"
                          rules={rules.requiredRule}
                          label={"Qualification accepted"}>
                          <SuperSelect
                            getPopupContainer={(trigger) => trigger.parentNode}
                            fetchOptions={getQualification}
                            //  keys = {["id", "title"]}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 260 }}>
                        <Form.Item
                          label={"Certificates required"}
                          name="certificate"
                          className="c-input">
                          <Input
                            placeholder="Certificates"
                            type="text"
                            autoComplete={"off"}></Input>
                        </Form.Item>
                      </Col>
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 250 }}>
                        <Form.Item
                          name="experienceListId"
                          label={"Minimum years of experience"}
                          // rules={rules.requiredRule}
                          className="c-input counter">
                          <CounterInput
                            min={0}
                            max={20}
                            inputValue={minimumExperience}
                            setValue={setMinimumExperience}
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 240 }}>
                        <Form.Item name="languageId" label={"Language"}>
                          <SuperSelect
                            placeholder="Select Native Lanugage"
                            getPopupContainer={(trigger) => trigger.parentNode}
                            fetchOptions={getLanguage}
                            dependencyId={jobRequirementsTemplateById}
                            isOptionString={true}
                            onSelect={() =>
                              jobRequirementsForm.setFieldsValue({
                                otherLanguageId: [],
                              })
                            }
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 230 }}>
                        <Form.Item
                          name="otherLanguageId"
                          label={" Other Languages"}>
                          <SuperSelect
                            mode="multiple"
                            maxTagCount="responsive"
                            placeholder="Select Other Lanugages"
                            getPopupContainer={(trigger) => trigger.parentNode}
                            fetchOptions={getLanguage}
                            isOptionString={true}
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        className="c-input counter"
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          name="ageLimit"
                          label="Miximum age requirement"
                          className="c-input ">
                          <CounterInput
                            min={16}
                            max={60}
                            inputValue={minimumAge}
                            setValue={setMinimumAge}
                          />
                        </Form.Item>
                      </Col>

                      {/* <Form.Item
                  name="otherRequirement"
                  label={"Other requirements"}
                  className="c-input pb-3">
                  <Input
                    placeholder=""
                    className="ant-input-lg"
                    type="text"></Input>
                </Form.Item> */}
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{ zIndex: 220 }}>
                        <Form.Item
                          rules={rules.requiredRule}
                          name="suitableJobId"
                          label={"Who's this job suitable for"}>
                          <Select
                            className="scroll-to-smooth"
                            allowClear={true}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            placeholder="Select">
                            {suitableJobs?.map((d, i) => (
                              <Option key={i} value={d?.id}>
                                {d?.title}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          name="additionalRequirement"
                          className="checking-ck"
                          label={"Additional requirements"}
                          valuePropName="data"
                          getValueFromEvent={(event, editor) => {
                            const data = editor.getData();
                            return data;
                          }}
                          // extra={
                          //   <span className="input-guide">Type and enter to add</span>
                          // }
                        >
                          <CKEditor
                            id="requirements"
                            name="template"
                            editor={ClassicEditor}
                            config={{
                              toolbar: [
                                "bold",
                                "italic",
                                "link",
                                "numberedList",
                                "bulletedList",
                              ],
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <div className="template-btns">
                        <Button
                          onClick={() => {
                            jobRequirementsForm.resetFields();
                            dispatch(resetJobRequirements());
                            setMinimumExperience(1);
                            setMinimumAge(16);
                          }}
                          themecolor="red-radian light">
                          Clear Form
                        </Button>
                        <Button htmlType="submit" themecolor="light">
                          Save template
                        </Button>
                      </div>
                    </Row>
                  </>
                )}
              </Form_Wrapper>
            </Form>
            {/* Job Description */}
            <Form
              style={{ zIndex: 100 }}
              initialValues={jobDescriptionTemplateById}
              layout="vertical"
              form={jobDescriptionForm}
              className="c-form p-0"
              onFinish={onFinishDescription}>
              <Form_Wrapper
                themeShadow=""
                formImgae="leftImage"
                formTitle="Job Description"
                titleColor="black"
                // collapseOpen={collapseOpen}
                // setCollapseOpen={setCollapseOpen}
              >
                <ConfigProvider
                  renderEmpty={() =>
                    customizeRenderEmpty("No saved templates")
                  }>
                  <div
                    style={{ zIndex: 396 }}
                    className="flex-end drop-down-right">
                    <Form.Item
                      name="savedTemplate"
                      label={"Choose from saved templates"}
                      className="select-lg pb-3">
                      <Select
                        className="scroll-to-smooth"
                        allowClear={true}
                        dropdownClassName="custom-dropdown-4"
                        getPopupContainer={(trigger) => trigger.parentNode}
                        placeholder="Select"
                        onSelect={(value) => {
                          setjobDescriptionTemplateByIdLoading(true);
                          dispatch(getJobDescriptionTemplateById(value));
                        }}>
                        {jobDescriptionTemplate?.map((template, i) => (
                          <Option key={i} value={template?.id}>
                            {template?.title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </ConfigProvider>

                {jobDescriptionTemplateByIdLoading ? (
                  <div className="d-flex w-100 justify-content-center">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Row gutter={[32, 16]} className="form-rows form-content">
                      <Col
                        span={8}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        lg={{ span: 8 }}
                        xs={{ span: 24 }}>
                        <Form.Item
                          // rules={rules.requiredRule}
                          label={"Template Title"}
                          name="title"
                          className="c-input w-100 pb-3">
                          <Input
                            placeholder="Template title"
                            type="text"
                            autoComplete={"off"}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[32, 16]} className="form-rows">
                      <Col span={24}>
                        <Form.Item
                          required
                          rules={rules.requiredRule}
                          valuePropName="data"
                          className="checking-ck"
                          getValueFromEvent={(event, editor) => {
                            const data = editor.getData();
                            return data;
                          }}
                          label="Job description"
                          name="description">
                          <CKEditor
                            id="description"
                            name="template"
                            editor={ClassicEditor}
                            config={{
                              toolbar: [
                                "bold",
                                "italic",
                                "link",
                                "numberedList",
                                "bulletedList",
                              ],
                              height: 500,
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          required
                          rules={rules.requiredRule}
                          name="skills"
                          className="checking-ck"
                          style={{ zIndex: 210 }}
                          label={"Skills required"}
                          valuePropName="data"
                          getValueFromEvent={(event, editor) => {
                            const data = editor.getData();
                            return data;
                          }}>
                          <CKEditor
                            id="skills"
                            name="template"
                            editor={ClassicEditor}
                            config={{
                              toolbar: [
                                "bold",
                                "italic",
                                "numberedList",
                                "bulletedList",
                              ],
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <ConfigProvider
                          renderEmpty={() => customizeRenderEmpty("No tag's")}>
                          <Form.Item
                            name="lisence"
                            style={{ zIndex: 200 }}
                            label={"License required"}
                            extra={
                              <span className="input-guide">
                                Type and enter to add and maximum 5 tags are
                                allowed
                              </span>
                            }>
                            <Select
                              className="ant-input-w100 drop-down-custom-class scroll-to-smooth"
                              mode="tags"
                              placeholder="License"
                              maxTagCount="responsive"
                              open={false}
                              tagRender={TagRender}
                              onChange={tagCheck}
                              getPopupContainer={(trigger) =>
                                trigger.parentNode
                              }></Select>
                          </Form.Item>
                        </ConfigProvider>
                      </Col>
                      <div className="template-btns">
                        <Button
                          onClick={() => {
                            jobDescriptionForm.resetFields();
                            dispatch(resetJobDescription());
                          }}
                          themecolor="red-radian light">
                          Clear Form
                        </Button>
                        <Button htmlType="submit" themecolor="light">
                          Save template
                        </Button>
                      </div>
                    </Row>
                  </>
                )}
              </Form_Wrapper>
            </Form>
          </Form>

          <div className="post-btns">
            <Button
              // disabled={isJobPostLoading}
              loading={isJobPostLoading}
              themecolor="grey"
              onClick={handlePreview}
              className="post-job-btn">
              Preview Job
            </Button>
            <Button
              // disabled={isJobPostLoading}
              loading={isJobPostLoading}
              form="mainForm"
              htmlType="submit"
              className="post-job-btn">
              {jobPostId ? "Update Job" : "Post Job"}
            </Button>
            {/* <Button onClick={() => setPremium(!premium)}>Next</Button> */}
          </div>
        </Spin>
      </div>
      {/* <div
        ref={premium ? wrapperRef : null}
        className={`premium-feature-hide ${!premium ? "premium-show" : ""}`}>
        <PremiumFeature />
      </div> */}
      {previewJob && (
        <div className="job-preview-section">
          <JobDetails
            data={transformJobData(
              jobDetails,
              null,
              null,
              null,
              salaryTypes,
              currencyType
            )}
          />
          <div className="btn-row">
            <Button themecolor="grey" onClick={() => setPreviewJob(false)}>
              Edit job
            </Button>
            <Button onClick={handlePostJob} themecolor="outlined-green">
              Submit
            </Button>
          </div>
        </div>
      )}
      {/* <MakePremium /> */}
    </>
  );
};

export default React.memo(Test);
