import React, { useMemo, useState } from "react";
import "./css/index.css";
import { NavbarComponent, CardCompnent, Loader } from "../../components";
import { Button, Row, Col } from "antd";
import {
  discord_grey,
  left_arrow_red,
  meta,
  profile,
  telegram_grey,
  twitter_grey,
} from "../../assets";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UploadVideoModal } from "../../components";
import { getOwnersOfTokenId } from "../../config/infura";
import { GET_TOP_VIEW_NFTS } from "../../gql/queries";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const [uploadVideoModal, setUploadVideoModal] = useState(false);
  let navigate = useNavigate();

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

  const [showChat, setShowChat] = useState(false);
  const { userData } = useSelector((state) => state.address.userData);
  const { fixedItemData } = useSelector(
    (state) => state.fixedItemDatas.fixedItemData
  );
  const { contractData } = useSelector((state) => state.chain.contractData);
  const { auctionItemData } = useSelector(
    (state) => state.auctionItemDatas.auctionItemData
  );

  console.log(contractData.mintContract);

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const isLogged = userData?.isLogged;
  const userProfile = userData?.full_name;

  const handleCreateNFT = () => {
    if (isLogged) {
      setUploadVideoModal(true);
    } else {
      navigate("/login");
    }
  };

  getOwnersOfTokenId(0, 80001, "0x630656827c8ceaff3580823a8fd757e298cbfaaf");

  const { loading, data } = useQuery(GET_TOP_VIEW_NFTS);
  const timenow = Math.floor(Date.now() / 1000);

  console.log("auctionItemData",auctionItemData)
  function getUniqueObjects(arr) {
    const uniqueObjects = [];
    const seenIds = new Set();
  
    for (const item of arr) {
      if (!seenIds.has(item._id)) {
        uniqueObjects.push(item);
        seenIds.add(item?._id);
      }
    }
  
    return uniqueObjects;
  }

  
  const topNfts = useMemo (() => {
    let arr = []
    data?.getTopViewNfts?.map((x) => { 
      auctionItemData?.map((y)  => {
          if(
            !x.is_blocked &&
            Number(y.tokenId) == x.token_id &&
            contractData.chain == x.chainId &&
            Number(y.auctionEndTime) > timenow &&
            y.isSold == false
          ) {
            arr.push(x)
          }
      })
    } )

    data?.getTopViewNfts?.map((x) => { 
      fixedItemData?.map((y)  => {
          if(
            !y.is_blocked &&
                y.tokenid == x.token_id &&
                contractData.chain == x.chainId &&
                y.isSold == false
          ) {
            arr.push(x)
          }
      })
    } )

    const uniqueObjects = getUniqueObjects(arr);
    return uniqueObjects
    },[auctionItemData, data,fixedItemData])

    console.log("topNfts",topNfts)
  return (
    <div className={backgroundTheme}>
      {loading && <Loader />}
      <UploadVideoModal
        visible={uploadVideoModal}
        onClose={() => setUploadVideoModal(false)}
      />
      <NavbarComponent
        login
        dashboardNav
        center
        selectedKey={"1"}
        toggleBtn={textColor === "white" ? true : false}
      />
      <div className="container">
        <Row
          className="my-5 d-flex align-items-center"
          gutter={{ xs: 8, sm: 16, md: 20, lg: 32 }}
        >
          <Col lg={12} md={12} sm={24} xs={24} className="my-2">
            <div>
              <h1 className={textColor}>
                Welcome to <span className="red">BITS</span>{" "}
              </h1>
              <span className={textColor}>
                At BITS we will take your most iconic performances and
                immortalize them on the blockchain. First, you can provide us
                with a signature move/moment that you're proud of, then we will
                turn it into a potential in-game emote so that your fans can use
                it to express themselves. We'll mint it as an NFT so you can
                sell it or give it to your most valued supporters.
              </span>
              <div className="mt-3 ">
                <Link to="video-gallery">
                  <Button
                    className="red dashboardBtns px-5"
                    style={{ backgroundColor: "transparent" }}
                  >
                    Explore
                  </Button>
                </Link>
                <Button
                  className="red-background white dashboardBtns px-5 ms-2"
                  onClick={() => handleCreateNFT()}
                >
                  Create NFT
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="my-2">
            <ReactPlayer
              width="100%"
              height="300px"
              url="https://www.youtube.com/watch?v=sXQH-R_0gtQ"
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h3 className="red m-0">
            Top <span className={textColor}>NFTs</span>
          </h3>
          <div
            style={{ border: "1px solid #D54343", width: "80%" }}
            className="breakline"
          ></div>
          <img src={left_arrow_red} alt="lef-arrow" />
        </div>
        <div>
          <div className="row">
          {/* {auctionItemData?.map((item) => {
            return data?.getTopViewNfts?.map((e, i) => {
              if (
                !e.is_blocked &&
                Number(item.tokenId) == e.token_id &&
                contractData.chain == e.chainId &&
                Number(item.auctionEndTime) > timenow &&
                item.isSold == false
              ) {
                return (
                  <CardCompnent
                  key={i}
                  image={e?.user_id?.profileImg ? e.user_id.profileImg : ""}
                  status={e.status}
                  name={e.name}
                  videoLink={e.video}
                  userProfile={userProfile ? true : false}
                  id={e._id}
                  userId={e?.user_id?.id}
                  />
                );
              }
            });
          })} */}



            {
              topNfts?.map((e, i) => (

                <CardCompnent
                  key={i}
                  image={e?.user_id?.profileImg ? e.user_id.profileImg : ""}
                  status={e.status}
                  name={e.name}
                  videoLink={e.video}
                  userProfile={userProfile ? true : false}
                  id={e._id}
                  userId={e?.user_id?.id}
                />
              )

              )}
          
          {/* {fixedItemData?.map((item) => {
            return data?.getTopViewNfts?.map((e, i) => {
              if (
                !e.is_blocked &&
                item.tokenid == e.token_id &&
                contractData.chain == e.chainId &&
                
                item.isSold == false
              ) {
                return (
                  <CardCompnent
                  key={i}
                  image={e?.user_id?.profileImg ? e.user_id.profileImg : ""}
                  status={e.status}
                  name={e.name}
                  videoLink={e.video}
                  userProfile={userProfile ? true : false}
                  id={e._id}
                  userId={e?.user_id?.id}
                  />
                );
              }
            });
          })} */}
            {/* {data?.getTopViewNfts?.map((e, i) => {
              return (
                <CardCompnent
                  key={i}
                  image={e?.user_id?.profileImg ? e.user_id.profileImg : ""}
                  status={e.status}
                  name={e.name}
                  videoLink={e.video}
                  userProfile={userProfile ? true : false}
                  id={e._id}
                  userId={e?.user_id?.id}
                />
              );
            })} */}
          </div>
        </div>
      </div>
      <div className="dark-grey-bg d-flex justify-content-center">
        <div className="py-2" style={{ border: "1px dashed purple" }}>
          <img src={discord_grey} className="mx-2" alt="discord" />
          <img src={telegram_grey} className="mx-2" alt="telegram" />
          <img src={twitter_grey} className="mx-2" alt="twitter" />
        </div>
      </div>
      <div className="red-background">
        <div className="container d-flex justify-content-between py-2 align-items-center">
          <p className="m-0 white">
            BITS C {new Date().getFullYear()} All Rights reserved{" "}
          </p>
          <img
            src={meta}
            className="mx-2"
            onClick={() => {
              setShowChat(!showChat);
            }}
            alt="meta"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
