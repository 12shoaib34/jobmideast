import React, { useEffect, useState } from "react";
import { getData } from "country-list";
import { useHistory } from "react-router";
import { Select, Form, Input } from "antd";
import "./_Connected.scss";
import Table from "./Table";
import Modal from "../../shared-ui/Modal/Modal";
import { selectChatSuccess } from "../chat/slice";
import Button from "../../shared-ui/Button/Button";
import { postStartConversation } from "../chat/thunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import FilterModal from "../../app-ui/filterModal/FilterModal";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import { HiOutlineX } from "react-icons/hi";
import { selectJobStatus } from "../auth/slice";
import { selectConnected } from "./slice";
import { getConnected } from "./thunk";
import { getFullName, useWindowSize } from "../../utils/helper";
import ProfileListItem from "../../shared-ui/ProfileListItem/ProfileListItem";
import dummyImg1 from "./../../assets/images/ms/ms-15.png";
import dummyImg2 from "./../../assets/images/ms/ms-7.png";
import dummyImg3 from "./../../assets/images/ms/ms-8.png";
const queryString = require("query-string");

const { Option } = Select;

const Connected = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const startChatSuccess = useAppSelector(selectChatSuccess);
  const jobStatusList = useAppSelector(selectJobStatus);
  const connected = useAppSelector(selectConnected);
  const [filterModalShow, setFilterModalShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [jobseekerId, setJobseekerId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [filteredObject, setFilteredObject] = useState(null);
  const [saveFilterObject, setSaveFilterObject] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 100 });

  useEffect(() => {
    window.$crisp.push(["do", "chat:show"]);
  }, []);
  // localStorage.removeItem("userId");

  useEffect(() => {
    if (connected.length > 0 && size.width > 767) console.log("MOBILE VIEW");
  }, [connected]);

  useEffect(() => {
    if (filteredObject) {
      handleApplyFilter(filteredObject);
    }
  }, [filteredObject]);

  const handleApplyFilter = (v) => {
    let qs = v;
    qs = { ...qs, ...pagination };
    const params = queryString.stringify(qs);
    dispatch(getConnected(params));
    setFilterModalShow(false);
  };

  useEffect(() => {
    if (startChatSuccess) {
      history.push(`/chat`);
    }
  }, [startChatSuccess, userId]);

  const initiateChat = (id) => () => {
    localStorage.setItem("userId", id);
    const payload = {
      userId2: id,
    };
    dispatch(postStartConversation({ payload }));
  };
  const size = useWindowSize();
  // console.log(size);
  // console.log("CONNECTED", connected);

  const getUserName = (d) => {
    return getFullName(d);
  };

  return (
    <div className="connected-page">
      {/* Filter Form */}
      {/* <ProfileListItem userImage={data?.profilePhoto} />; */}

      <Form className="connected-header">
        <div className="filters-section">
          <p>
            <span className="heading">Connected</span> {connected?.length}{" "}
            <span>{connected?.length === 1 && "Candidate"}</span>{" "}
            <span>{connected?.length > 1 && "Candidates"}</span>{" "}
          </p>

          <Button
            onClick={() => setFilterModalShow(true)}
            className="filter-btn"
            themecolor="shadowed rounded"
            style={{ border: "1px solid #5271FF" }}
          >
            <img
              className="filter-icon"
              src={require("../../assets/images/icons/filter_icon.svg")}
            />
          </Button>
        </div>
        {/* <div className="search-section">
          <Form.Item className="select-sm">
            <Select
            className="scroll-to-smooth"
              className="status-select"
              dropdownClassName="status-dropdown"
              placeholder="Move to"
              getPopupContainer={(trigger) => trigger.parentNode}>
              {jobStatusList?.map((d) => (
                <Option value={d?.id}>
                  <span className="orange"></span>
                  <span>{d?.title}</span>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div> */}
      </Form>
      {/* Mobile View for conected */}
      {size.width < 767 && (
        <Form>
          <Form.Item name="id" className="c-input w-100">
            <Input
              className="ant-input-w100"
              autoComplete={"" + Math.random()}
            />
          </Form.Item>
        </Form>
      )}
      {/* {console.log(connected)} */}
      {connected.length ? (
        size.width < 767 &&
        connected?.map((data) => (
          <ProfileListItem
            userImage={data?.profilePhoto}
            name={getUserName(data?.user)}
            jobTitle={data?.jobTitle?.title}
            location={data?.city?.title}
            initiateChat={initiateChat}
            userId={data?.userId}
            record={data}
          />
        ))
      ) : (
        <>
          {size.width < 767 && (
            <>
              <div className="connected-empty">
                <h1>Welcome to connected</h1>
                <p>
                  Once you get connected with the candidates their details will
                  show here.
                </p>
              </div>
              <ProfileListItem
                userImage={dummyImg1}
                name={"Libby Adams"}
                jobTitle={"Managing Director"}
                location={"Cairo"}
                // initiateChat={initiateChat}
                // userId={null}
                // record={data}
              />
              <ProfileListItem
                userImage={dummyImg2}
                name={"John Luca"}
                jobTitle={"Principal"}
                location={"Beirut"}
                // initiateChat={initiateChat}
                // userId={null}
                // record={data}
              />
              <ProfileListItem
                userImage={dummyImg3}
                name={"Lee Perkin"}
                jobTitle={"HR Manager"}
                location={"Kuwait"}
                // initiateChat={initiateChat}
                // userId={null}
                // record={data}
              />
            </>
          )}
        </>
      )}
      {/* connecteds Table */}
      {
        <div className={`table-data ${size.width > 767 ? "show" : "hide"}`}>
          <Table initiateChat={initiateChat} />
        </div>
      }
      {/* Filter Modal */}
      <FilterModal
        setSaveFilterObject={setSaveFilterObject}
        setFilteredObject={setFilteredObject}
        filterModalShow={filterModalShow}
        setFilterModalShow={setFilterModalShow}
      />
    </div>
  );
};

export default Connected;

{
  /* <div classname="id"></div> */
}
