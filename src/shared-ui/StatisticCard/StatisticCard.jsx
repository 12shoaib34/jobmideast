import React from "react";
import { Link } from "react-router-dom";

const CStatisticCard = (props) => {
  const { themecolor, count, content, className, goto, onClick, src = require("../../assets/images/sample/cmp-img-1.png") } = props;
  return (
    <div className={`statistic-card ${className}`}>
      {/*remove this div for enabling onClick*/}
      {/* <Link to={`${goto}`} className={`statistic-card ${className}`} onClick={onClick}> */}
      <img className="statistic-bg" src={require(src)} alt="" />
      <span>
        <p className="statistict-count">{count}</p>
        <p className="statistic-tital">{content}</p>
      </span>
      {/* </Link> */}
    </div>
  );
};

export default CStatisticCard;
