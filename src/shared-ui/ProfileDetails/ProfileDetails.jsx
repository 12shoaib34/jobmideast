import React from "react";
import CButton from "../../shared-ui/Button/Button";

const CProfileDetails = ({ type, profileName, profileDetails }) => {
  return (
    <div className="user-profile-details">
      <div>
        {type === "profileSearch" ? (
          <h1>{profileName || "Profile Details"}</h1>
        ) : (
          <h1>Personal profile</h1>
        )}
        <div className="parent">
          <div className="block-ellipsis">
            {profileDetails?.description?.slice(0, 250) ||
              profileDetails?.description?.slice(0, 250)}
          </div>
        </div>
      </div>
      <div className="btn-row">
        {type === "profileSearch" ? (
          <>
            {profileDetails?.city?.title && (
              <CButton
                icon={
                  <img
                    src={require("../../assets/images/dashboard/location.svg")}
                  />
                }
                className="mx-2 test"
                type="small"
                themecolor="tag outlined pointer-none">
                {profileDetails?.city?.title}
              </CButton>
            )}
            {profileDetails?.nationality?.title && (
              <CButton
                icon={
                  <img
                    src={require("../../assets/images/dashboard/flag.svg")}
                  />
                }
                className="mx-2 test"
                type="small"
                themecolor="tag outlined pointer-none">
                {profileDetails?.nationality?.title}
              </CButton>
            )}

            {profileDetails?.noticePeriod && (
              <CButton
                icon={
                  <img
                    src={require("../../assets/images/dashboard/hourglass.svg")}
                  />
                }
                className="mx-2 test"
                type="small"
                themecolor="tag outlined pointer-none">
                {profileDetails?.noticePeriod?.title}
              </CButton>
            )}
            {profileDetails?.salary >= 0 && (
              <CButton
                className="mx-2 test"
                type="small"
                themecolor="tag outlined pointer-none">
                {/* {(profileDetails?.salary).toLocalString()} */}
                {profileDetails?.salary == 0
                  ? "Min expected : 0"
                  : "Min expected : " + profileDetails?.salary.toLocaleString()}
              </CButton>
            )}
            {profileDetails?.nativeLanguage && (
              <CButton
                className="mx-2 test"
                type="small"
                themecolor="tag outlined pointer-none">
                {"Language : " + profileDetails?.nativeLanguage?.title}
              </CButton>
            )}
          </>
        ) : (
          <>
            {profileDetails?.city?.title && (
              <CButton
                icon={
                  <img
                    src={require("../../assets/images/dashboard/location.svg")}
                  />
                }
                className="mx-2 test"
                type="small"
                themecolor="tag outlined pointer-none">
                {profileDetails?.city?.title}
              </CButton>
            )}
            {profileDetails?.nationality?.title && (
              <CButton
                icon={
                  <img
                    src={require("../../assets/images/dashboard/flag.svg")}
                  />
                }
                className="mx-2 test"
                type="small"
                themecolor="tag outlined pointer-none">
                {profileDetails?.nationality?.title}
              </CButton>
            )}
            {profileDetails?.noticePeriod && (
              <CButton
                icon={
                  <img
                    src={require("../../assets/images/dashboard/hourglass.svg")}
                  />
                }
                className="mx-2 test"
                type="small"
                themecolor="tag outlined pointer-none">
                {profileDetails?.noticePeriod?.title}
              </CButton>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CProfileDetails;
