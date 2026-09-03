import { Col, Radio, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { NavbarComponent, ToastMessage, Loader } from "../../components";
import { IoLogoUsd } from "react-icons/io";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Input } from "antd";
import { DatePicker } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./css/index.css";
import { useParams, useLocation } from "react-router-dom";
import ConnectModal from "../../components/connectModal";
import { ETHToWei } from "../../utills/convertWeiAndBnb";
import { Form } from "react-bootstrap";
import {timeToTimeStamp} from "../../utills/timeToTimestamp";
import { loadContractIns } from "../../store/actions";
import { ETHTOUSD, MATICTOUSD } from "../../utills/currencyConverter";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";


const ListNft = () => {
  const { Option } = Select;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("fixed Price");
  const [fixedPrice, setFixedPrice] = useState(0);
  const [fixedPriceCopies, setFixedPriceCopies] = useState(0);
  const [auctionStartPrice, setAuctionStartPrice] = useState(0);
  const [auctionCopies, setAuctionCopies] = useState(0);
  const { hash } = useParams();
  const [currency, setCurrency] = useState("USD");
  const [potentialEarning, setPotentialEarning] = useState(0);
  const [connectModal, setConnectModal] = useState(false);
  const [endTimeStamp, setEndTimeStamp] = useState(0);
  const [showVal, setShowVal] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [ethBal, setEthBal] = useState(0);
  const [maticBal, setMaticBal] = useState(0);

  ETHTOUSD(1).then((result)=>{
    setEthBal(result);
  });

  MATICTOUSD(1).then((result)=>{
    setMaticBal(result);
  });
  

  const {state}= useLocation();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.address.userData);
  const { web3, account, signer } = useSelector((state) => state.web3.walletData);
  const {contractData} = useSelector((state) => state.chain.contractData);

  const [tokens, setTokens] = useState(0);


  const {name, royalty, artistName, tokenId} = state;

  console.log(name, royalty, artistName);


  const handleEndTimeStamp = (value, dateString)=>{
    const time = timeToTimeStamp(dateString);
    setEndTimeStamp(time);
  }

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setPotentialEarning(0);
    setCurrency("USD");
    setFixedPrice(0);
    setAuctionStartPrice(0);
    setShowVal(0);
  };

  const handlePriceChange = (e)=>{
    let finalVal;
    const value = e.target.value;
    console.log("currency", currency);
    if(currency === "USD"){
      finalVal = contractData.chain === 5 ? (value / ethBal) : (value / maticBal);
    }else{
      finalVal = value;
    }

    setShowVal(value);

    console.log("finalValue", finalVal);

    if(selectedOption === "fixed Price"){
      setFixedPrice(finalVal);
      setPotentialEarning(calculateEarning(value, 2.5, royalty));
    }else if(selectedOption === "auction price"){
      setAuctionStartPrice(finalVal);
      setPotentialEarning(calculateEarning(value, 2.5, royalty));
    }
  }

  const handleCopyChange = (e)=>{
    const value = e.target.value;
    if(selectedOption === "fixed Price"){
      setFixedPriceCopies(value);
    }else if(selectedOption === "auction price"){
      setAuctionCopies(value);
    }
  }

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(()=>{
    async function getTokens(){
      const data = await contractData.mintContract.balanceOf(userData?.address, tokenId);
      console.log(Number(data));
      setTokens(Number(data));
    }
    getTokens();
  },[])

  const handleListing= async()=>{
    connectWalletHandle();

    const marketContractWithsigner = contractData.marketContract.connect(signer);
    const mintContractWithsigner = contractData.mintContract.connect(signer);

    if(selectedOption === "fixed Price"){
      const price = ETHToWei(`${fixedPrice}`);
      const isApproved = await mintContractWithsigner.isApprovedForAll(account, contractData.marketContract.address);
      if(!isApproved){
        const approveTx = await mintContractWithsigner.setApprovalForAll(contractData.marketContract.address, true);
        const resp = await approveTx.wait();
        if(resp){
          try {
            const tx = await marketContractWithsigner.listItemForFixedPrice(tokenId, fixedPriceCopies, price, contractData.mintContract.address);
            
            setLoadingStatus(true);
            setLoadingMessage("Listing...");

            const res = await tx.wait();
            if(res){
              setLoadingStatus(false);
              setLoadingMessage("");
              console.log("respnse", res);
              ToastMessage("Listing Successful", "", "success");
              dispatch(loadContractIns());
            }
          } catch (error) {
            const parsedEthersError = getParsedEthersError(error);
            if(parsedEthersError.context === -32603){
              ToastMessage("Error", `Insufficient Balance`, "error");
            }else{
              ToastMessage("Error", `${parsedEthersError.context}`, "error");
            }
          }
        }else{
          console.log("error");
        }
      }else{
        try {
          const tx = await marketContractWithsigner.listItemForFixedPrice(tokenId, fixedPriceCopies, price, contractData.mintContract.address);

          setLoadingStatus(true);
          setLoadingMessage("Listing...");

          const res = await tx.wait();
          if(res){
            setLoadingStatus(false);
            setLoadingMessage("");
            console.log("respnse", res);
            ToastMessage("Listing Successful", "", "success");
            dispatch(loadContractIns());
          }
        } catch (error) {
          const parsedEthersError = getParsedEthersError(error);
          if(parsedEthersError.context === -32603){
            ToastMessage("Error", `Insufficient Balance`, "error");
          }else{
            ToastMessage("Error", `${parsedEthersError.context}`, "error");
          }
        }
      }

    // Auction listing
    }else if(selectedOption === "auction price"){
      const price = ETHToWei(`${auctionStartPrice}`);
      const isApproved = await mintContractWithsigner.isApprovedForAll(account, contractData.marketContract.address);

      if(!isApproved){
        const approveTx = await mintContractWithsigner.setApprovalForAll(contractData.marketContract.address, true);
        const resp = await approveTx.wait();
        if(resp){
          try {
            const startTimeStamp = (Math.floor(Date.now() / 1000)) + 150;
            const tx = await marketContractWithsigner.listItemForAuction(price,startTimeStamp, endTimeStamp, tokenId, auctionCopies, contractData.mintContract.address);

            setLoadingStatus(true);
            setLoadingMessage("Listing...");

            const res = await tx.wait();
            if(res){
              setLoadingStatus(false);
              setLoadingMessage("");
              console.log(res);
              ToastMessage("Aunction Listing Successful", "", "success");
              dispatch(loadContractIns());
            }
          } catch (error) {
            const parsedEthersError = getParsedEthersError(error);
            if(parsedEthersError.context === -32603){
              ToastMessage("Error", `Insufficient Balance`, "error");
            }else{
              ToastMessage("Error", `${parsedEthersError.context}`, "error");
            }
          }
        }else{
          console.log("error");
        }
      }else{
        try {
          const startTimeStamp = (Math.floor(Date.now() / 1000)) + 150;
          const tx = await marketContractWithsigner.listItemForAuction(price,startTimeStamp, endTimeStamp, tokenId, auctionCopies, contractData.mintContract.address);

          setLoadingStatus(true);
          setLoadingMessage("Listing...");

          const res = await tx.wait();
          if(res){
            setLoadingStatus(false);
            setLoadingMessage("");
            ToastMessage("Aunction Listing Successful", "", "success");
            dispatch(loadContractIns());
          }
        } catch (error) {
          const parsedEthersError = getParsedEthersError(error);
          if(parsedEthersError.context === -32603){
            ToastMessage("Error", `Insufficient Balance`, "error");
          }else{
            ToastMessage("Error", `${parsedEthersError.context}`, "error");
          }
        }
      }
    }
  };

  const handleCurrency = (value)=>{
    setCurrency(value);
  }

  const calculateEarning =(amount, fee, royalty)=>{
    const totalFee = (Number(fee) + Number(royalty))/10000
    const totalFeeAmount = amount * totalFee;
    const earning = amount- totalFeeAmount;
    return earning;
  }

  const selectAfter = (
    <Select defaultValue="USD" onChange={handleCurrency}>
      <Option value="USD">USD</Option>
      { contractData.chain === 5 ?
      <Option value="ETH">ETH</Option> :
      <Option value="MATIC">MATIC</Option>}
    </Select>
  );

  
  const closeConnectModel = () => {
    setConnectModal(false);
  };
  const connectWalletHandle = () => {
    if (!web3) {
      setConnectModal(true);
    }
  };

  useEffect(() => {
    if (web3) {
      setConnectModal(false);
    }
  }, [web3]);


  return (
    
    <div
      className={`${backgroundTheme}`}
      style={{ minHeight: "100vh", overflowX: "hidden" }}
    >
      {loadingStatus && <Loader content={loadingMessage} />}
      <ConnectModal visible={connectModal} onClose={closeConnectModel} />
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        // selectedKey={"5"}
        headerText={"List NFT"}
      />
      <div className="container py-3">
        <Row style={{ width: "100%" }} className={`d-flex  my-4 p-5`}>
          <Col lg={24} sm={24} xs={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 30, lg: 50 }}>
              <Col lg={6} sm={24} md={12} xs={24}>
                <div className="cardContainer" style={{ width: "100%" }}>
                  <ReactPlayer
                    controls={true}
                    width="260px"
                    height="250px"
                    url={`https://infura-ipfs.io/ipfs/${hash}`}
                  />
                  <div className="d-flex justify-content-between mt-1 px-2">
                    <p className="name">{name}</p>
                    {/* <span className="value">Price</span> */}
                  </div>
                  <div className="d-flex justify-content-between px-2 pb-3">
                    <p className="name2">{artistName}</p>
                    {/* <span className="value2">4 ETH</span> */}
                  </div>
                </div>
              </Col>
              <Col lg={18} md={12} xs={24}>
                <div className="my-3">
                  <p className="title">List NFT</p>
                  <span className={`ctext ${textColor}`}>
                    Choose a type of sale
                  </span>
                </div>
                <div className="radio-group">
                  <Radio.Group
                    defaultValue="fixed Price"
                    buttonStyle="solid"
                    className={textColor === "black" && "radio-light"}
                    onChange={handleRadioChange}
                    
                  >
                    <Radio.Button value="fixed Price">
                      <span>
                        <IoLogoUsd />
                      </span>
                      <br />
                      Fixed Price
                    </Radio.Button>
                    <Radio.Button value="auction price">
                      <span>
                        <BiTimeFive />
                      </span>
                      <br />
                      Timed Auction
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {selectedOption === "fixed Price" && (
          <>
            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>
                Price <AiOutlineInfoCircle />
              </h5>
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor === "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Input
                className={textColor === "black" && "ant-light"}
                onChange={handlePriceChange}
                // addonBefore={selectBefore}
                addonAfter={selectAfter}
                defaultValue="Amount"
                type="number"
              />
            </div>

            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>Number Copies To Sell (Available: {tokens})</h5>
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor === "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Form.Control
                type="number"
                id="number"
                aria-describedby="number"
                placeholder="0000"
                min="0"
                onChange={handleCopyChange}
              />
            </div>

            <div
              className="option-wrapper d-flex justify-content-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h5>More Options</h5>
              <span>
                <RiArrowDropDownLine
                  className={`${textColor}`}
                  style={{
                    color: "white",
                    fontSize: "2.5rem",
                    marginTop: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            {isOpen && (
              <h5 style={{ color: "white" }}>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    disabled
                    style={{
                      cursor: "not-allowed",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <span className={`${textColor}`}>Coming soon</span>
                  </button>
                </div>
              </h5>
            )}
            <div className="summary-wrapper d-flex justify-content-between mt-3">
              <h5 className={`${textColor}`}>Summary</h5>
              <span>
                <AiOutlineInfoCircle
                  className={`${textColor}`}
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Listing Price</h5>
              <p>{showVal} {currency}</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Service Fee</h5>
              <p>2.5%</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Creator Fee</h5>
              <p>{royalty/100}%</p>
            </div>
            <div
              style={{
                borderBottom: "1px solid #F7F8F8",
                opacity: "0.4",
                marginTop: "2rem",
              }}
            ></div>
            <div className="footer-text d-flex justify-content-between mt-5">
              <h5>Total Potential Earning</h5>
              <p className={`${textColor}`}> {potentialEarning} {currency}</p>
            </div>
            <div className="btn-wrapper red-gradient">
              <button onClick={handleListing}>COMPLETE LISTING</button>
            </div>
          </>
        )}
        {selectedOption === "auction price" && (
          <>
            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>
                Choose a method <AiOutlineInfoCircle />
              </h5>
            </div>
            <div
              className={textColor === "black" ? "ant-light-select" : "select"}
            >
              <Select
                defaultValue="Type of auction"
                style={{
                  width: "100%",
                }}
                className={textColor === "black" && "ant-light"}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Sell To Highest Bidder",
                  },
                ]}
              />
            </div>
            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>
                Starting Price <AiOutlineInfoCircle />
              </h5>
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor === "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Input addonAfter={selectAfter} defaultValue="Amount" onChange={handlePriceChange} />
            </div>

            <Row gutter={{ xs: 8, sm: 16, md: 30, lg: 50 }}>
              {/* <Col lg={12} md={12} xs={24}>
                <div className="PriceWrapper  d-flex justify-content-between">
                  <h5 className={`${textColor}`}>Auction Start Time</h5>
                </div>
                <div
                  style={{ width: "100%", marginTop: "1rem" }}
                  className={
                    textColor == "black"
                      ? "ant-light-input"
                      : "priceinput-field"
                  }
                >
                  <DatePicker showTime onChange={handleStartTimeStamp} />
                </div>
              </Col> */}
              <Col lg={12} md={12} xs={24}>
                <div className="PriceWrapper  d-flex justify-content-between">
                  <h5 className={`${textColor}`}>Auction End Time</h5>
                </div>
                <div
                  style={{ width: "100%", marginTop: "1rem" }}
                  className={
                    textColor === "black"
                      ? "ant-light-input"
                      : "priceinput-field"
                  }
                >
                  <DatePicker showTime onChange={handleEndTimeStamp} />
                </div>
              </Col>
            </Row>

            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>Number Copies To Sell (Available: {tokens})</h5>
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor === "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Form.Control
                type="number"
                id="number"
                aria-describedby="number"
                placeholder="0000"
                min="0"
                onChange={handleCopyChange}
              />
            </div>

            <div
              className="option-wrapper d-flex justify-content-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h5>More Options</h5>
              <span>
                <RiArrowDropDownLine
                  className={`${textColor}`}
                  style={{
                    color: "white",
                    fontSize: "2.5rem",
                    marginTop: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            {isOpen && (
              <h5 style={{ color: "white" }}>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    disabled
                    style={{
                      cursor: "not-allowed",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <span className={`${textColor}`}>Coming soon</span>
                  </button>
                </div>
              </h5>
            )}

            <div className="summary-wrapper d-flex justify-content-between mt-3">
              <h5 className={`${textColor}`}>Summary</h5>
              <span>
                <AiOutlineInfoCircle
                  className={`${textColor}`}
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Listing Price</h5>
              <p>{showVal} {currency}</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Service Fee</h5>
              <p>2.5%</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Creator Fee</h5>
              <p>{royalty/100}%</p>
            </div>
            <div
              style={{
                borderBottom: "1px solid #F7F8F8",
                opacity: "0.4",
                marginTop: "2rem",
              }}
            ></div>
            <div className="footer-text d-flex justify-content-between mt-5">
              <h5>Total Potential Earning</h5>
              <p className={`${textColor}`}> {potentialEarning} {currency}</p>
            </div>
            <div className="btn-wrapper red-gradient">
              <button onClick={handleListing}>COMPLETE LISTING</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListNft;
