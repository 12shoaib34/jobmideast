import React, { useEffect, useState, useRef } from "react";

import { Divider } from "antd";
import { handleScrollToGivenRef } from "../../utils/helper";
import "./_Dashboard.scss";
import "./_Responsive.scss";
import TeamMembers from "./TeamMembers";
// import { getFullName } from "../../utils/helper";
import TaskList from "../../app-ui/TaskList/TaskList";
import UserProfile from "../../app-ui/UserProfile/UserProfile";
import { getBranches, getCounter, getNewProfiles, getTeamMembers } from "./thunk";
import CompanyCard from "../../shared-ui/CompanyCard/CompanyCard";
import ProfileCard from "../../shared-ui/ProfileCard/ProfileCard";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import StatisticCard from "../../shared-ui/StatisticCard/StatisticCard";
import { selectEmployerProfile } from "../auth/slice";
import {
  selectBranches,
  // selectConnects,
  selectCounter,
  selectNewProfiles,
  selectNewProfilesLoading,
  selectConnectByEmplyerSuccess,
  selectTeamMembers,
} from "./slice";
import ProfileDetails from "../../shared-ui/ProfileDetails/ProfileDetails";
import Modal from "../../shared-ui/Modal/Modal";
import { dummyProfileData } from "./../profileSearch/ProfileSearch";
function Dashboard() {
  // const isNewProfileLoading = useAppSelector(selectNewProfilesLoading);
  // const connectedByEmployerSuccess = useAppSelector(
  //   selectConnectByEmplyerSuccess
  // );

  const dispatch = useAppDispatch();
  const counter = useAppSelector(selectCounter);
  const branches = useAppSelector(selectBranches);
  const getteamMembers = useAppSelector(selectTeamMembers);
  const newProfiles = useAppSelector(selectNewProfiles);
  const [showProfile, setShowProfile] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const employerProfile = useAppSelector(selectEmployerProfile);
  const teamMembersRef = useRef(null);
  const connectedByEmployerSuccess = useAppSelector(selectConnectByEmplyerSuccess);

  const { jobCredits, contactCredits, newMessages, newApplication, interviewsToday, teamMembers } = counter;
  function CrispHide() {
    var hide = document.getElementsByClassName(".crisp-client .cc-kv6t .cc-1xry .cc-unoo .cc-7doi");
    console.log("Hide =========", hide);
    // hide.style.display = "none";
  }
  useEffect(() => {
    dispatch(getCounter());
    dispatch(getNewProfiles());
    dispatch(getBranches());
    dispatch(getTeamMembers());
    window.$crisp.push(["do", "chat:show"]);
    CrispHide();
    // window.$crisp.push(["do", "chat:hide"]);
  }, []);

  useEffect(() => {
    if (employerProfile) {
      if (employerProfile?.companyRole?.title == "Main Admin" || employerProfile?.companyRole?.title == "Admin") {
        setIsAdminLogin(true);
      }
    }
  }, [employerProfile]);

  const handleProfile = () => {
    setShowProfile(!showProfile);
  };
  // const routeCredit = (count)=>{
  //   if(count == 0) {

  //   }else {

  //   }
  // }

  return (
    <>
      <div className={`${showProfile ? "dashboard-tab-hide" : "dashboard-tab"}`}>
        <div className="dashboard-wrapper">
          <div className="task-counts-section">
            {/* Counters */}
            <div className="statistic-cards">
              <div className="title">Status</div>
              <Divider />
              <div className="card-row-wrapper">
                <div className="card-row">
                  <StatisticCard
                    src={require("../../assets/images/dashboard/yellow.png")}
                    count={jobCredits}
                    content="Job credits"
                    goto={jobCredits === 0 ? "/credits" : "/my-jobs"}
                    // goto="/my-jobs"
                  />
                  {/** these cards are made unclickable for now, just uncomment the  "goto"  prop */}
                  <StatisticCard
                    src={require("../../assets/images/dashboard/light-green.png")}
                    count={contactCredits}
                    content="Contact credits"
                    goto="/credits"
                  />
                  <StatisticCard
                    src={require("../../assets/images/dashboard/green.png")}
                    count={newMessages}
                    content="New messages"
                    goto="/chat"
                  />
                </div>
                <div className="card-row">
                  <StatisticCard
                    src={require("../../assets/images/dashboard/purple.png")}
                    count={newApplication}
                    content="New applications"
                    goto="/"
                  />
                  <StatisticCard
                    src={require("../../assets/images/dashboard/sky-blue.png")}
                    count={interviewsToday}
                    content="Interviews today"
                    goto="/"
                  />

                  <StatisticCard
                    src={require("../../assets/images/dashboard/pink.png")}
                    count={teamMembers}
                    content="Team members"
                    onClick={() => handleScrollToGivenRef(teamMembersRef)}
                    goto="#team-member"
                  />
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="task-list-section">
              <TaskList />
            </div>
          </div>

          {/* New Profiles */}
          <div className="profile-section">
            <div className="profile-wrapper">
              <div className="title">
                <h5>New profiles (Coming Soon)</h5>
              </div>

              {newProfiles?.length === 0 ||
                (true &&
                  dummyProfileData.map((data, key) => {
                    return (
                      <div key={key} className="profile-row">
                        <ProfileCard
                          userImage={data?.userImage}
                          type="profileSearch"
                          userName={data?.userName}
                          userJob="Primary Teacher"
                          stle={{ marginTop: "18px" }}
                        />
                        <ProfileDetails type="profileSearch" profileDetails={data} />
                      </div>
                    );
                  }))}

              {/* New profiles, cmmented for now, also change the above condition */}

              {/* {newProfiles?.map((p) => (
                <div className="profile-row">
                  <ProfileCard
                    userImage="1"
                    userName={p.user?.firstName}
                    userJob={p?.jobTitle?.title}
                    userImage={p?.profilePhoto}
                    handleClick={() => {
                      handleProfile();
                      setProfileId(p?.userId);
                    }}
                  />
                  <ProfileDetails profileDetails={p} />
                </div>
              ))} */}
            </div>
          </div>
        </div>

        {/* Team members */}
        {/* <div className="table-wrapper">{isAdminLogin && <TeamMembers />}</div> */}
        <div ref={teamMembersRef} id="team-members" className="table-wrapper">
          {isAdminLogin && <TeamMembers />}
        </div>

        {/* Other branches */}
        {branches?.length >= 1 && (
          <div className="other-branch-wrapper">
            <h1 className="tab-title">Other Branches</h1>
            <div className="flex-row branch-cards">
              {branches?.map((d) => (
                <CompanyCard
                  icon={d.branch?.companyLogo}
                  name={d.branch?.companyName}
                  sector={d.branch?.companyType}
                  location={`${d.branch?.city?.title} ${d.branch?.country?.title}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* <div
        className={`user-profile-hide ${
          showProfile ? "user-profile-show" : ""
          showProfile ? "user-profile-show" : ""
        }`}> */}
      <Modal
        className="profile-modal center"
        show={showProfile}
        onHide={() => {
          setShowProfile(false);
          dispatch(getNewProfiles());
        }}
      >
        <UserProfile
          // showProfile={showProfile}
          profileDetails={profileId}
          // handleProfile={handleProfile}
        />
      </Modal>
      {/* </div> */}
    </>
  );
}

export default Dashboard;
