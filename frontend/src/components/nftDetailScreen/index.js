import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_NFT_DETAIL_QUERY } from "../../gql/queries";
import { useSelector } from "react-redux";
import NavbarComponent from "../navbar";
import { Row, Col, Button, Select, Input } from "antd";
import "./css/index.css";
import ReactPlayer from "react-player";
import { trimWallet } from "../../utills/trimWalletAddr";
const NftDetailsScreen = () => {
  const { id } = useParams();
  const [getNdtDetails, { data, loading, error }] =
    useLazyQuery(GET_NFT_DETAIL_QUERY);
  const [count, setCount] = useState(false);

  const { userData } = useSelector((state) => state.address.userData);
  console.log(userData, "userData");
  console.log(data, "data444", error, loading, userData?.id);

  useEffect(() => {
    if (id !== undefined && id !== null) {
      getNdtDetails({
        variables: { id: id, user_id: userData?.id ? userData?.id : "null" },
      });
    }
  }, [id, userData?.id]);

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);

  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);

  const { contractData } = useSelector((state) => state.chain.contractData);

  const link = `https://${
    contractData.chain == 5 ? "goerli.etherscan.io" : "mumbai.polygonscan.com"
  }/token/${contractData.mintContract.address}?a=${
    data?.getNftDetails?.token_id
  }`;

  console.log(data?.getNftDetails?.video, "babaer");
  console.log(data?.getNftDetails, "babaer");

  return (
    <div
      className={`${backgroundTheme} pb-2`}
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"3"}
        headerText={"Nft Detail"}
      />
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
                    url={data?.getNftDetails?.video}
                  />
                </div>
                <a
                  href={`https://${
                    contractData.chain == 5
                      ? "goerli.etherscan.io"
                      : "mumbai.polygonscan.com"
                  }/token/${contractData.mintContract.address}?a=${
                    data?.getNftDetails?.token_id
                  }`}
                  target="_blank"
                  className={`${textColor2}`}
                >
                  <div
                    style={{ border: "1px solid  #B23232" }}
                    className="p-1 mt-4 text-center rounded-3"
                  >
                    View on{" "}
                    {contractData.chain == 5 ? "Etherscan" : "Polygonscan"}
                    {/* <span className={`${textColor2}`} href="google.com" >View on Etherscan</span> */}
                  </div>
                </a>
              </Col>
              <Col lg={12} sm={24} md={12} xs={24}>
                <div>
                  <div className="my-3">
                    <p className={`${textColor} mb-1 fs-5`}>
                      {data?.getNftDetails?.name}
                    </p>

                    <p className={`${textColor2} m-0 fs-6`}>
                      {data?.getNftDetails?.wallet_address &&
                        trimWallet(data?.getNftDetails?.wallet_address)}
                    </p>
                    {/* <p className="red fs-6">
                  SB
                </p> */}
                  </div>
                  <div className="my-3">
                    <p className={`${textColor} m-0 fs-5`}>NFT ID</p>
                    <p className={`${textColor2} m-0 fs-6`}>
                      #{data?.getNftDetails?.token_id}
                    </p>
                  </div>
                  <div className="my-3">
                    <div className="d-flex label-input">
                      <p className={`${textColor} m-0 fs-5`}>
                        Royalty % : {data?.getNftDetails?.royalty / 100}{" "}
                      </p>
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
                <p className={`${textColor2} m-0 fs-6`}>
                  {data?.getNftDetails?.supply}
                </p>
              </div>
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-6`}>
                  Maximum Total Supply Supply
                </p>
                <p className={`${textColor2} m-0 fs-6`}>
                  {" "}
                  {data?.getNftDetails?.supply}{" "}
                </p>
              </div>
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-6`}>Supply Type</p>
                <p className={`${textColor2} m-0 fs-7`}>Non Fungible Token</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NftDetailsScreen;
