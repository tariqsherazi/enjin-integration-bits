import React from "react";
import { NavbarComponent } from "../../components";
import { useSelector } from "react-redux";
import { Select } from "antd";
import "./css/index.css";

const AssetsDetails = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={`${backgroundTheme}`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        headerText={"Create Blockchain Asset"}
      />
      <div className="container py-3">
        <div className="d-flex justify-content-between mt-5">
          <h5 className={`${textColor}`}>ASSET DETAILS</h5>
        </div>
        <div
          className={
            textColor == "black" ? " name-field light-field" : "name-field"
          }
        >
          <input type="text" placeholder="Asset Name" />
          <span>0 / 255</span>
        </div>
        <div
          className={
            textColor == "black"
              ? " name-field light-field mt-5"
              : "name-field mt-5"
          }
        >
          <input type="text" placeholder="Maximum Total Supply" />
        </div>
        <div
          className={
            textColor == "black" ? "assettype-light" : "assettype-wrapper"
          }
        >
          <h5>Asset Type:</h5>
          <div className="select mt-3">
            <Select
              defaultValue="Fungible Asset "
              style={{
                width: "100%",
              }}
              className={textColor == "black" && "ant-light"}
              onChange={handleChange}
              options={[
                {
                  value: "Fungible Asset ",
                  label: "Fungible Asset ",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
        </div>
        <div
          className={
            textColor == "black" ? "assettype-light" : "assettype-wrapper"
          }
        >
          <h5>Supply Model:</h5>
          <div className="select mt-3">
            <Select
              defaultValue="Fungible Asset "
              style={{
                width: "100%",
              }}
              className={textColor == "black" && "ant-light"}
              onChange={handleChange}
              options={[
                {
                  value: "Fungible Asset ",
                  label: "Fungible Asset ",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
        </div>{" "}
        <div
          className={
            textColor == "black" ? "assettype-light" : "assettype-wrapper"
          }
        >
          <h5>Transaferable:</h5>
          <div className="select mt-3">
            <Select
              defaultValue="Fungible Asset "
              style={{
                width: "100%",
              }}
              className={textColor == "black" && "ant-light"}
              onChange={handleChange}
              options={[
                {
                  value: "Fungible Asset ",
                  label: "Fungible Asset ",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
        </div>{" "}
        <div
          className={
            textColor == "black" ? "assettype-light" : "assettype-wrapper"
          }
        >
          <h5>Transfer Fee Type:</h5>
          <div className="select mt-3">
            <Select
              defaultValue="Fungible Asset "
              style={{
                width: "100%",
              }}
              className={textColor == "black" && "ant-light"}
              onChange={handleChange}
              options={[
                {
                  value: "Fungible Asset ",
                  label: "Fungible Asset ",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
        </div>
        <div className="supply-wrapper">
          <h5 className={`${textColor}`}>Starting Supply</h5>
          <div className="name-field mt-4">
            <input type="text" placeholder="Starting Supply" />
          </div>
        </div>
        <div className="footer-text">
          <p className={`${textColor}`}>
            To create assets on the blockchain, you will need to define a
            starting supply. You’ll need to have enough cryptocurrency within
            the blockchain you’re using to cover for the gas fees.
          </p>
        </div>
        <div className="btnWrapper">
          <button className="cancel-btn">CANCEL</button>
          <button className={`create-btn ${textColor}`}>CREATE ASSET</button>
        </div>
      </div>
    </div>
  );
};

export default AssetsDetails;
