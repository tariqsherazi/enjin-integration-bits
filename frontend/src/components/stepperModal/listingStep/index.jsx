import React from "react";
import "./css/index.css";
import { test } from "../../../assets";
import { useSelector } from "react-redux";
import {trimWallet} from "../../../utills/trimWalletAddr";

function ListingStep({ setCurrent, owners, name, setOwner, setPrice, setFixedId }) {

  const {contractData} = useSelector((state) => state.chain.contractData);

  // const contentDivData = [
  //   { id: 1 },
  //   {
  //     id: 2,
  //     bottom: true,
  //   },
  //   {
  //     id: 2,
  //     bottom: true,
  //   },
  //   {
  //     id: 2,
  //     bottom: true,
  //   },
  // ];

  const handleSelection = (owner, price, fixedid)=>{
    setOwner(owner);
    setPrice(price);
    setFixedId(fixedid);
    setCurrent(1)
  }
  return (
    <div className="listingStepContainer">
      <h4 className="noteText">
        Note: &nbsp;
        <span className="spanText">
          This Item Seller is Snap Boogie. Select Which NFT would you like to
          proceed with
        </span>
      </h4>
      {owners.map((item, i) => (
        item.copies > 0 ?
        <div
          className={item ? "bottomContentDiv" : "contentDiv"}
          key={i}
          onClick={()=>handleSelection(item.owner, item.price, item.fixedid)}
        >
          <div className="leftDiv">
            <img className="divImg" src={test} />
            <div>
              <h4 className="leftDivText">{name} </h4>
              <p>{item.copies} NFTs Available</p>
            </div>

            <h6 className="leftDivSubText"> ({trimWallet(item.owner)})</h6>
          </div>
          <div className="rightDiv">
            <h4 className="numText">
              {item.price} <span className="ethText">{contractData.chain == 5? "ETH": "MATIC"}</span>
            </h4>
          </div>
        </div>: ""
      ))}
    </div>
  );
}

export default ListingStep;
