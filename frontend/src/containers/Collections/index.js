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
import profileimg from "../../assets/images/profile1.svg";
import "./css/index.css";
import { Col, Input, Pagination, Row, Select, Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_NFTS,
  GET_PROFILE_DETAILS_QUERY,
  GET_ALL_NFTS_WITHOUT_ADDRESS,
} from "../../gql/queries";
import environment from "../../environment";
import { MINT_ASSET_MUTATION } from "../../gql/mutations";
import { USDTOETH } from "../../utills/currencyConverter";
import { getAllNftsByAddress } from "../../config/infura";

const Collections = () => {
  const pageSize = 20;
  const [mintAsset, { loading: mintingLoading, error: mintingError, data }] =
    useMutation(MINT_ASSET_MUTATION);
  const { userId } = useParams();

  const {
    loading: nftLoading,
    error: nftError,
    data: allNftsWithoutAddr,
    refetch: nftsRefetch,
  } = useQuery(GET_ALL_NFTS_WITHOUT_ADDRESS);

  const handleMintAsset = async (walletAddress) => {
    try {
      const result = await mintAsset({
        variables: { walletAddress },
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [val, setVal] = useState(0);
  USDTOETH(10).then(function (result) {
    setVal(result);
  });
  console.log(val);

  const [getNft, { loading, data: allNfts, refetch: allNftRefetch, error }] =
    useLazyQuery(GET_ALL_NFTS, {
      fetchPolicy: "network-only",
    });

  const [
    getProfile,
    {
      loading: profileLoadeing,
      error: profileError,
      data: profileData,
      refetch,
    },
  ] = useLazyQuery(GET_PROFILE_DETAILS_QUERY, {
    variables: { getProfileDetailsId: userId },
  });
  console.log("userId", userId);

  useEffect(() => {
    if (userId) {
      getProfile({ variables: userId });
    }
  }, [userId]);

  const { userData } = useSelector((state) => state.address.userData);
  const { contractData } = useSelector((state) => state.chain.contractData);
  const userProfile = profileData?.GetProfileDetails?.profileImg;

  const full_name = profileData?.GetProfileDetails?.full_name;
  const country = profileData?.GetProfileDetails?.country;
  const bio = profileData?.GetProfileDetails?.bio;

  useEffect(() => {
    if (profileData?.GetProfileDetails) {
      const variables = {
        walletAddress: profileData?.GetProfileDetails?.user_address,
      };

      getNft({ variables });
    }
  }, [profileData]);

  const [nfts, setNfts] = useState(null);
  const [nftsAll, setAllNfts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isSorting, setIsSorting] = useState(false);

  const [tokenIdsByOwner, setTokenIdsByOwner] = useState([]);

  //get all tokenIds by an address
  useEffect(() => {
    async function getTokenIds() {
      const tokens = await getAllNftsByAddress(
        profileData?.GetProfileDetails?.user_address,
        contractData.chain,
        contractData.mintContract.address
      );
      console.log(tokens);
      setTokenIdsByOwner(tokens);
    }
    getTokenIds();
  }, [profileData]);

  useEffect(() => {
    if (allNfts) {
      setNfts(allNfts.getAllNfts);
      setAllNfts(allNfts.getAllNfts);
    }
  }, [allNfts]);

  useEffect(() => {
    if (nftsAll) {
      const filteredNfts = nftsAll.filter((nft) =>
        nft.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setNfts(filteredNfts);
    }
  }, [nftsAll, searchTerm]);

  const sortingHandle = () => {
    if (isSorting) {
      if (searchTerm) {
        const reversed = [...nfts]?.reverse();
        setNfts(reversed);
      } else {
        const reversed = [...nfts]?.reverse();
        setAllNfts(reversed);
      }
    } else {
      let temp = nfts;
      if (searchTerm) {
        let data = nfts?.filter((item) =>
          item.name.toLowerCase().startsWith(searchTerm)
        );
        temp = data;
      }

      setAllNfts(temp);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setAllNfts(allNfts?.getAllNfts);
    }
  }, [searchTerm]);

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);

  const [uploadVideoModal, setUploadVideoModal] = useState(false);
  let navigate = useNavigate();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const { web3, account } = useSelector((state) => state.web3.walletData);

  const imgPath = environment.BACKEND_BASE_URL + "/" + userProfile;
  const imgPaths = environment.BACKEND_BASE_URL + "/";

  // pagination

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first item on the current page
  const startIndex = (currentPage - 1) * pageSize;

  // Slice the nfts array to show only  the items on the current page

  let currentNfts;
  currentNfts = nfts && nfts?.slice(startIndex, startIndex + pageSize);
  if (searchTerm) {
    currentNfts = nfts;
  } else {
    currentNfts = nfts && nfts?.slice(startIndex, startIndex + pageSize);
  }

  // Handle page change event
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render pagination item
  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Prev</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  function extractIPFSHash(url) {
    const regex = /ipfs\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    if (match) {
      return match[1]; // Use match[1] to get the captured group (the IPFS hash).
    } else {
      return null;
    }
  }

  console.log(currentNfts, "currentNfts");
  console.log("profileData", profileData, userData);
  useEffect(() => {
    nftsRefetch();
  }, []);

  useEffect(() => {
    allNftRefetch();
  }, []);

  console.log("All NFTS WITHOUT", allNftsWithoutAddr);
  console.log("tokenIdsByAddress", tokenIdsByOwner);

  return (
    <div className={`${backgroundTheme}`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"2"}
      />
      <UploadVideoModal
        visible={uploadVideoModal}
        onClose={() => setUploadVideoModal(false)}
      />

      <div className="container">
        <Row className="my-5">
          <Col lg={12} md={24} sm={24} xs={24}>
            <div className="d-flex justify-content-center my-3 align-items-center flex-wrap">
              {userProfile ? (
                <img
                  src={imgPath}
                  width={200}
                  onError={(e) => {
                    e.target.src = profileimg;
                  }}
                  style={{ borderRadius: "50%" }}
                  className="my-2"
                />
              ) : (
                <img
                  src={profileimg}
                  style={{ borderRadius: "50%" }}
                  width={200}
                  className="my-2"
                />
              )}

              <div className="ms-3">
                <h3 className="red-gradient-color semi-bold">{full_name}</h3>
                {country && (
                  <div className="d-flex mb-1">
                    <h5 className={`m-0 ${textColor}`}>{country}</h5>
                    <img
                      className="ms-2"
                      src={textColor === "white" ? location : location_dark}
                    />
                  </div>
                )}

                <span className={`${textColor2}`}>{bio}</span>
                <div className="mt-2">
                  {profileData?.GetProfileDetails?.id === userData?.id && (
                    <ButtonComponent
                      onClick={() => navigate("/account-settings/edit-profile")}
                      simple
                      text={"Edit Profile"}
                      width={150}
                    />
                  )}
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <Input
              placeholder="Search Here..."
              className={`searchStyle ${bgColor}`}
              onChange={(e) => {
                setIsSearching(e.target.value);
                console.log("edfdf", e.target.value);
                let data = nfts?.filter((item) =>
                  item.name.toLowerCase().startsWith(e.target.value)
                );
                console.log("data", data);

                setIsSearch(data);
              }}
            /> */}
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
        {/* <div className="tabsWrapper"> */}
        <div className="tabsWrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="NFT’s Created" key="1">
              <div className="row">
                {currentNfts && currentNfts?.length > 0 ? (
                  currentNfts?.map((e, i) =>
                    contractData.chain == e.chainId ? (
                      <CardCompnent
                        key={i}
                        image={imgPaths + e?.user_id?.profileImg}
                        status={e.status}
                        name={e.name}
                        artistName={e.artist_name1}
                        videoLink={e.video}
                        topName
                        userProfile={full_name ? true : false}
                        navigateTo={() =>
                          navigate(`/list-nft/${extractIPFSHash(e.video)}`, {
                            state: {
                              name: e.name,
                              royalty: e.royalty,
                              artistName: e.artist_name1,
                              tokenId: e.token_id,
                            },
                          })
                        }
                        isOwner={
                          profileData?.GetProfileDetails?.id === userData?.id
                        }
                      />
                    ) : (
                      <p className="text-white">No results found</p>
                    )
                  )
                ) : (
                  <p className="text-white">No results found</p>
                )}
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="NFT’s Owned"
              key="2"
              className={textColor == "black" && "ant-light"}
            >
              <div className="row">
                {tokenIdsByOwner && tokenIdsByOwner?.length > 0 ? (
                  tokenIdsByOwner?.map((item, i) => {
                    return allNftsWithoutAddr?.getAllNftsWithoutAddress?.map(
                      (e, i) => {
                        console.log(e.chainId);
                        if (
                          !e.is_blocked &&
                          item == e.token_id &&
                          contractData.chain == e.chainId
                        ) {
                          return (
                            <CardCompnent
                              key={i}
                              image={imgPaths + e?.user_id?.profileImg}
                              status={e.status}
                              name={e.name}
                              artistName={e.artist_name1}
                              videoLink={e.video}
                              topName
                              userProfile={full_name ? true : false}
                              navigateTo={() =>
                                navigate(
                                  `/list-nft/${extractIPFSHash(e.video)}`,
                                  {
                                    state: {
                                      name: e.name,
                                      royalty: e.royalty,
                                      artistName: e.artist_name1,
                                      tokenId: e.token_id,
                                    },
                                  }
                                )
                              }
                              isOwner={
                                profileData?.GetProfileDetails?.id ===
                                userData?.id
                              }
                            />
                          );
                        }
                      }
                    );
                  })
                ) : (
                  <p className="text-white">No results found</p>
                )}
              </div>
            </Tabs.TabPane>
          </Tabs>
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-2 align-items-center mb-2 pagination-wrapper">
              <Pagination
                total={nfts?.length}
                pageSize={pageSize}
                current={currentPage}
                onChange={handlePageChange}
                itemRender={itemRender}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
