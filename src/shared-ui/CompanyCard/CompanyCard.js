import React from "react";

import defaultImage from "../../assets/images/default.png";
import locationIcon from "../../assets/images/icons/location_icon.svg";

const CompanyCard = ({ icon, name, sector, location }) => {
  return (
    <div className="company-card">
      <img src={icon || defaultImage} />
      <h1 className="company-name">{name || ""}</h1>
      <p className="sector">{sector || ""}</p>
      <p className="location">
        <img src={locationIcon} /> {location || ""}
      </p>
    </div>
  );
};

export default React.memo(CompanyCard);
