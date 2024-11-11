import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import Button from "../../shared-ui/Button/Button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "./_userListItems.scss";

const UserListItems = (props) => {
  const { Key } = props;

  const [rotateListIcon, setRotateListIcon] = useState(false);
  const [handleDropdown, setHandleDropdown] = useState(false);
  const [dumyListData] = useState([1, 2, 3, 4, 5]);

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  // useOutsideAlerter();
  useOutsideAlerter(wrapperRef, buttonRef);

  function useOutsideAlerter(ref, buttonRef) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setHandleDropdown(false);
          setRotateListIcon(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref && buttonRef]);
  }
  return (
    <>
      <Col key={Key} className="list-row" span={24}>
        <Row align="middle" className="user-list-rows">
          <Col className="user-list-cells" span={6}>
            List for primary teacher
          </Col>
          <Col className="user-list-cells pl-3" span={6}>
            105
          </Col>
          <Col className="user-list-cells pl-3" span={12}>
            <span>8-june-2021</span>
            <div
              onClick={() => {
                setRotateListIcon(!rotateListIcon);
                setHandleDropdown(!handleDropdown);
              }}
              style={{ zIndex: handleDropdown && rotateListIcon ? 100 : 50 }}
              className="rounded-btn-perant"
              ref={buttonRef}>
              <Button
                ref={buttonRef}
                className="user-list-rounded-button"
                themecolor="shadowed rounded">
                <HiOutlineDotsHorizontal
                  className={`icon ${rotateListIcon ? "rtate-icon" : ""}`}
                  size={20}
                />
              </Button>
            </div>
            <div
              style={{ zIndex: handleDropdown && rotateListIcon ? 95 : 0 }}
              ref={wrapperRef}
              className={`dropdown-perant-hide ${
                handleDropdown ? "dropdown-perant-show" : ""
              }`}>
              <button className="transparent-btn">Edit list name</button>
              <button className="transparent-btn">Delete list</button>
            </div>
            {/* </Dropdown> */}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default UserListItems;
