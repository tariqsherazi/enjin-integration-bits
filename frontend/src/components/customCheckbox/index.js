import React, { useState } from "react";
import { check2 } from "../../assets";
import "./css/index.css";

const CustomCheckbox = ({ active, setActive }) => {
  const handleCheckbox = () => {
    setActive(!active);
  };
  return (
    <div
      onClick={handleCheckbox}
      className="red-gradient-border checkboxStyle cursor d-flex justify-content-center"
    >
      {active && <img src={check2} style={{ width: 9 }} />}
    </div>
  );
};

export default CustomCheckbox;
