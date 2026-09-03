import React from "react";
import { bar_chart, trending_up } from "../../assets";
import "./css/index.css";

const StatisticsCard = ({
  icon,
  count,
  status,
  trendingIcon,
  trendingPer,
  duration,
  perColor,
  iconBgColor,
  width
}) => {
  return (
    <div style={{width:width&&'100%'}} className="col-lg-3 col-md-4 col-sm-6 col-12 my-2">
      <div className="bg-dark-blue3 statisticsCardStyle d-flex center">
        <div
          className="statisticsIconView ms-3"
          style={{ backgroundColor: iconBgColor }}
        >
          <img src={icon} alt="" />
        </div>
        <div className="mt-4 ms-2">
          <h5 className="white m-0">{count}</h5>
          <span className="light-grey">{status}</span>
          <div>
            <img src={trendingIcon} />
            <span className={`${perColor} ms-2`}>{trendingPer}</span>
            <span className="light-grey ms-2">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
