import React, { useEffect } from "react";
import { CardCompnent, NavbarComponent } from "../../components";
import { useSelector } from "react-redux";
import { Input, Select } from "antd";
import { AZ, grid, profile, search } from "../../assets";
import { BsFilterLeft } from "react-icons/bs";
import { GET_ALL_NFTS_WITHOUT_ADDRESS } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import "./css/index.css";
import environment from "../../environment";
import { WeiToETH } from "../../utills/convertWeiAndBnb";

const Marketplace = () => {
  const { loading, error, data, refetch } = useQuery(
    GET_ALL_NFTS_WITHOUT_ADDRESS
  );

  const imgPaths = environment.BACKEND_BASE_URL + "/";

  const textColor = useSelector((state) => state.app.theme.textColor);
  const bgColor = useSelector((state) => state.app.theme.bgColor);
  const { userData } = useSelector((state) => state.address.userData);
  const { auctionItemData } = useSelector(
    (state) => state.auctionItemDatas.auctionItemData
  );
  const { contractData } = useSelector((state) => state.chain.contractData);

  const userProfile = userData?.full_name;
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  console.log("data", data);

  useEffect(() => {
    refetch();
  }, []);

  const timenow = Math.floor(Date.now() / 1000);

  return (
    <div
      className={`${backgroundTheme} main`}
      style={{
        minHeight: "100vh",
      }}
    >
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"4"}
        headerText={"Marketplace"}
      />
      <div className="container py-3">
        <div className="search-wrapper">
          <div
            style={{ width: "100%" }}
            className={`d-flex  searchStyle ${bgColor} `}
          >
            <img className=" cursor" style={{ width: 15 }} src={search} />
            <Input
              placeholder="Search Here..."
              className={`searchStyle ${bgColor}`}
            />
          </div>
          <button className="search-btn">Search</button>
        </div>
        <div
          style={{ borderBottom: "0.5px solid #c23737", marginTop: "2.5rem" }}
        ></div>
        <div className="d-flex justify-content-between mt-5">
          <div className="d-flex gap-5 ">
            <div className={`filter-wrapper ${bgColor}`}>
              <BsFilterLeft style={{ color: "#C93B3B", fontSize: "2rem" }} />
            </div>
            <div className="marketplace-select-field d-flex gap-2">
              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Category"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Category",
                      label: "Category",
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

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Price"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Price",
                      label: "Price",
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

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Quantity"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  className={textColor == "black" && "light"}
                  options={[
                    {
                      value: "Quantity",
                      label: "Quantity",
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

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Auction"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Auction",
                      label: "Auction",
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

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Ranking"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Ranking",
                      label: "Ranking",
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
          </div>
          <div className={`grid-wrapper ${bgColor}`}>
            <img src={AZ} className="me-2" style={{ width: 20, height: 20 }} />
            <span
              className="me-2"
              style={{ border: "1px solid #D54343" }}
            ></span>
            <img src={grid} style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div
          style={{ borderBottom: "0.5px solid #c23737", marginTop: "3.5rem" }}
        ></div>
        <div className="row my-3">
          {auctionItemData?.map((item) => {
            return data?.getAllNftsWithoutAddress?.map((e, i) => {
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
                    image={imgPaths + e?.user_id?.profileImg}
                    status={e.status}
                    name={e.name}
                    videoLink={e.video}
                    marketplacecard
                    collectionBtn
                    userProfile={userProfile ? true : false}
                    auctionStartTime={Number(item.auctionStartTime)}
                    auctionEndTime={Number(item.auctionEndTime)}
                    initialPrice={WeiToETH(`${Number(item.initialPrice)}`)}
                    auctionid={Number(item.auctionid)}
                    numberofcopies={e.supply}
                    currentBidAmount={WeiToETH(
                      `${Number(item.currentBidAmount)}`
                    )}
                    nftOwner={e.wallet_address}
                    royalty={e.royalty}
                    tokenId={Number(item.tokenId)}
                    id={e._id}
                  />
                );
              }
            });
          })}
          {/* {cardsData.map((e, i) => {
            console.log(e.videoLink);
            // const status = "First Gen Emote";
            return (
              <CardCompnent
                key={i}
                image={e.image}
                status="First Gen Emote"
                name={e.name}
                videoLink={e.videoLink}
                marketplacecard
                collectionBtn
                userProfile={userProfile ? true : false}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
