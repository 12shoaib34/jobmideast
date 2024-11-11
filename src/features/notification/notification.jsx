import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./_notification.scss";
import useRefState from "react-usestateref";
import { initSocket } from "../../utils/socket";
import * as moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postStartConversation } from "../../features/chat/thunk";
import { selectChatSuccess } from "../../features/chat/slice";
import emailIcon from "../../assets/images/icons/email.svg";

const Notification = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const startChatSuccess = useAppSelector(selectChatSuccess);
  const [socket, setSocket] = useState(null);
  const [notif, setNotif, notifRef] = useRefState({ items: [] });

  useEffect(() => {
    setSocket(initSocket());
  }, []);

  const initiateChat = (id) => {
    console.log("for initiate chat -> ", id);
    if (id) {
      localStorage.setItem("userId", id);
      const payload = {
        userId2: id,
      };
      dispatch(postStartConversation({ payload }));
    }
  };

  useEffect(() => {
    if (startChatSuccess) {
      history.push("/chat");
    }
  }, [startChatSuccess]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.on("getNotificationList", getNotificationList);
        const payload = {
          options: {
            page: 1,
            limit: 100,
          },
        };
        socket.emit("getNotificationList", payload);
      });
    }
  }, [socket]);

  // const getNotificationList = (res) => {
  //   setNotif(res.data);
  // };
  const getNotificationList = (res) => {
    const notificationsGroupByDate = [];
    for (const notification of res.data.items) {
      const notificationDate = moment(notification.createdAt).format("DD-MM-YYYY");
      let found = false;
      for (const item of notificationsGroupByDate) {
        if (notificationDate === item.date) {
          found = true;
          item.data.push(notification);
          break;
        }
      }
      if (!found) {
        notificationsGroupByDate.push({
          date: notificationDate,
          data: [notification],
        });
      }
    }
    setNotif({ items: notificationsGroupByDate, meta: res.data.meta });
    console.log(notificationsGroupByDate);
  };

  // return (
  //   <div className="notification-page">
  //     {/* Back btn pointing to dashboard */}

  //     <Link
  //       // key={index}
  //       to="/"
  //       // onClick={() => setCollapse(false)}
  //       // className={`c-menu-item ${checkActiveClass(menu.path)}`}
  //     >
  //       {/* {menu.icon ? (
  //         <object
  //           type="image/svg+xml"
  //           data={menu.icon}
  //           className="menu-icon"></object>
  //       ) : null}
  //       <p className="title">{menu.title}</p> */}

  //       <div className="header">
  //         <span className="back-btn">
  //           <img
  //             className="back-icon"
  //             src={require("../../assets/images/icons/Back.svg")}
  //             alt=""
  //           />
  //         </span>
  //       </div>
  //     </Link>

  //     <div className="page-title">
  //       <img src={require("../../assets/images/icons/bell.svg").default} alt="" />

  //       <h1>Notifications</h1>
  //     </div>

  //     <div className="notification-section">
  //       <div className="row-header">
  //         <span className="title">Today</span>
  //       </div>
  //       {notifRef.current.items.map((d) => (
  //         <div className="notification-row">
  //           <div className="image-cell">
  //             <img src={emailIcon} alt="ico" />
  //           </div>

  //           <div className="notification-content">
  //             <p className="notification-desc">{d.title}</p>
  //             <p className="notification-desc">{d.message}</p>
  //           </div>
  //         </div>
  //       ))}

  //       <div className="notification-row">
  //         <div className="image-cell">
  //           <img src={require("../../assets/images/icons/cv.svg").default} alt="" />
  //         </div>

  //         <div className="notification-content">
  //           <p className="notification-desc">
  //             James Adams has requested to become an admin
  //           </p>{" "}
  //           <div className="btn-div">
  //             <Button themecolor="green">Accept</Button>{" "}
  //             <Button className="ml-2" themecolor="red">
  //               Reject
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* ----------------------------------------------------------------------------------------------- */}
  //     {/* ----------------------------------------------------------------------------------------------- */}
  //   </div>
  // );
  return (
    <div className="notification-page">
      <div className="back-btn" onClick={() => window.history.back()}>
        <img className="back-icon" src={require("../../assets/images/icons/Back.svg")} alt="" />
      </div>
      <div className="page-title">
        <img src={require("../../assets/images/icons/Bell-black.svg").default} alt="" />
        <h1>Notifications</h1>
      </div>

      <div>
        {notifRef.current.items.map((notificationGroup, i) => (
          <div className="notification-section" key={i}>
            <div className="row-header">
              <span className="title">{notificationGroup.date === moment().format("DD-MM-YYYY") ? "Today" : notificationGroup.date}</span>
            </div>
            {console.table("notificationGroup.data", notificationGroup.data)}
            {notificationGroup.data.map((d, index) => (
              <div
                onClick={() => {
                  initiateChat(d.userId);
                }}
                className="notification-row"
                key={`${i}_${index}`}
              >
                <div className="image-cell">
                  <img src={emailIcon} alt="ico" />
                </div>

                <div className="notification-content">
                  <p className="notification-desc">{d.title}</p>
                  {/* <p className="notification-desc">{d.message}</p> */}
                </div>
              </div>
            ))}
          </div>
        ))}
        {console.log("notifRef", notifRef.current)}

        {/* <div className="notification-row">
          <div className="image-cell">
            <img src={require("../../assets/images/icons/cv.svg").default} alt="" />
          </div>

          <div className="notification-content">
            <p className="notification-desc">
              James Adams has requested to become an admin
            </p>{" "}
            <div className="btn-div">
              <Button themecolor="green">Accept</Button>{" "}
              <Button className="ml-2" themecolor="red">
                Reject
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Notification;
