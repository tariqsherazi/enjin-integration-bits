import React from "react";
import { logo } from "../../assets";
import "./css/index.css";
import { trimWallet } from "../../utills/trimWalletAddr";

const BidModal = ({nftOwner, name, offerAmount, amount, chain}) => {
  return (
    <div className="main-wrapper">
      <div className="top-title">Place your Bid</div>
      <div className="info">
        <div className="d-flex gap-3 align-items-center pb-3">
          <div>
            <img src={logo} width={80} height={100} />
          </div>
          <div>
            <h5>{name}</h5>
            <h2>{trimWallet(nftOwner)}</h2>
            <p>Chain: {chain}</p>
          </div>
        </div>

        <div>
          <h5>{offerAmount} {chain}</h5>
          <p>$ {amount}</p>
        </div>
      </div>

      <div style={{ border: ".5px solid lightgray" }}></div>

      <div className="mt-4">
        <h5>Go to your wallet</h5>
        <p>
          You'all be asked to review and confirm this offer from your wallet.
        </p>
      </div>
    </div>
  );
};

export default BidModal;
