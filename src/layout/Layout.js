import React, { useEffect, useState, useLayoutEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import { Result, Spin, Button } from "antd";

import Header from "../app-ui/Header/Header";
import Sidebar from "../app-ui/Sidebar/Sidebar";
import { navigateToHome } from "../utils/helper";
import { DashboardRoutes as Routes } from "../routing/index";
import Notification from "../features/notification/notification";
import { useAppDispatch, useAppSelector, useQuery } from "../store/hooks";
import { selectAuthSuccess, selectStatus } from "../features/auth/slice";
import {
  getCountry,
  verifyToken,
  getEmployerProfle,
  getSalaryType,
  getCurrencyType,
  getAccomodationType,
  getOtherBenefits,
  getQualifications,
  getLanguage,
  getSuitableJobs,
  getEmploymentType,
  getSector,
  getCities,
  getCategories,
  getJobTitles,
  getTeamMembers,
  getNoticePeriod,
  getFamilyStatus,
  getMedicalCondition,
  getVisaStatus,
  getJobStatus,
} from "../features/auth/thunk";
// import TestChat from "../app-ui/TestComponents/TestChat/TestChat";
import { initSocket } from "../utils/socket";
import Notify from "../assets/sounds/sound.mp3";
import useSound from "use-sound";

function LayoutWrap() {
  let query = useQuery();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const authSuccess = useAppSelector(selectAuthSuccess);
  const isLoading = useAppSelector(selectStatus);
  const [socket, setSocket] = useState(null);
  const [getUnreadCount, setGetUnreadCount] = useState("");
  const [playNotificationSound, setPlaySound] = useState(false);
  const soundUrl = Notify;

  const [play, { stop }] = useSound(soundUrl, { volume: 0.5 });

  const [notifCount, setNotifCount] = useState("0");
  useEffect(() => {
    const token = query.get("token");
    const localToken = localStorage.getItem("token");
    const _token = token || localToken;

    localStorage.setItem("token", _token);
    dispatch(verifyToken());
    setSocket(initSocket());
  }, []);

  useEffect(() => {
    if (authSuccess === true) {
      setIsAuthenticate(true);
      dispatch(getEmployerProfle());
      dispatch(getCountry());
      dispatch(getSalaryType());
      dispatch(getCurrencyType());
      dispatch(getAccomodationType());
      dispatch(getOtherBenefits());
      dispatch(getQualifications());
      dispatch(getLanguage());
      dispatch(getSuitableJobs());
      dispatch(getEmploymentType());
      dispatch(getSector());
      dispatch(getCities());
      dispatch(getCategories());
      dispatch(getJobTitles());
      dispatch(getTeamMembers());
      dispatch(getFamilyStatus());
      dispatch(getNoticePeriod());
      dispatch(getMedicalCondition());
      dispatch(getVisaStatus());
      dispatch(getJobStatus());

      // remove token from query param
      query.delete("token");
      history.replace({
        search: query.toString(),
      });
      return;
    } else {
      setIsAuthenticate(false);
    }
  }, [authSuccess]);

  const getNotificationCount = (res) => {
    setNotifCount(`${res?.count}`);
  };

  useEffect(() => {
    if (playNotificationSound) {
      return play();
    }
    if (notifCount > 0) {
      setPlaySound(true);
    }
  }, [notifCount]);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  const [, windowHeight] = useWindowSize();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("=== socket connected ===");
        socket.on("notification-count", getNotificationCount);
        socket.on("disconnect", () => {
          console.log("xxx socket disconnected xxx");
        });
      });
    }
  }, [socket]);

  return (
    <div>
      {isLoading && (
        <div className="center-loader">
          {/* <Spin spinning={isLoading} tip="please wait..." size="large" /> */}
          <img
            className="loader-theme"
            src={require("../assets/videos/sample/loader.gif")}></img>
        </div>
      )}

      {!isAuthenticate && !isLoading && (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" onClick={navigateToHome}>
              Back Home
            </Button>
          }
        />
      )}

      {isAuthenticate && !isLoading && (
        <div
          style={{
            height: windowHeight,
          }}
          className="c-layout">
          <Header unReadCount={setGetUnreadCount} />

          <Sidebar notification={getUnreadCount} routes={Routes} />

          <div className="content">
            <Switch>
              {Routes.map((route, index) => (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              ))}

              {/* <Redirect from="/" to="/dashboard" /> */}
              <Route exact path="/notifications" component={Notification} />
              {/* <Route exact path="/test" component={TestChat} /> */}
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
}

export default LayoutWrap;
