import React, { useEffect, useState } from "react";
import { Checkbox, Form } from "antd";
import Button from "../../shared-ui/Button/Button";
import defaultImage from "../../assets/images/user.png";
const CProfileCard = ({
  userImage,
  selectedProfileId,
  setselectedProfileId,
  userName,
  userId,
  userJob = "",
  type,
  check,
  handleClick,
}) => {
  const [isChecked, setIsChecked] = useState(null);
  const addIDToSelectedArray = (e) => {
    const value = e.target.value;
    if (e.target.checked && !selectedProfileId.includes(userId)) {
      setselectedProfileId([...selectedProfileId, String(userId)]);
    } else {
      const index = selectedProfileId.indexOf(String(userId));
      if (index > -1) {
        const newARR = [...selectedProfileId];
        newARR.splice(index, 1);
        setselectedProfileId(newARR);
      }
    }
  };
  useEffect(() => {
    setIsChecked(selectedProfileId?.includes(`${userId}`));
  }, [selectedProfileId]);
  return (
    <div className={`profile-card`}>
      {type === "profileSearch" ? (
        <div className="profile-search-checkmark">
          {/* <Form>
            <Form.Item>
              <Checkbox checked={isChecked} onChange={addIDToSelectedArray} />
            </Form.Item>
          </Form> */}
        </div>
      ) : null}
      <div className="inner-items">
        <div className="profile-img">
          <img src={userImage || defaultImage} alt="dp" />
        </div>
        <h3 className="user-name">{userName || ""}</h3>
        <p className="user-title">{userJob || ""}</p>
        <Button
          className="mx-auto"
          type=""
          themecolor="outlined"
          onClick={handleClick}>
          View profile
        </Button>
      </div>
    </div>
  );
};
export default CProfileCard;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const CProfileCardSmallWithMemo = ({
  setShowProfile,
  data,
  onSelect,
  onClick,
  setProfileId,
}) => {
  return (
    <div className="profile-card-small">
      <Checkbox
        className="c-checkbox"
        checked={data?.selected}
        onChange={(e) => onSelect(data?.id)}></Checkbox>
      <img
        onClick={onClick}
        src={data?.jobseeker?.jobSeekerProfile?.profilePhoto || defaultImage}
        alt=""
      />
      <div onClick={onClick} className="text">
        <div className="name">
          {data?.jobseeker?.firstName}{" "}
          {data?.jobseeker?.connect?.length ? data?.jobseeker?.lastName : ""}
        </div>
        <div className="occupation">
          {data?.jobseeker?.jobSeekerProfile?.jobTitle?.title}
        </div>
        <div className="location">
          Current Location: {data?.jobseeker?.jobSeekerProfile?.city?.title}
        </div>
        <div className="is-connected">
          {data?.jobseeker?.connect?.length >= 1 && data?.jobseeker?.connect?.[0]?.isConnected && "Connected"}
        </div>
      </div>
    </div>
  );
};


export const CProfileCardSmall = React.memo(CProfileCardSmallWithMemo)
