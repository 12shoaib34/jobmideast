import React, { useEffect, useRef, useState } from "react";

import { Input, Form, Empty, Spin } from "antd";

import "./_JobSearch.scss";
import "./_Responsive.scss";
import Button from "../../shared-ui/Button/Button";
import { MappedElement } from "../../utils/helper";
import JobCard from "../../shared-ui/JobCard/JobCard";
import JobDetails from "../../app-ui/JobDetails/JobDetails";
import searchIcon from "../../assets/images/icons/search_icon.svg";
import locationIcon from "../../assets/images/icons/location_icon.svg";
import filterIcon from "../../assets/images/icons/filter_icon.svg";

import data from "./Data";

function JobSearch() {
  const onFinish = () => {};

  const myRef = useRef(null);

  const jobs = data;

  const [jobDetails, setJobDetails] = useState(null);
  const [filter, setFilter] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);

  let ShowFilter = () => {
    setFilter(!filter);
  };

  const HandleJobDetails = () => setShowJobDetails(false);

  const onSearchJob = (values) => {};

  const executeScroll = () =>
    myRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  return (
    <div className="jobsearch-page">
      <div className="jobs-wrapper">
        <div className="find-jobs-section">
          {/* Search Header */}
          <Form onFinish={onSearchJob}>
            <span className="form-fields job-filter-section">
              <Form.Item
                name="jobTitleName"
                className="c-input c-input-with-icon"
              >
                <Input
                  autoComplete={"" + Math.random()}
                  size="small"
                  className="xs"
                  type="text"
                  placeholder="Job title"
                  prefix={
                    <img className="input-icon" src={searchIcon} alt="ico" />
                  }
                ></Input>
              </Form.Item>
              <Form.Item name="location" className="c-input c-input-with-icon">
                <Input
                  autoComplete={"" + Math.random()}
                  size="small"
                  className="xs"
                  type="text"
                  placeholder="Location"
                  prefix={
                    <img className="input-icon" src={locationIcon} alt="ico" />
                  }
                ></Input>
              </Form.Item>
              <Button htmlType="submit" themecolor="rounded light">
                Go
              </Button>

              <Button
                icon={
                  <img className="filter-icon" src={filterIcon} alt="ico" />
                }
                style={{ marginLeft: "8px" }}
                className="rounded shadowed white filter-btn-in-job-search"
                onClick={ShowFilter}
              ></Button>
            </span>
          </Form>

          {/* Job List */}
          <div className="jobs-list">
            {/* {isLoading && (
              <div className="preloader">
                <Spin />
              </div>
            )} */}
            {/* {!jobs.length && (
              <Empty
                image={require("../../assets/images/icons/no-data.png")}
                description={"No jobs"}
              />
            )} */}

            <MappedElement
              data={jobs}
              renderElement={(obj, index) => (
                <JobCard
                  key={index}
                  onClick={() => {
                    setJobDetails(obj);
                    // setcategoryId(obj.categoriesId);
                    setShowJobDetails(true);
                    // setSelectedJobsId(obj?.id);
                  }}
                  // job={transformJobData(
                  //   obj,
                  //   jobTitles,
                  //   employmentTypes,
                  //   countries
                  // )}
                  // selectedJobsId={selectedJobsId}
                />
              )}
            />
          </div>
        </div>

        {/* Job Detail */}
        <div
          ref={myRef}
          className={`job-details ${showJobDetails && "job-details-show"}`}
        >
          {/* {isLoading && (
            <div className="preloader">
              <Spin />
            </div>
          )} */}

          {/* {!jobDetails && (
            <Empty
              image={require("../../assets/images/icons/no-data.png")}
              description={"please select a job"}
            />
          )} */}

          {jobDetails && (
            <JobDetails
              HandleJobDetails={HandleJobDetails}
              setShowJobDetails={setShowJobDetails}
              // otherJobs={otherJobs}
              // data={transformJobData(
              //   jobDetails,
              //   jobTitles,
              //   employmentTypes,
              //   countries
              // )}
              // extraData={{ accommodations }}
              setJobDetails={setJobDetails}
              executeScroll={executeScroll}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
