import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useRefState from "react-usestateref";
import { BsBellFill } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";

import LogoImage from "../../assets/images/logo/logo-md.png";
import { initSocket } from "../../utils/socket";

const blueDiamondIcon = require("../../assets/images/icons/pc-diamond-blue.svg");

function Header({ unReadCount }) {
  const [menu, setMenu] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notifCount, setNotifCount, notifCountRef] = useRefState("0");
  const [unreadCount, setUnreadCount] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    setSocket(initSocket());
  }, []);

  let getUnreadCount = (res) => {
    unReadCount(res.count)
    console.log(res, "_________________________________________")
  }

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("=== socket connected ===");
        socket.on("notification-count", getNotificationCount);
        socket.on("chat-unread-count", getUnreadCount);
        socket.on("disconnect", () => {
          console.log("xxx socket disconnected xxx");
        });
      });
    }
  }, [socket]);

  const getActiveClassForPath = (currentLocation, path) => {
    return currentLocation === path ? "active b-text" : "";
  };

  const getNotificationCount = (res) => {
    setNotifCount(`${res?.count}`);
  };

  useEffect(() => {
    return unReadCount(unreadCount);
  }, [unreadCount]);

  return (
    <div className="c-header">
      <span className="inner-container">
        <Link to="/">
          <img className="logo" src={LogoImage} alt="Logo" />
        </Link>

        {/* <nav className="menu">
          <Link to="/">Services</Link>
        </nav> */}

        <div className={`mobile-menu ${menu ? "menu-open" : ""}`}>
          <div className="links-wrapper">
            <Link
              to="/job-seekers"
              onClick={() => {
                setCurrentPath("/job-seekers");
                setMenu(false);
              }}
              className={getActiveClassForPath(currentPath, "/job-seekers")}>
              Job Seekers
            </Link>
            <Link
              to="/jobs"
              onClick={() => {
                setCurrentPath("/jobs");
                setMenu(false);
              }}
              className={getActiveClassForPath(currentPath, "/jobs")}>
              Jobs
            </Link>
            <Link to="/">Services</Link>
          </div>
        </div>

        <nav className="align-items-center">
          {/* <Link to="/login" className="go-premium">
            <img className="premium-icon" src={blueDiamondIcon} />
            Go Premium
          </Link> */}

          <Link
            to="/notifications"
            onClick={() => {
              setCurrentPath("/jobs");
              setMenu(false);
            }}>
            <span className="notifications-icon-container">
              <span className="notifications-count">
                {notifCountRef.current}
              </span>
              <BsBellFill className="notification-icon" />
            </span>
          </Link>

          {/* <button onClick={() => setMenu(!menu)} className="toggle-button">
            {menu ? (
              <VscChromeClose className="close-icon" size="20px" />
            ) : (
              <BsThreeDotsVertical className="menu-icon" size="20px" />
            )}
          </button> */}
        </nav>
      </span>

      {/* <span className="shadow-box"></span> */}
    </div>
  );
}

export default Header;
