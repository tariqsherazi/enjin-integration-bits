import "./css/index.css";
import { Card, Tooltip } from "antd";
import { check, cross, marketcardimg, profile, thumb } from "../../assets";
import { Button } from "antd";
import ButtonComponent from "../button";
import ReactPlayer from "react-player";
import { OfferModal, StepperModal } from "../index";
import { Modal } from "antd";
import { NftDetailsModal } from "../index";
import React, { useState } from "react";
import Timercomp from "../timerComp";
import { useLocation, useNavigate } from "react-router-dom";
import profileimg from "../../assets/images/profile1.png";
import { ETHTOUSD, MATICTOUSD } from "../../utills/currencyConverter";
import { useSelector } from "react-redux";
import { ToastMessage } from "../../components";

const CardCompnent = ({
  image,
  status,
  name,
  videoLink,
  topName,
  collectionBtn,
  detailBtn,
  marketplacecard,
  sellnft,
  artistName,
  userProfile,
  navigateTo,
  userId,
  isOwner,
  owners,
  auctionStartTime,
  auctionEndTime,
  initialPrice,
  auctionid,
  numberofcopies,
  currentBidAmount,
  nftOwner,
  royalty,
  tokenId,
  fixtokenId,
  fixOwner,
  fixRoyalty,
  fixCopies,
  id,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isNftModalOpen, setIsNftModalOpen] = useState(false);
  const [ethBal, setEthBal] = useState(0);
  const [maticBal, setMaticBal] = useState(0);
  const { contractData } = useSelector((state) => state.chain.contractData);

  ETHTOUSD(1).then((result) => {
    setEthBal(result);
  });

  MATICTOUSD(1).then((result) => {
    setMaticBal(result);
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showNftModal = () => {
    setIsNftModalOpen(true);
  };

  const showOfferModal = () => {
    setIsOfferModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOfferModalOpen(false);
    setIsNftModalOpen(false);
  };
  console.log("userProfile", userProfile, image);
  const location = useLocation();
  console.log("userId", userId, location.pathname);

  console.log(fixOwner, fixRoyalty, fixCopies);

  return (
    <div className="my-4 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered
        width={829}
        closable={false}
        className="stepperModal"
      >
        <StepperModal handleCancel={handleCancel} owners={owners} name={name} />
      </Modal>

      <Modal
        open={isOfferModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
        width={829}
      >
        <OfferModal
          handleCancel={handleCancel}
          name={name}
          price={
            contractData.chain === 5
              ? (initialPrice * ethBal).toFixed(4)
              : (initialPrice * maticBal).toFixed(4)
          }
          initialPrice={initialPrice}
          currentBidAmount={
            contractData.chain === 5
              ? (currentBidAmount * ethBal).toFixed(4)
              : (currentBidAmount * maticBal).toFixed(4)
          }
          nftOwner={nftOwner}
          auctionid={auctionid}
        />
      </Modal>

      <Modal
        open={isNftModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
        width={1000}
      >
        <NftDetailsModal
          handleCancel={handleCancel}
          video={videoLink}
          name={name}
          royalty={marketplacecard ? royalty : fixRoyalty}
          nftOwner={marketplacecard ? nftOwner : fixOwner}
          numberofcopies={marketplacecard ? numberofcopies : fixCopies}
          tokenId={marketplacecard ? tokenId : fixtokenId}
        />
      </Modal>

      <Card
        hoverable
        className="cardContainer"
        cover={
          <ReactPlayer
            controls={true}
            width="260px"
            height="190px"
            url={videoLink}
          />
        }
      >
        {marketplacecard ? (
          <>
            <div className="price-wrapper d-flex justify-content-between">
              <h5>Price</h5>
              <p>
                <span>$</span>{" "}
                {contractData.chain === 5
                  ? (initialPrice * ethBal).toFixed(4)
                  : (initialPrice * maticBal).toFixed(4)}
              </p>
            </div>
            {!userProfile ? (
              <>
                <Tooltip title="To Purchase NFT's Please Login">
                  <span>
                    <ButtonComponent
                      height={40}
                      text={"Sign in"}
                      onClick={() => {
                        navigate("/login");
                      }}
                    />
                  </span>
                </Tooltip>
              </>
            ) : (
              <button className="buybtn" onClick={showOfferModal}>
                {location.pathname === "/marketplace" ? "Bid Now" : "Buy Now"}
              </button>
            )}
            <button
              className="buybtn"
              onClick={() => {
                navigate(`/nft-detail/` + id);
              }}
            >
              Nft Detail
            </button>
            <div>
              <img src={profile} style={{ width: 15 }} alt="profile" />
              <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                {name}
              </span>
            </div>
            <div>
              <img src={cross} style={{ width: 15 }} alt="cross" />
              <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                No copyright Transfer
              </span>
            </div>
            <div className="my-1">
              <img src={check} style={{ width: 15 }} alt="check" />
              <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                First Gen Emote
              </span>
            </div>
            <div className="my-1">
              <img
                src={marketcardimg}
                style={{ width: 15 }}
                alt="marketing-card"
              />
              <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                Supply :{" "}
                <span style={{ color: "#AD2B2B" }}>{numberofcopies}</span>
              </span>
            </div>
            <Timercomp
              auctionStartTime={auctionStartTime}
              auctionEndTime={auctionEndTime}
            />
          </>
        ) : (
          <>
            {topName ? (
              <>
                <div className="d-flex justify-content-between align-items-center pb-2">
                  <div>
                    <div
                      className="d-flex gap-2"
                      style={{ alignItems: "center", marginTop: "-1rem" }}
                    >
                      <img
                        src={image}
                        style={{ width: 25 }}
                        onError={(e) => {
                          e.target.src = profileimg;
                        }}
                        alt="profile"
                      />
                      <span className="light-grey2 mt-2 fs-5">
                        {artistName}
                      </span>
                    </div>
                  </div>

                  <div>
                    {detailBtn && (
                      <button
                        className="detail-btn"
                        onClick={() => {
                          navigate("/nft-detail/" + id);
                        }}
                      >
                        Nft Detail
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <span className="light-grey2  fs-5">{name}</span>
                  {/* <div style={{ border: "1px solid #5e2a2a" }}></div> */}
                </div>
              </>
            ) : (
              <>
                <div className="d-flex">
                  <div className="top-btn-div">
                    <img
                      src={image}
                      alt="profile"
                      onError={(e) => {
                        e.target.src = profileimg;
                      }}
                    />

                    <button
                      className="buybtn"
                      style={{ width: "80px" }}
                      onClick={() => {
                        navigate(`/nft-detail/` + id);
                      }}
                    >
                      Nft Detail
                    </button>
                  </div>
                  <span className="ms-2 light-grey2" style={{ fontSize: 10 }}>
                    {status}
                  </span>
                </div>
                <h5 className="light-grey2 mt-2">{name}</h5>
              </>
            )}
            {sellnft ? (
              <>
                <div>
                  <img src={cross} style={{ width: 15 }} alt="cross" />

                  <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                    No copyright Transfer
                  </span>
                </div>
                <div className="my-1">
                  <img src={check} style={{ width: 15 }} alt="check" />
                  <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                    First Gen Emote
                  </span>
                </div>{" "}
                <div className="mt-4 mb-1 d-flex">
                  <ButtonComponent
                    height={40}
                    text={"Sell NFT"}
                    onClick={() => {
                      if (
                        location.pathname.includes("/collections") &&
                        isOwner
                      ) {
                        navigateTo();
                      }
                    }}
                  />
                  <div className="red-gradient ms-3 d-flex justify-content-center thumbView">
                    <img
                      style={{ width: 25 }}
                      className="mb-1"
                      src={thumb}
                      alt="thumb"
                    />
                  </div>
                </div>
                {collectionBtn && (
                  <Button
                    className="mt-2 collectionBtn"
                    onClick={() => navigate(`/collections/${userId}`)}
                  >
                    Go to Collection
                  </Button>
                )}
              </>
            ) : (
              <>
                <div>
                  <img src={cross} style={{ width: 15 }} />

                  <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                    No copyright Transfer
                  </span>
                </div>
                <div className="my-1">
                  <img src={check} style={{ width: 15 }} />
                  <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                    First Gen Emote
                  </span>
                </div>

                <div className="mt-4 mb-1 d-flex">
                  {!userProfile ? (
                    <>
                      <Tooltip title="To Purchase NFT's Please Login">
                        <span>
                          <ButtonComponent
                            height={40}
                            text={"Sign in"}
                            onClick={() => {
                              navigate("/login");
                            }}
                          />
                        </span>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <ButtonComponent
                        height={40}
                        text={
                          location.pathname.includes("/collections") && isOwner
                            ? "Sell NFT"
                            : "Buy NFT"
                        }
                        onClick={() => {
                          if (
                            location.pathname.includes("/collections") &&
                            isOwner
                          ) {
                            navigateTo();
                          } else if (
                            location.pathname.includes("/video-gallery")
                          ) {
                            console.log("handle ok");
                            showModal();
                          } else if (location.pathname.includes("/")) {
                            ToastMessage("Please contact owner", "", "error");
                          }
                        }}
                      />
                    </>
                  )}

                  <div className="red-gradient ms-3 d-flex justify-content-center thumbView">
                    <img style={{ width: 25 }} className="mb-1" src={thumb} />
                  </div>
                </div>

                <Button
                  className="mt-2 collectionBtn"
                  onClick={() => navigate(`/collections/${userId}`)}
                >
                  Go to Collection
                </Button>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default CardCompnent;
