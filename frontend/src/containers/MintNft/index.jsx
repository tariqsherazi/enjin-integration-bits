import React, { useEffect, useState } from "react";
import {
  right_arrow,
  enjin_icon,
  count_down_icon,
  count_up_icon,
} from "../../assets";
import {
  ButtonComponent,
  NavbarComponent,
  LabelInput,
  Loader,
  ToastMessage,
} from "../../components";
import "./css/index.css";
import { Row, Col, Button, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { CREATE_NFT, MINT_ASSET } from "../../gql/mutations";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { mintValidation } from "../../components/validations";
import ErrorMessage from "../../components/error";
import ConnectModal from "../../components/connectModal";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";


const MintNft = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const { web3, account, signer } = useSelector((state) => state.web3.walletData);
  const [connectModal, setConnectModal] = useState(false);

  const {contractData} = useSelector((state) => state.chain.contractData);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
 
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);
  const [mintQuantity, setMintQuantity] = useState(5);
  let navigate = useNavigate();

  const { createNft } = useSelector((state) => state.nft.createNft);
  console.log("mintNft", createNft, CREATE_NFT);

  const [CreateNft, { data, loading, error }] = useMutation(CREATE_NFT);

  console.log("data", data, loading, error);

  const [
    mintAsset,
    { data: mintedData, loading: mintLoading, error: mintError },
  ] = useMutation(MINT_ASSET);

  const { userData } = useSelector((state) => state.address.userData);
  console.log(userData?.id, "user");

  const address = userData?.address;
  const id = userData?.id;
  useEffect(() => {
    if (data) {
      navigate(`/collections/${userData?.id}`);
      ToastMessage("Minted Successfully", "", "success");
    }
    if (error) {
      ToastMessage(error, "", "error");
    }
  }, [data, error]);

  console.log(Number(contractData.chain));

  const closeConnectModel = () => {
    setConnectModal(false);
  };
  const connectWalletHandle = () => {
    if (!web3) {
      setConnectModal(true);
    }
  };

  const mintCall = async(supply, royalty)=>{
    const contractWithsigner = contractData.mintContract.connect(signer);
    try{
      const tx = await contractWithsigner.mint(address,supply, createNft.meta, royalty, []);

      setLoadingStatus(true);
      setLoadingMessage("Minting...");

      const res = await tx.wait();
      if(res){
        const token_ID = await contractWithsigner.mintedTokenId();
        setLoadingStatus(false);
        setLoadingMessage("");
        if(token_ID){
          return token_ID;
        }else{
          console.log("no tokenId");
        }
      }
    }catch(error){
      const parsedEthersError = getParsedEthersError(error);
      if(parsedEthersError.context == -32603){
        ToastMessage("Error", `Insufficient Balance`, "error");
      }else{
        ToastMessage("Error", `${parsedEthersError.context}`, "error");
      }
    }
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      walletAddress: "",
      supply: 0,
      royalty: "",
      user_id: "",
      metauri:"",
      chainId: 0,
    },
    validate: mintValidation,
    onSubmit: async(values) =>{
      connectWalletHandle();
      const tokenid = await mintCall(Number(values.supply), Number(values.royalty * 100));
      console.log(Number(tokenid));
      
      if(Number(tokenid)){
        CreateNft({
          variables: {
            name: createNft && createNft.name,
            artistName1: createNft && createNft.artist_name1,
            video: createNft && createNft.video,
            metauri: createNft && createNft.meta,
            description: createNft && createNft.description,
            tokenId: `${Number(tokenid)}`,
            chainId: Number(contractData.chain),
            supply: Number(values.supply),
            walletAddress: values.walletAddress,
            status: true,
            royalty: Number(values.royalty * 100),
            user_id: values.id,
          },
        });
      }else{
        console.log("Minting is not gone through");
      }
    },
  });

  console.log("errors", errors, values);

  console.log("createNft", createNft);
  useEffect(() => {
    if (address || id) {
      setFieldValue("walletAddress", address);
      setFieldValue("id", id);
    }
  }, [address, id]);
  console.log("addressaddress", address, values?.walletAddress);

  useEffect(() => {
    if (web3) {
      setConnectModal(false);
    }
  }, [web3]);

  return (
    <div className={`${backgroundTheme}`} style={{ minHeight: "100vh" }}>
      <ConnectModal visible={connectModal} onClose={closeConnectModel} />
      {loadingStatus && <Loader content={loading? "Uploading..." : loadingMessage} />}
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"5"}
        headerText={"Mint NFT"}
      />
      <div className="container py-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img src={right_arrow} />
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
                    url={createNft && createNft.video}
                  />
                </div>
                <div
                  style={{ border: "1px solid  #B23232" }}
                  className="p-1 mt-4 text-center rounded-3"
                >
                  <span className={`${textColor2}`}>View on Etherscan</span>
                </div>
              </Col>
              <Col lg={12} sm={24} md={12} xs={24}>
                <div>
                  <div className="my-3">
                    <p className={`${textColor} mb-1 fs-5`}>Name</p>

                    <p className={`${textColor2} m-0 fs-6`}>
                      {createNft && createNft.name}
                    </p>
                    <p className="red fs-6">
                      {createNft ? createNft.artist_name1 : "Snap Boogie"}
                    </p>
                  </div>
                  <div className="my-3">
                    <p className={`${textColor} m-0 fs-5`}>NFT ID</p>
                    <p className={`${textColor2} m-0 fs-6`}>#89832823289</p>
                  </div>
                  <div className="my-3">
                    <div className="d-flex label-input">
                      <p className={`${textColor} m-0 fs-5`}>Royalty%: </p>
                      <span
                        style={{ marginTop: "-2.3rem", marginLeft: "1rem" }}
                      >
                        <div>
                          <Input
                            name="royalty"
                            className={`royaltyInputField  me-5`}
                            placeholder={"royalty"}
                            onChange={(e) => {
                              setFieldValue("royalty", e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "-" ||
                                e.key === "+" ||
                                e.key === "*" ||
                                e.key === "/" ||
                                e.key === "e"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onWheel={(event) => event.currentTarget.blur()}
                            type="number"
                            value={values.royalty}
                            autoComplete="off"
                          />
                        </div>
                      </span>
                    </div>
                    <ErrorMessage
                      message={
                        touched.royalty && errors.royalty
                          ? errors.royalty
                          : null
                      }
                    />
                  </div>
                </div>
                <div style={{ borderRight: "1px solid #B23232" }} />
              </Col>
            </Row>
          </Col>
          <Col lg={10} sm={24} xs={24}>
            <div className="supplyView">
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-5`}>Circulating Supply</p>
                <p className={`${textColor2} m-0 fs-6`}>{values.supply}</p>
              </div>
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-5`}>
                  Maximum Total Supply Supply
                </p>
                <p className={`${textColor2} m-0 fs-6`}>{values.supply}</p>
              </div>
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-5`}>Supply Type</p>
                <p className={`${textColor2} m-0 fs-6`}>Non Fungible Token</p>
              </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex align-items-center">
          <img src={right_arrow} />
          <span className={`${textColor2} fs-5 py-3 ms-2`}>Mint Details</span>
        </div>
        <div style={{ width: "100%" }} className={` ${bgColor} my-4 p-5`}>
          <span className={`${textColor} fs-6 mb-3`}>
          How many NFTs would you like to mint?
          </span>
          <Row>
            {/* <Col
              lg={4}
              md={10}
              sm={12}
              xs={24}
              className="d-flex align-items-center"
            >
              <div
                style={{ border: "1px solid  #B23232", width: 100 }}
                className="p-1 mt-4 text-center rounded-3 d-flex align-items-center justify-content-between"
              >
                <div style={{ width: 80 }}>
                  <span className={`${textColor2}`}>{mintQuantity}</span>
                </div>
                <div className="d-flex flex-column">
                  <img src={count_up_icon} className="mb-1" />
                  <img src={count_down_icon} />
                </div>
              </div>
              <span
                className={`${textColor2}  fs-6 mx-4`}
                style={{ marginBottom: -20 }}
              >
                OR
              </span>
            </Col> */}
            <Col lg={20} md={14} sm={12} xs={24}>
              <Input
                name="supply"
                className={`royaltyInputField  me-5`}
                placeholder={"Enter Quantity To Mint"}
                onChange={(e) => {
                  setFieldValue("supply", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "-" ||
                    e.key === "+" ||
                    e.key === "*" ||
                    e.key === "/" ||
                    e.key === "e"
                  ) {
                    e.preventDefault();
                  }
                }}
                onWheel={(event) => event.currentTarget.blur()}
                type="number"
                value={values.supply}
                autoComplete="off"
              />
              <ErrorMessage
                message={touched.supply && errors.supply ? errors.supply : null}
              />
            </Col>
          </Row>
          <form>
            <LabelInput
              borderColor={"#B23232"}
              placeholder={values?.walletAddress}
              name="walletAddress"
              value={values.walletAddress}
              onChange={(e) => {
                setFieldValue("walletAddress", e.target.value);
              }}
              disabled={true}
              onBlur={handleBlur}
            />
            {/* <ErrorMessage
              message={
                touched.walletAddress && errors.walletAddress
                  ? errors.walletAddress
                  : null
              }
            /> */}
          </form>
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <p className={`${textColor} fs-6 m-0`}>
                Please make sure you have enough cryptocurrency in your wallet
                to cover the gas fees.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="me-3">
            <Button
              className="px-5 cancelBtn"
              style={{ backgroundColor: "transparent", color: textColor }}
            >
              Cancel
            </Button>
          </div>
          <div className="ms-3">
            <ButtonComponent
              onClick={handleSubmit}
              text={"Mint NFT"}
              width={150}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintNft;
