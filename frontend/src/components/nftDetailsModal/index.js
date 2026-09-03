import React, { useState, useEffect } from "react";
import "./css/index.css";
import { Row, Col, Button, Select, Input } from "antd";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { trimWallet } from "../../utills/trimWalletAddr";

const NftDetailsModal = ({video, name, royalty, nftOwner, numberofcopies, tokenId}) => {

  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);

  const {contractData} = useSelector((state) => state.chain.contractData);

  const link = `https://${contractData.chain == 5 ? "goerli.etherscan.io" : "mumbai.polygonscan.com"}/token/${contractData.mintContract.address}?a=${tokenId}`;

  console.log(link);

  return (
    <div className="container py-1">
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center">
        {/* <img src={right_arrow} /> */}
        <span className={`${textColor2} fs-5 py-3 ms-2`}>NFT Details</span>
      </div>
    </div>
    <Row
      style={{ width: "100%" }}
      className={`d-flex searchStyle ${bgColor} my-4 p-5`}
    >
      <Col lg={14} sm={24} xs={24} className="borderBottom">
        <Row gutter={{ xs: 8, sm: 16, md: 30, lg: 50 }}>
          <Col lg={12} sm={24} md={12} xs={24}>
            <div
              className="cardContainer mintCardContainer"
              style={{ width: "100%" }}
            >
              <ReactPlayer
                controls={true}
                width="100%"
                height={220}
                url= {video}
              />
            </div>
            <div
              style={{ border: "1px solid  #B23232" }}
              className="p-1 mt-4 text-center rounded-3"
            >
              <a href={`https://${contractData.chain == 5 ? "goerli.etherscan.io" : "mumbai.polygonscan.com"}/token/${contractData.mintContract.address}?a=${tokenId}`} target="_blank" className={`${textColor2}`} >View on {contractData.chain == 5 ? "Etherscan" : "Polygonscan"}</a>
              {/* <span className={`${textColor2}`} href="google.com" >View on Etherscan</span> */}
            </div>
          </Col>
          <Col lg={12} sm={24} md={12} xs={24}>
            <div>
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-5`}>{name}</p>

                <p className={`${textColor2} m-0 fs-6`}>
                  {trimWallet(nftOwner)}
                </p>
                {/* <p className="red fs-6">
                  SB
                </p> */}
              </div>
              <div className="my-3">
                <p className={`${textColor} m-0 fs-5`}>NFT ID</p>
                <p className={`${textColor2} m-0 fs-6`}>#{tokenId}</p>
              </div>
              <div className="my-3">
                <div className="d-flex label-input">
                  <p className={`${textColor} m-0 fs-5`}>Royalty % : {royalty/100} </p>
                </div>
              </div>
            </div>
            <div style={{ borderRight: "1px solid #B23232" }} />
          </Col>
        </Row>
      </Col>
      <Col lg={10} sm={24} xs={24}>
        <div className="supplyView">
          <div className="my-3">
            <p className={`${textColor} mb-1 fs-6`}>Circulating Supply</p>
            <p className={`${textColor2} m-0 fs-6`}>{numberofcopies}</p>
          </div>
          <div className="my-3">
            <p className={`${textColor} mb-1 fs-6`}>
              Maximum Total Supply Supply
            </p>
            <p className={`${textColor2} m-0 fs-6`}> {numberofcopies} </p>
          </div>
          <div className="my-3">
            <p className={`${textColor} mb-1 fs-6`}>Supply Type</p>
            <p className={`${textColor2} m-0 fs-7`}>Non Fungible Token</p>
          </div>
        </div>
      </Col>
    </Row>
  </div>
  );
};

export default NftDetailsModal;
