import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./css/index.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { test } from "../../../assets";
import { SuccessModal } from "../../index";
import ConnectModal from "../../connectModal";
import { Button, Modal } from "antd";
import { trimWallet } from "../../../utills/trimWalletAddr";
import { ETHToWei } from "../../../utills/convertWeiAndBnb";
import { Loader, ToastMessage } from "../../../components";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";


function PurchaseStep({owner, name, totalPrice, showAmt, quantity, fixedId}) {

  const {contractData} = useSelector((state) => state.chain.contractData);
  const { web3, signer } = useSelector((state) => state.web3.walletData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectModal, setConnectModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConnect = ()=>{
    connectWalletHandle();
  }


  const handlePurchase = async()=>{
    let val = Number(ETHToWei(totalPrice.toString()));
    let amount = val.toString();

    if(signer){
      const marketContractWithsigner = contractData.marketContract.connect(signer);

      if(quantity > 0){
        try {
          const tx = await marketContractWithsigner.BuyFixedPriceItem(fixedId, quantity, {value: amount});
  
          setLoadingStatus(true);
          setLoadingMessage("Transaction Pending...");
  
          const res = await tx.wait();
          if(res){
            setLoadingStatus(false);
            setLoadingMessage("");
            console.log(res);
            ToastMessage("Purchase Successful", "", "success");
            showModal();
          }
        } catch (error) {
          const parsedEthersError = getParsedEthersError(error);
          if(parsedEthersError.context == -32603){
            ToastMessage("Error", `Insufficient Balance`, "error");
          }else{
            ToastMessage("Error", `${parsedEthersError.context}`, "error");
          }
        }
      }else{
        handleConnect();
      }
    }
  }

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
      setIsConnected(true);
    }
  }, [web3]);



  return (
    <div className="purchaseStep">
      {loadingStatus && <Loader content={loadingMessage} />}
      <ConnectModal visible={connectModal} onClose={closeConnectModel} />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered
        width={706}
        className="successModal"
      >
        <SuccessModal totalPrice={totalPrice} showAmt={showAmt} />
      </Modal>
      <div className="purchaseStepMainWrapper">
        <div className="purchasecontentDiv">
          <div className="purchaseleftDiv">
            <div>
              <img className="purchaseImg" src={test} />
            </div>
            <div className="purchasetextWrapper">
              <h4 className="purchaseleftDivText">{name}</h4>
              <h6 className="purchaseleftDivSubText"> From {trimWallet(owner)}</h6>
            </div>
          </div>
          <div className="purchaserightDiv">
            <h4 className="purchaseQtyText">Qty : {quantity}</h4>
            <AiFillCheckCircle className="purchaseCheckIcon" fontSize={24} />
          </div>
        </div>
        <div className="purchaseText">
          <div className="purchaseTextLeftDiv">
            <h4 className="totalPrice">Total Price</h4>
          </div>
          <div className="purchaseTextRightDiv">
            <h4 className="purchaseNumber">
              {totalPrice} <span className="purchaseNumberSpan"> {contractData.chain == 5? "ETH": "MATIC"} (${showAmt.toFixed(5)}) </span>
            </h4>
          </div>
        </div>
        <button className="purchaseConnectBtn" onClick={isConnected? handlePurchase: handleConnect}>
         { isConnected? "Buy Now": "Connect Wallet"}
        </button>
      </div>
    </div>
  );
}

export default PurchaseStep;
