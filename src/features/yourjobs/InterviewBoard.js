import React, { useEffect, useState } from "react";

import { getData } from "country-list";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Select, Spin } from "antd";
import Modal from "../../shared-ui/Modal/Modal";
import { CProfileCardSmall } from "../../shared-ui/ProfileCard/ProfileCard";
import UserProfile from "../../app-ui/UserProfile/UserProfile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAppliedProfiles,
  setEmploymentActivityViewed,
  updateEmploymentActivities,
} from "./service";
import { selectJobStatus } from "../auth/slice";
import { getJobList } from "./thunk";

const { Option } = Select;
const queryString = require("query-string");

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  try {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  } catch (error) {}
};

const InterviewBoard = ({
  jobPostId,
  setShareProfileModal,
  jobTitle,
  filteredObject,
  setFilterModalShow,
  setLoading,
  isLoading,
  setItemSelected,
  onSelectCards,
  appliedProfiles,
  otherProfiles,
  setAppliedProfiles,
  setOtherProfiles,
  getProfiles,
}) => {
  const countryList = getData();
  const dispatch = useAppDispatch();
  const [activeCountry, setActiveCountry] = useState(false);
  const [countriesCitiesModal, setCountriesCitiesModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileId, setProfileId] = useState(null);
  // const [itemSelected, setItemSelected] = useState(false);
  const [status, setStatus] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 100 });
  const jobStatusList = useAppSelector(selectJobStatus);

  let handleProfile = () => {
    setShowProfile(!showProfile);
  };

  const filterItems = (items, selectedItemId) => {
    return items.filter((item) => item.id !== Number(selectedItemId));
  };

  const findItem = (items, selectedItemId) => {
    return items.find((item) => item.id === Number(selectedItemId));
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd !== dInd) {
      let _appliedProfiles = [...appliedProfiles];
      const _otherProfiles = {
        Contacted: [...otherProfiles.Contacted],
        Hired: [...otherProfiles.Hired],
        Interview: [...otherProfiles.Interview],
        Rejected: [...otherProfiles.Rejected],
        Shortlisted: [...otherProfiles.Shortlisted],
      };
      let _selectedItem;
      if (sInd === 1) {
        _selectedItem = findItem(_appliedProfiles, draggableId);
        _appliedProfiles = filterItems(_appliedProfiles, draggableId);
      } else if (sInd === 2) {
        _selectedItem = findItem(_otherProfiles.Shortlisted, draggableId);
        _otherProfiles.Shortlisted = filterItems(
          _otherProfiles.Shortlisted,
          draggableId
        );
      } else if (sInd === 3) {
        _selectedItem = findItem(_otherProfiles.Contacted, draggableId);
        _otherProfiles.Contacted = filterItems(
          _otherProfiles.Contacted,
          draggableId
        );
      } else if (sInd === 4) {
        _selectedItem = findItem(_otherProfiles.Interview, draggableId);
        _otherProfiles.Interview = filterItems(
          _otherProfiles.Interview,
          draggableId
        );
      } else if (sInd === 5) {
        _selectedItem = findItem(_otherProfiles.Rejected, draggableId);
        _otherProfiles.Rejected = filterItems(
          _otherProfiles.Rejected,
          draggableId
        );
      }

      if (_selectedItem) {
        if (dInd === 1) {
          _appliedProfiles = [
            ..._appliedProfiles,
            { ..._selectedItem, jobStatus: { title: "Applied" } },
          ];
        } else if (dInd === 2) {
          _otherProfiles.Shortlisted = [
            ..._otherProfiles.Shortlisted,
            { ..._selectedItem, jobStatus: { title: "Shortlisted" } },
          ];
        } else if (dInd === 3) {
          _otherProfiles.Contacted = [
            ..._otherProfiles.Contacted,
            { ..._selectedItem, jobStatus: { title: "Contacted" } },
          ];
        } else if (dInd === 4) {
          _otherProfiles.Interview = [
            ..._otherProfiles.Interview,
            { ..._selectedItem, jobStatus: { title: "Interview" } },
          ];
        } else if (dInd === 5) {
          _otherProfiles.Rejected = [
            ..._otherProfiles.Rejected,
            { ..._selectedItem, jobStatus: { title: "Rejected" } },
          ];
        }
      }

      setAppliedProfiles(_appliedProfiles);
      setOtherProfiles(_otherProfiles);

      setLoading(true);
      updateEmploymentActivities(draggableId, { jobStatusId: dInd }).then(
        (res) => {
          getProfiles(true);
        }
      );
    }
  };

  useEffect(() => {
    console.log("GET PROFILES")
    if (jobPostId) {
      getProfiles();
    }
  }, [jobPostId]);

  useEffect(() => {
    if (filteredObject) {
      handleGetFilteredProfiles(filteredObject);
    } else if (jobPostId) {
      getProfiles();
      setFilterModalShow(false);
    }
  }, [filteredObject, jobPostId]);

  const handleGetFilteredProfiles = (v) => {
    setLoading(true);
    dispatch(getJobList());

    let qs = v;
    qs = { ...qs, ...pagination };
    const params = queryString.stringify(qs);
    const req = getAppliedProfiles(jobPostId, params);
    Promise.resolve(req).then((res) => {
      setAppliedProfiles(res.data);
      setLoading(false);
      setStatus(null);
      setItemSelected(false);
      setFilterModalShow(false);
    });
  };

  const handleSelect = (profileId) => {
    const _appliedProfiles = appliedProfiles.map((item) => ({
      ...item,
      selected: item.id === profileId ? !item.selected : item.selected,
    }));
    const _otherProfiles = otherProfiles;
    _otherProfiles.Shortlisted = otherProfiles.Shortlisted.map((item) => ({
      ...item,
      selected: item.id === profileId ? !item.selected : item.selected,
    }));
    _otherProfiles.Contacted = otherProfiles.Contacted.map((item) => ({
      ...item,
      selected: item.id === profileId ? !item.selected : item.selected,
    }));
    _otherProfiles.Interview = otherProfiles.Interview.map((item) => ({
      ...item,
      selected: item.id === profileId ? !item.selected : item.selected,
    }));
    _otherProfiles.Rejected = otherProfiles.Rejected.map((item) => ({
      ...item,
      selected: item.id === profileId ? !item.selected : item.selected,
    }));
    _otherProfiles.Hired = otherProfiles.Hired.map((item) => ({
      ...item,
      selected: item.id === profileId ? !item.selected : item.selected,
    }));
    let anyItemSelected = false;
    const allItems = [
      ..._appliedProfiles,
      ..._otherProfiles.Shortlisted,
      ..._otherProfiles.Contacted,
      ..._otherProfiles.Interview,
      ..._otherProfiles.Rejected,
      ..._otherProfiles.Hired,
    ];
    for (const item of allItems) {
      if (item.selected) {
        anyItemSelected = true;
        break;
      }
    }
    setOtherProfiles(_otherProfiles);
    setAppliedProfiles(_appliedProfiles);
    setItemSelected(anyItemSelected);
    onSelectCards(_appliedProfiles, _otherProfiles);
  };

  // const state = [
  //   { title: "Applied Profiles", color: "#545454", items: appliedProfiles },
  //   {
  //     title: "Shortlisted",
  //     color: "#F1AB18",
  //     items: otherProfiles.Shortlisted,
  //   },
  //   { title: "Contacted", color: "#5271FF", items: otherProfiles.Contacted },
  //   { title: "Interview", color: "#C537B0", items: otherProfiles.Interview },
  //   { title: "Rejected", color: "#FA2C40", items: otherProfiles.Rejected },
  //   { title: "Hired", color: "#59D424", items: otherProfiles.Hired },
  // ];

  const getItems = () => {
    const items = [];
    const allJobPosts = [
      ...appliedProfiles,
      ...otherProfiles.Shortlisted,
      ...otherProfiles.Contacted,
      ...otherProfiles.Interview,
      ...otherProfiles.Rejected,
      ...otherProfiles.Hired,
    ];
    for (const jobStatus of jobStatusList) {
      const data = {
        ...jobStatus,
        items: [],
      };
      data.items = allJobPosts.filter(
        (item) => item.jobStatus.title === jobStatus.title
      );
      items.push(data);
    }
    return items;
  };

  const handleCardClick = (id) => {
    setEmploymentActivityViewed(id).catch((err) => console.log(err));
  };
  return (
    <>
      <div className="interview-board">
        {isLoading ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}>
            <Spin />
          </div>
        ) : (
          // {/* Kanban Columns */}
          <DragDropContext onDragEnd={onDragEnd}>
            {getItems().map((el, i) => (
              <Droppable
                key={i}
                droppableId={`${el.id}`}
                renderClone={(provided, snapshot, rubric) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <CProfileCardSmall
                      setProfileId={setProfileId}
                      onClick={() => {
                        handleCardClick(el?.id);
                        setProfileId(rubric.draggableId);
                        setShowProfile(true);
                      }}
                      setShowProfile={setShowProfile}
                      ref={provided.innerRef}
                      data={el?.items.find(
                        (item) => item.id == rubric.draggableId
                      )}
                    />
                  </div>
                )}>
                {(dprovided) => (
                  <div className="column">
                    {el.title === "Applied" ? (
                      <>
                        {/* <Button
                          className="filter-btn"
                          themecolor="shadowed rounded filter-btn-in-job-search"> */}
                        <img
                          onClick={() => setFilterModalShow(true)}
                          className="filter-icon filter-btn"
                          src={require("../../assets/images/icons/filter_icon.svg")}
                        />
                        {/* </Button> */}
                      </>
                    ) : (
                      ""
                    )}
                    <div
                      className="column-header"
                      style={{ borderTop: `3px solid ${el.color}` }}>
                      <span style={{ color: el.color }}> •</span>
                      {el.title}
                    </div>
                    <div className="scroll-wrapper" ref={dprovided.innerRef}>
                      {el?.items?.map((item, index) => (
                        <Draggable
                          key={item.id.toString()}
                          draggableId={item.id.toString()}
                          index={item.id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <CProfileCardSmall
                                setShowProfile={setShowProfile}
                                ref={provided.innerRef}
                                data={item}
                                setProfileId={setProfileId}
                                onClick={() => {
                                  handleCardClick(item?.id);
                                  setProfileId(item?.jobseeker?.id);
                                  setShowProfile(true);
                                }}
                                onSelect={handleSelect}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        )}

        {/* Modals */}

        <Modal
          className="profile-modal center"
          show={showProfile}
          onHide={() => setShowProfile(false)}>
          <UserProfile jobPostId={jobPostId} profileDetails={profileId} />
        </Modal>
      </div>
    </>
  );
};

export default React.memo(InterviewBoard);
