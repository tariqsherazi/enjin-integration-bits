import React from "react";
import "./css/index.css";
import { Input } from "antd";
import { useSelector } from "react-redux";

const LabelInput = ({
  label,
  password,
  borderColor,
  placeholder,
  onChange,
  disabled
}) => {
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  return (
    <div
      className="p-1 d-flex"
      style={{
        borderBottom: `1px solid ${borderColor ? borderColor : "#303030"}`,
        alignItems: "end",
      }}
    >
      {label && <span className="red inputLabel">{label}</span>}
      {password ? (
        <Input.Password
          className={`labelInputStyle ${textColor2} me-5`}
          visibilityToggle={false}
          autoComplete="off"
        />
      ) : (
        <Input
          className={`labelInputStyle ${textColor2} me-5`}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="off"
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default LabelInput;
