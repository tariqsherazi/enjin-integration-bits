import React, { useEffect, useState } from "react";
import {
  profile_large,
  location,
  upload,
  search,
  AZ,
  grid,
  profile,
  location_dark,
  upload_red,
} from "../../assets";
import {
  ButtonComponent,
  CardCompnent,
  NavbarComponent,
  UploadVideoModal,
} from "../../components";
import "./css/index.css";
import { Col, Input, Pagination, Row, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_NFTS } from "../../gql/queries";

const SellsNft = () => {
  const [getNft, { loading, data: allNfts, error }] = useLazyQuery(
    GET_ALL_NFTS,
    {
      fetchPolicy: "network-only",
    }
  );

  const { nftAddress } = useSelector((state) => state.address.nftAddress);

  const address = nftAddress?.address?.ethAddress;
  console.log("add", address);

  useEffect(() => {
    const variables = {
      walletAddress: address,
    };
    getNft({ variables });
  }, [address]);

  console.log("nfts", loading, allNfts, error);

  const [nfts, setNfts] = useState(null);
  const [nftsAll, setAllNfts] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const [isSearch, setIsSearch] = useState(false);

  const [isSorting, setIsSorting] = useState(false);

  console.log("nftsAll", nftsAll, nfts);

  useEffect(() => {
    if (allNfts) {
      setNfts(allNfts.getAllNfts);
      setAllNfts(allNfts.getAllNfts);
    }
  }, [allNfts]);

  const sortingHandle = () => {
    if (isSorting) {
      if (isSearching) {
        const reversed = [...nfts]?.reverse();
        setNfts(reversed);
      } else {
        const reversed = [...nfts]?.reverse();
        console.log("sort", reversed);
        setAllNfts(reversed);
      }
    } else {
      if (isSearching) {
        // setNfts(allNfts?.getAllNfts);
        console.log("edfdf", isSearching);
        let data = nfts?.filter((item) =>
          item.name.toLowerCase().startsWith(isSearching)
        );
        setIsSearch(data);
      } else {
        setAllNfts(allNfts?.getAllNfts);
      }
    }
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Prev</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);

  console.log("textColor", textColor, bgColor);
  const [uploadVideoModal, setUploadVideoModal] = useState(false);
  let navigate = useNavigate();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  let cardsData = [
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
  ];
  return (
    <div className={`${backgroundTheme}`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"1"}
      />
      <UploadVideoModal
        visible={uploadVideoModal}
        onClose={() => setUploadVideoModal(false)}
      />

      <div className="container">
        <Row className="my-5">
          <Col lg={12} md={24} sm={24} xs={24}>
            <div className="d-flex justify-content-center my-3 align-items-center flex-wrap">
              <img src={profile_large} className="my-2" />
              <div className="ms-3">
                <h3 className="red-gradient-color semi-bold">Snap Boogie</h3>
                <div className="d-flex mb-1">
                  <h5 className={`m-0 ${textColor}`}>Boston, MA (USA)</h5>
                  <img
                    className="ms-2"
                    src={textColor === "white" ? location : location_dark}
                  />
                </div>
                <span className={`${textColor2}`}>
                  (Snap Boggie is a Professional Dancer){" "}
                </span>
                <div className="mt-2">
                  <ButtonComponent
                    onClick={() => navigate("/account-settings/edit-profile")}
                    simple
                    text={"Edit Profile"}
                    width={150}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
            <div className="d-flex justify-content-center my-3">
              <div
                className="uploadView"
                onClick={() => setUploadVideoModal(true)}
              >
                <img src={textColor === "white" ? upload : upload_red} />
                <p className={`${textColor3}`}>Upload Emote/Video</p>
              </div>
            </div>
          </Col>
        </Row>

        <div style={{ border: "1px solid #B23232" }}></div>
        <div className="my-4 d-flex justify-content-between">
          <div
            style={{ width: "100%" }}
            className={`d-flex searchStyle ${bgColor}`}
          >
            <Input
              placeholder="Search Here..."
              className={`searchStyle ${bgColor}`}
              onChange={(e) => {
                setIsSearching(e.target.value);
                console.log("edfdf", e.target.value);
                let data = nfts?.filter((item) =>
                  item.name.toLowerCase().startsWith(e.target.value)
                );

                setIsSearch(data);
              }}
            />
            <img className="me-3 cursor" style={{ width: 15 }} src={search} />
          </div>
          <div
            className={`d-flex ms-3 p-2 ${bgColor}`}
            style={{ borderRadius: 20 }}
            onClick={() => {
              setIsSorting(!isSorting);
              sortingHandle();
            }}
          >
            <img src={AZ} className="me-2" style={{ width: 20, height: 20 }} />
            <span
              className="me-2"
              style={{ border: "1px solid #D54343" }}
            ></span>
            <img src={grid} style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div className="tabsWrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="NFT’s Created" key="1"></Tabs.TabPane>
            <Tabs.TabPane
              tab="NFT’s Owned"
              key="2"
              className={textColor == "black" && "ant-light"}
            ></Tabs.TabPane>
          </Tabs>
          <div className="d-flex gap-4 align-items-center">
            {/* <div className="d-flex text">
              <h4 className={`${textColor}`}>
                Sort by: &nbsp; &nbsp;
                <Select
                  defaultValue="US Dollar"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "ant-light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "US Dollar",
                      label: "US Dollar",
                    },
                    {
                      value: "Etherum",
                      label: "Etherum",
                    },
                    {
                      value: "Binanace",
                      label: "Binanace",
                    },
                  ]}
                />
              </h4>
              <div
                className="cursor"
                style={{ textDecoration: "underline", marginTop: ".4rem" }}
              >
                <span className="red-gradient-color">View All</span>
              </div>
            </div> */}
            <div className="d-flex gap-2 align-items-center mb-2 pagination-wrapper">
              {/* <button className="prevBtn">Prev</button>
              <Pagination
                defaultCurrent={5}
                total={50}
                className={textColor == "black" && "ant-light"}
              />
              <button className="prevBtn">Next</button> */}
              <Pagination total={500} itemRender={itemRender} />
            </div>
          </div>
        </div>
        <div className="row">
          {cardsData && isSearching
            ? cardsData?.map((e, i) => {
                return (
                  <CardCompnent
                    key={i}
                    image={e.image}
                    status={e.status}
                    name={e.name}
                    videoLink={e.video}
                    sellnft
                  />
                );
              })
            : cardsData &&
              cardsData?.map((e, i) => {
                return (
                  <CardCompnent
                    key={i}
                    image={e.image}
                    status={e.status}
                    name={e.name}
                    videoLink={e.video}
                    sellnft
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default SellsNft;
