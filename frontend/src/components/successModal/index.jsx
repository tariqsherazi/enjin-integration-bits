import React from "react";
import "./css/index.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

function SuccessModal({showAmt, totalPrice}) {
  const {contractData} = useSelector((state) => state.chain.contractData);

  return (
    <div className="successModal">
      <h4 className="paymentConfirmedText">
        Payment Confirmed <AiFillCheckCircle className="paymentCheckIcon" />
      </h4>
      <h6 className="totalAmountText">
        Total amount = {totalPrice} {contractData.chain == 5? "ETH": "MATIC"} <span className="numberText"> (${showAmt.toFixed(5)})</span>
      </h6>
    </div>
  );
}

export default SuccessModal;
