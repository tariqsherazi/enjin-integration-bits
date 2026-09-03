import React, { useState, useEffect } from "react";
import "./css/index.css";
import { logo } from "../../assets";
import BidModal from "../bidModal";
import { Modal, Table } from "antd";
import { useSelector } from "react-redux";
import ConnectModal from "../connectModal";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { trimWallet } from "../../utills/trimWalletAddr";
import { ETHTOUSD, MATICTOUSD } from "../../utills/currencyConverter";
import { ETHToWei, WeiToETH } from "../../utills/convertWeiAndBnb";
import {ToastMessage} from "../../components";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

const OfferModal = ({name, price, initialPrice, currentBidAmount, nftOwner, auctionid}) => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);

  const [offerAmount, setOfferAmount] = useState(0);

  const [ethBal, setEthBal] = useState(0);
  const [maticBal, setMaticBal] = useState(0);
  const [connectModal, setConnectModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [dataSource, setDataSource] = useState([]);

  const { web3, account, signer } = useSelector((state) => state.web3.walletData);
  const {contractData} = useSelector((state) => state.chain.contractData);

  const getPriceDiff = (initialPrice, latestprice)=>{
      const diff = latestprice - initialPrice;
      const val = (diff/initialPrice);
      return val;
  }


  const handleDropDownClick = () => {
    setIsTableOpen(!isTableOpen);
  };

  const handleCancel = () => {
    setIsBidModalOpen(false);
  };

  const handleConnect = ()=>{
    connectWalletHandle();
  }

  ETHTOUSD(1).then((result)=>{
    setEthBal(result);
  });

  MATICTOUSD(1).then((result)=>{
    setMaticBal(result);
  });

  const handleOffer = (e)=>{
    const value = e.target.value;
    setOfferAmount(value);
  }

  const getPrice = (val)=>{
    if(contractData.chain == 5){
      return (WeiToETH(`${val}`)) * ethBal
    }else{
      return (WeiToETH(`${val}`)) * maticBal
    } 
  }


  useEffect(()=>{
    async function getbids(){
      const data = await contractData.marketContract.getAllBids(auctionid);
      console.log(data);
      if(data && data?.bidAmount.length > 0) { 
      data?.bidAmount.map((item, i)=>{
        const priceDiff = getPriceDiff(initialPrice, WeiToETH(`${Number(item)}`));
        let obj = {
          key: i+1,
          price: WeiToETH(`${Number(item)}`),
          uprice: getPrice(Number(item)),
          quantity: "1",
          fdifference: `${priceDiff}% above`,
          expiration: "in 9 days",
          from: "you"
        }

        console.log(obj);
      setDataSource((prev)=>{
        return [...prev, obj];
      })
      })
    }
    }

    getbids();
  }, [contractData]); 

  const columns = [
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "USD Price",
      dataIndex: "uprice",
      key: "uprice",
    },
    // {
    //   title: "Quantity",
    //   dataIndex: "quantity",
    //   key: "quantity",
    // },
    {
      title: "Floor Difference",
      dataIndex: "fdifference",
      key: "fdifference",
    },
    // {
    //   title: "Expiration",
    //   dataIndex: "expiration",
    //   key: "expiration",
    // },
    // {
    //   title: "From",
    //   dataIndex: "from",
    //   key: "from",
    // },
    // {
    //   title: "",
    //   dataIndex: "action",
    //   render: (_, record) => <a>Cancel</a>,
    // },
  ];

  const closeConnectModel = () => {
    setConnectModal(false);
  };
  const connectWalletHandle = () => {
    if (!web3) {
      setConnectModal(true);
      setIsConnected(true);
    }
  };

  const handleBid = async() => {
    if(offerAmount > 0){
      const amount = ETHToWei(`${offerAmount}`);
      if(signer){
        const marketContractWithsigner = contractData.marketContract.connect(signer);
        try {
          setIsBidModalOpen(true);
          const tx = await marketContractWithsigner.bid(auctionid, {value: amount});
          // if(tx){
          //   setIsBidModalOpen(true);
          // }
          const res = await tx.wait();
          if(res){
          ToastMessage("Bid Successful", "", "success");
          }
          
        } catch (error) {
          const parsedEthersError = getParsedEthersError(error);
          if(parsedEthersError.context == -32603){
            ToastMessage("Error", `Insufficient Balance`, "error");
          }else{
            console.log(error);
            ToastMessage("Error", `${parsedEthersError.context}`, "error");
          }
        }
      }else{
        handleConnect();
      }
    }else{
      alert("Please provide amount");
    }
  };

  useEffect(() => {
    if (web3) {
      setConnectModal(false);
    }
  }, [web3]);


  return (
    <div>
      <ConnectModal visible={connectModal} onClose={closeConnectModel} />
      <Modal
        open={isBidModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
        width={829}
      >
        <BidModal 
        handleCancel={handleCancel} 
        nftOwner ={nftOwner} 
        name={name} 
        offerAmount={offerAmount}
        amount = {contractData.chain == 5 ? (offerAmount * ethBal).toFixed(4) : (offerAmount * maticBal).toFixed(4)}
        chain = {contractData.chain == 5 ? "ETH" : "MATIC"}
        />
      </Modal>
      <div className="main-wrapper">
        <div className="top-title">Place A Bid</div>
        <div className="info">
          <div className="d-flex gap-3 align-items-center">
            <div>
              <img src={logo} width={60} height={60} />
            </div>
            <div>
              <h5>{name}</h5>
              <p>{trimWallet(nftOwner)}</p>
              {/* <p>0xdaF60d937a200b36688e4BfBA68Ef026231570Ef</p> */}
            </div>
          </div>

          <div>
            <h5>{initialPrice} {contractData.chain == 5? "ETH": "MATIC"}</h5>
            <p>$ {price}</p>
          </div>
        </div>
        <div className="balance-info">
          {/* <div className="d-flex justify-content-between align-items-center">
            <h5>Balance</h5>
            <p>0.001 ETH</p>
          </div> */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <h5>Floor Price</h5>
            <p> $ {price}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <h5>Best Offer</h5>
            <p>$ {currentBidAmount}</p>
          </div>
        </div>

        <div className="drop-down-div" onClick={handleDropDownClick}>
          <div className="d-flex justify-content-between">
            <h5>Offers</h5>
            {isTableOpen ? (
              <MdOutlineKeyboardArrowUp color="#ffffff" fontSize={20} />
            ) : (
              <MdOutlineKeyboardArrowDown color="#ffffff" fontSize={20} />
            )}
          </div>
        </div>

        <div className="table-div">
          {isTableOpen && (
            <Table
              dataSource={dataSource}
              columns={columns}
              scroll={{ x: 100 }}
            />
          )}
        </div>

        <div className="input-field-div">
          <input type="text" placeholder="0.001" onChange={handleOffer}/>
          <h5>{contractData.chain == 5? "ETH": "MATIC"}</h5>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <p>$ {contractData.chain == 5 ? (offerAmount * ethBal).toFixed(4) : (offerAmount * maticBal).toFixed(4)} Total</p>
          <p>Total Offer amount: {offerAmount} {contractData.chain == 5? "ETH": "MATIC"} ($ {contractData.chain == 5 ? (offerAmount * ethBal).toFixed(4) : (offerAmount * maticBal).toFixed(4)})</p>
        </div>
        <div>
          <button className="bid-btn" onClick={isConnected? handleBid: handleConnect}>
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
