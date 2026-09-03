import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => navigate("/")} type="danger">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
