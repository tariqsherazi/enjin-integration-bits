import React from "react";
import "./css/index.css";
import { DatePicker, Space } from "antd";
import { down_arrow2 } from "../../assets";
import { DownOutlined } from "@ant-design/icons";

const DatePickerComponent = () => {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <div
      className="p-1 d-flex justify-content-between mt-4"
      style={{ borderBottom: "1px solid #303030", alignItems: "end" }}
    >
      <span className="red inputLabel">Date of Birth</span>
      <DatePicker
        bordered={false}
        onChange={onChange}
        placeholder=""
        className="datePickerStyle"
        style={{ width:"50%", color:"white" }}
        placement="topRight"
        suffixIcon={<DownOutlined style={{ color: "#CCCCCC" }} />}
      />
      {/* <img src={down_arrow2} style={{width:18}}/> */}
    </div>
  );
};

export default DatePickerComponent;
