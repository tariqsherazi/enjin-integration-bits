import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <p style={{ textAalign: "start", color: "red", marginBottom: "0px" }}>
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
