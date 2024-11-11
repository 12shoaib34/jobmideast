import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";
import { Map } from "../../shared-ui/Map/Map";
import Button from "../../shared-ui/Button/Button";
import moment from "moment";
import ImagesGallery from "../../shared-ui/ImagesGallery/ImagesGallery";
// import JobsCarouselv2 from "../../shared-ui/JobsCarousel/JobsCarouselv2";
import defaultImage from "../../assets/images/default.png";
import defaultBanner from "../../assets/images/sample/job-banner.png";
import { createMarkup, getTitleById, useWindowSize } from "../../utils/helper";
import { useAppSelector } from "../../store/hooks";
import "./_JobDetails.scss";
import "./_Responsive.scss";
import { Divider, Popover } from "antd";
import { useHistory, useParams } from "react-router-dom";
import ApplyToJobModal from "../ApplyToJobModal/ApplyToJobModal";
import ReactPlayer from "react-player";
import {
  selectCategories,
  selectEmployerProfile,
} from "../../features/auth/slice";

function JobDetails({
  data = {},
  showAllDetails = true,
  setJobDetails,
  extraData = {},
  showBenefits = true,
  HandleJobDetails,
  jobDetailsFromYourJobs,
}) {
  const history = useHistory();
  const pathname = history.location.pathname;
  const [applyToJobModal, setApplyToJobModal] = useState(false);
  const employerProfile = useAppSelector(selectEmployerProfile);
  const categories = useAppSelector(selectCategories);
  const { width } = useWindowSize();
  const {
    companyProfile: { specialities, companySize, categoryId },
  } = employerProfile;
  const category = getTitleById(categories, categoryId);
  const handleApplyToJob = () => {
    if (pathname === "/job-search") {
      setApplyToJobModal(true);
    }
  };
  const isYoutubeVideoURL = (url) => {
    if (url?.includes("youtube")) {
      return `https://www.youtube.com/embed/${
        url?.split("&")?.[0]?.split("=")?.[1]
      }?rel=0&showinfo=0`;
    } else {
      return url;
    }
  };

  return (
    <div className="c-job-detail-card">
      {/* Header */}
      <div className="header">
        <img
          className="job-banner-img"
          src={data?.company?.companyBanner || defaultBanner}
          alt="banner-img"
        />
        <span className="banner-img-overlay"></span>
        <span className=" banner-items">
          <div className="display-flex">
            <span className="company-img">
              <img
                src={data?.company?.companyLogo || defaultImage}
                alt="logo"
              />
            </span>
            <span className="company-details">
              <h1 className="company-name">
                {data?.company?.companyName || " "}
              </h1>

              <h1 className="company-type">{data?.company?.tagLine || " "}</h1>
              <h1 className="company-location small-text-common">
                {data?.country || " "}{" "}
                {data?.country && data?.city?.title && ","}
                {data?.city?.title || " "}{" "}
              </h1>
              <p className="job-date small-text-common">
                Job start date:{" "}
                {moment(data?.startDate ? data?.startDate : " ").format(
                  "DD/MM/YYYY"
                )}{" "}
              </p>

              <p className="job-date small-text-common">
                Contract end date:{" "}
                {moment(data?.endDate ? data?.endDate : " ").format(
                  "DD/MM/YYYY"
                )}{" "}
              </p>
              {width > 769 ? (
                <>
                  {specialities?.length >= 1 && (
                    <p className="company-specialities small-text-common">
                      Specialise in: {specialities?.join(", ")}
                    </p>
                  )}
                </>
              ) : null}
            </span>
          </div>
          {width > 769 ? (
            <div className="display-flex align-items company-details-wrapper">
              <span className="company-details center">
                <img
                  className="mr-1"
                  src={require("./../../assets/images/icons/Pie.svg")}
                />{" "}
                <div>
                  <h1 className="company-type d-flex align-items-center">
                    {" "}
                    Company Sector{" "}
                  </h1>
                  <p className="company-category">{category || " "}</p>
                </div>
              </span>

              <span className="company-details center">
                <img
                  className="mr-1"
                  src={require("./../../assets/images/icons/Users-3.svg")}
                />{" "}
                <div className="short-details">
                  <h1 className="company-type d-flex align-items-center">
                    Company Size{" "}
                  </h1>
                  <p className="company-category">{companySize || " "}</p>
                </div>
              </span>
            </div>
          ) : null}
        </span>

        {/* {showAllDetails && (
          <Button themecolor="transparent small">View Jobs</Button>
        )} */}

        {!jobDetailsFromYourJobs && (
          <div className="back-btn">
            <img
              onClick={HandleJobDetails}
              className="back-icon"
              src={require("../../assets/images/icons/Back-white.svg")}
              alt=""
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="job-details-wrapper">
        <span className="content-box first">
          <span className="content-section">
            <span className="details-header">
              {width > 1024 && (
                <>
                  <span>
                    <h3 className="job-title">
                      Job title :{" "}
                      <mark className="title">
                        {data?.jobTitle?.title || ""}
                      </mark>{" "}
                    </h3>
                    <span className="content-block">
                      <h6 className="block-title">Job brief</h6>
                      <p className="block-text">{data?.jobBrief}</p>
                    </span>
                  </span>

                  <span className="actions-wrapper">
                    <Button
                      onClick={handleApplyToJob}
                      themecolor="outlinedfilled"
                    >
                      Apply
                    </Button>
                    <ApplyToJobModal
                      applyToJobModal={applyToJobModal}
                      setApplyToJobModal={setApplyToJobModal}
                    />
                    <Button
                      // icon={<span className="icon following-icon"></span>}
                      title="Follow the company"
                      themecolor="outlined-green"
                    >
                      Following
                    </Button>
                    <Button
                      // icon={<span className="icon following-icon"></span>}
                      // title="Follow the company"
                      themecolor="outlined"
                    >
                      Shorlist Job
                    </Button>
                  </span>
                </>
              )}
            </span>

            {/* R E Q U I R E M E N T S */}

            <span className="content-block">
              <h6 className="block-title">Requirements</h6>
              <div className="markup">
                <ul className="m-0">
                  {data?.qualification?.title && (
                    <li>{data?.qualification?.title}</li>
                  )}
                  {data?.certificate && (
                    <li>Certificate required: &nbsp;{data?.certificate}</li>
                  )}
                  {data?.experienceListId >= 0 && (
                    <li>
                      {data?.experienceListId === 0
                        ? "No experience required"
                        : data.experienceListId +
                          " years of minimum experience"}
                      &nbsp;
                    </li>
                  )}
                  {data?.languageId && (
                    <li>
                      Native language: &nbsp;
                      {data?.language?.title || data?.languageId}
                    </li>
                  )}
                  {data?.ageLimit && <li>Age Limit: &nbsp;{data?.ageLimit}</li>}
                  {data?.suitableJob?.title && (
                    <li>{data?.suitableJob?.title}</li>
                  )}
                </ul>
              </div>
              {data?.additionalRequirement && (
                <div
                  className="markup"
                  dangerouslySetInnerHTML={createMarkup(
                    data.additionalRequirement
                  )}
                ></div>
              )}
            </span>
          </span>

          {/* {console.log("DATA", data)} */}

          {/* B E N E F I T S */}
          {width < 1025 && (
            <>
              <span className="mobile-view">
                <span>
                  <h3 className="job-title">
                    Job title :{" "}
                    <mark className="title">{data?.jobTitle?.title || ""}</mark>{" "}
                  </h3>
                  <span className="content-block">
                    <h6 className="job-title">Job brief</h6>
                    <p className="block-text">{data?.jobBrief}</p>
                  </span>
                </span>
                <span className="actions-wrapper">
                  <Button
                    onClick={handleApplyToJob}
                    themecolor="outlinedfilled"
                  >
                    Apply
                  </Button>
                  <ApplyToJobModal
                    applyToJobModal={applyToJobModal}
                    setApplyToJobModal={setApplyToJobModal}
                  />
                  <Button
                    // icon={<span className="icon following-icon"></span>}
                    title="Follow the company"
                    themecolor="outlined-green"
                  >
                    Following
                  </Button>
                  <Button
                    // icon={<span className="icon following-icon"></span>}
                    // title="Follow the company"
                    themecolor="outlined"
                  >
                    Shorlist Job
                  </Button>
                </span>
              </span>
            </>
          )}
          {(showAllDetails || showBenefits) && (
            <div className="benefits-list">
              <span>
                <h6 className="title">Benefits</h6>
              </span>
              <span>
                Salary
                <mark>
                  {data?.salaryRangeFrom}-{data?.salaryRangeUpto}{" "}
                  {data?.currency}/{data?.salaryType}
                </mark>
              </span>
              <span>
                Flights provided
                <mark>{data?.isAnnualFlight ? "Yes" : "No"}</mark>
              </span>
              <span>
                Family flights included
                <mark>{data?.isFamilyFlight ? "Yes" : "No"}</mark>
              </span>
              <span>
                Tuition fees covered
                <mark>{data?.isTuitionFee ? "Yes" : "No"}</mark>
              </span>
              <span>
                Accommodation
                {!data?.accommodationListId && <mark>None</mark>}
                {data?.accommodationListId && <mark>Yes</mark>}
              </span>
              <span>
                Utility bills
                <mark>{data?.isUtilityBills ? "Yes" : "No"}</mark>
              </span>
              <span>
                Visa provided
                <mark>{data?.isProvideVisa ? "Yes" : "No"}</mark>
              </span>
              <span>
                Gratuity bonus
                <mark>{data?.isGratuityBonus ? "Yes" : "No"}</mark>
              </span>
            </div>
          )}
        </span>

        <span className="content-box">
          <span className="content-section">
            {/* L I S E N C E  */}
            {data?.lisence && (
              <span className="content-block">
                <h6 className="block-title">Lisence Required</h6>
                <div className="markup">
                  <ul className="m-0">
                    {data?.lisence?.map((d, key) => (
                      <li key={key}>{d}</li>
                    ))}
                  </ul>
                </div>
              </span>
            )}
            {/* J O B _ D E S C R I P T I O N */}
            {data?.description && (
              <span className="content-block">
                <h6 className="block-title">Jobs description</h6>
                <div
                  className="markup"
                  dangerouslySetInnerHTML={createMarkup(data?.description)}
                ></div>
              </span>
            )}
            {/* S K I L L S  */}
            {data?.skills && (
              <span className="content-block">
                <h6 className="block-title">Skills required</h6>
                <div
                  className="markup"
                  dangerouslySetInnerHTML={createMarkup(data?.skills)}
                ></div>
              </span>
            )}
            {/* A B O U T _ C O M P A N Y */}
            {showAllDetails && (
              <>
                <Divider type="horizontal" />
                <span className="content-block">
                  <h6 className="block-title">
                    About company:
                    <mark className="ml-2 blue">
                      {data?.company?.companyName || ""}
                    </mark>
                  </h6>
                  <div
                    className="markup"
                    dangerouslySetInnerHTML={createMarkup(
                      data?.company?.introduction
                    )}
                  ></div>
                </span>

                {data?.company?.photoUrl?.length >= 1 && (
                  <ImagesGallery
                    images={data?.company?.photoUrl}
                    title="Company Photos"
                  />
                )}
                {/* {data?.company?.videoUrl && (
                  <span className="content-block mt-2 pr-0">
                    <h6 className="block-title mb-3">Company Video </h6>

                    {!data?.company?.videoUrl && ""}

                    <div className="block-video">
                      {isYoutubeVideoURL(data?.company?.videoUrl) !==
                      data?.company?.videoUrl ? (
                        <iframe
                          src={isYoutubeVideoURL(data?.company?.videoUrl)}
                          controls
                          className="company-profile-video"
                        ></iframe>
                      ) : (
                        <video controls className="company-profile-video">
                          <source
                            src={data?.company?.videoUrl}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </span>
                )} */}
                {data?.company?.videoUrl && (
                  <span className="content-block mt-2 pr-0">
                    <div className="page-layouts video-section">
                      <div className="w-100">
                        <h6 className="block-title mb-3">Company Video </h6>
                        <ReactPlayer
                          controls
                          width={"100%"}
                          style={{ width: "100%" }}
                          url={data?.company?.videoUrl}
                          className="company-profile-video"
                        />
                      </div>
                    </div>
                  </span>
                )}

                <span className="content-block mt-4 pr-0">
                  <h6 className="block-title mb-3">Map</h6>
                  <div className="block-map">
                    <Map
                      data={data?.company}
                      location={data?.company?.companyLocation}
                    />
                  </div>
                </span>
              </>
            )}
          </span>
        </span>

        {/* {showAllDetails && (
          <>
            <span className="content-box first">
              <span className="content-section">
                <span className="content-block">
                  <h6 className="block-title">Other jobs in your sector</h6>

                  <JobsCarouselv2 jobs={otherJobs?.slice(0, 5)} />
                </span>
              </span>
            </span>

            <span className="content-box first">
              <span className="content-section">
                <span className="content-block">
                  <h6 className="block-title">Other jobs by this company</h6>

                  <JobsCarouselv2 jobs={jobs.slice(0, 5)} />
                </span>
              </span>
            </span>
          </>
        )} */}
      </div>
    </div>
  );
}

export default JobDetails;
