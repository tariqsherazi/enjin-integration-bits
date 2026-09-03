import React, { useState } from "react";
import { useSelector } from "react-redux";
import { test } from "../../../assets";
import "./css/index.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { trimWallet } from "../../../utills/trimWalletAddr";
import {ETHTOUSD, MATICTOUSD} from "../../../utills/currencyConverter";

function QuantityStep({setCurrent={setCurrent}, owner, name, setQuantity, price, totalPrice, setTotalPrice, showAmt, setShowAmt}) {
  const {contractData} = useSelector((state) => state.chain.contractData);
  const [ethBal, setEthBal] = useState(0);
  const [maticBal, setMaticBal] = useState(0);

  ETHTOUSD(1).then((result)=>{
    setEthBal(result);
  });

  MATICTOUSD(1).then((result)=>{
    setMaticBal(result);
  });

  const handleChange= (e)=>{
    const val = e.target.value;
    setQuantity(val);
    if(contractData.chain == 5){
      const total = price * val;
      setTotalPrice(total);
      setShowAmt(total * ethBal);
    }else{
      const total = price * val;
      setTotalPrice(total);
      setShowAmt(total * maticBal);
    }
  }


  return (
    <div className="quantityStep">
      <div className="quantityStepMainWrapper">
        <div className="quantitycontentDiv">
          <div className="quantityleftDiv">
            <div>
              <img className="quantityImg" src={test} />
            </div>
            <div className="quantitytextWrapper">
              <h4 className="quantityleftDivText">{name}</h4>
              <h6 className="quantityleftDivSubText"> From {trimWallet(owner)}</h6>
            </div>
          </div>
          <div className="quantityrightDiv">
            <AiFillCheckCircle className="checkIcon" fontSize={24} />
          </div>
        </div>

        <div className="quantityBottomDiv">
          <div className="quanitityBottomLeftDiv">
            <h6 className="selectQuantity">Select Quantity</h6>
            <input type="number" className="numberField" placeholder="0" onChange={handleChange}/>
          </div>
          <div className="quanitityBottomRightDiv">
            <button className="goBtn" onClick={() => setCurrent(2)}>Go</button>
          </div>
        </div>

        <div className="quantitytextContainer">
          <div className="quantitytextLeftContainer">
            <h4 className="priceText"> Total Price: </h4>
          </div>
          <div className="quantitytextRightContainer">
            <h4 className="numText">
              {totalPrice} <span className="ethText">{contractData.chain == 5? "ETH": "MATIC"} (${showAmt.toFixed(5)})</span>
            </h4>
          </div>
        </div>
        <div>
          <h4 className="bottomPriceText">
            1 {contractData.chain == 5? "ETH": "MATIC"} = <span className="dollarSpan"> ${contractData.chain == 5? ethBal: maticBal}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default QuantityStep;
