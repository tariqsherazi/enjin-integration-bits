import React from "react";
import { Input } from "antd";
import "./css/index.css";

const InputComponent = ({
  placeholder,
  value,
  name,
  onChange,
  password,
  props,
}) => {
  console.log("vasdd", value);
  return (
    <div>
      {password ? (
        <Input.Password
          placeholder={placeholder}
          className="inputStyle regular"
          visibilityToggle={false}
          onChange={onChange}
          name={name}
          value={value}
          autoComplete="new-password"
        />
      ) : (
        <Input
          placeholder={placeholder}
          className="inputStyle regular"
          name={name}
          onChange={onChange}
          value={value}
          autoComplete="new-password"
        />
      )}
    </div>
  );
};

export default InputComponent;
