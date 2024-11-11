import React from 'react'

const Header = () => {
  return (
    <div>
      <div className="back-btn">
        <img
          className="back-icon"
          src={require("../../../assets/images/icons/Back.svg")}
          alt=""
        />
      </div>
      <div
        style={{ cursor: "pointer" }}
        className="view-profile-btn"
      >
        <span>View Profile</span>
      </div>
    </div>
  )
}

export default Header
