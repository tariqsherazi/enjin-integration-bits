import React from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { metamask, paypal, plus, plus3 } from "../../assets";
import { Button } from "antd";

const Payment = () => {
  let withdrawRequests = [
    {
      name: "Katty",
      status: "Paypal Requested",
      amount: "$300",
    },
    {
      name: "Katty",
      status: "Paypal Requested",
      amount: "$300",
    },
    {
      name: "Katty",
      status: "Paypal Requested",
      amount: "$300",
    },
    {
      name: "Katty",
      status: "Paypal Requested",
      amount: "$300",
    },
    {
      name: "Katty",
      status: "Paypal Requested",
      amount: "$300",
    },
  ];
  return (
    <div className="bg-white2">
      <NavbarComponent lightNav headerTxt={"Payment"} selectedKey={"5"} />
      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        <div className="row">
          <div className="col-lg-6">
            <div className="green-border radius2">
              <div
                className="d-flex center justify-content-center "
                style={{ flexDirection: "column", height: 180 }}
              >
                <h5 className="green2 m-0">Total Balance</h5>
                <h2 className="m-0 semi-bold">$30,000</h2>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-6">
                <div className="blue-gradient radius2">
                  <div
                    className="d-flex center justify-content-center "
                    style={{ height: 180, flexDirection: "column" }}
                  >
                    <h5 className="white m-0">Total Balance</h5>
                    <h2 className="m-0 semi-bold">$30,000</h2>
                  </div>
                </div>
              </div>
              <div className="col-6 ">
                <div className="orange-gradient radius2">
                  <div
                    className="d-flex center justify-content-center "
                    style={{ height: 180, flexDirection: "column" }}
                  >
                    <h5 className="white m-0">Total Balance</h5>
                    <h2 className="m-0 semi-bold">$30,000</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-light-blue radius2">
              <div className="p-4">
                <h5 className="m-0">Payment Methods</h5>
                <div className="light-grey-border-bottom my-3"></div>
                <div
                  className="d-flex justify-content-between mt-4 paymentMethodCard"
                >
                  <div className="paymentMethodCardContent">
                    <div className="my-4">
                      <img src={metamask} />
                      <p className="red2 m-0 cursor mt-2">Remove x</p>
                    </div>
                    <div className="light-grey-border-bottom"></div>
                    <div className="my-4">
                      <img src={paypal} />
                      <p className="red2 m-0 cursor mt-2">Remove x</p>
                    </div>
                    <div className="light-grey-border-bottom my-3"></div>
                  </div>
                  <div className="bg-white radius2">
                    <div
                      className="d-flex center justify-content-center"
                      style={{
                        height: 250,
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{ textAlign: "center" }}
                        className="px-4 semi-bold"
                      >
                        Add New Payment Method
                      </span>
                      <img src={plus3} className="mt-2 cursor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 withdrawRequest">
            <div className="radius2 shadowBorder p-4">
              <h5>Withdraw Request</h5>
              <div className="light-grey-border-bottom my-3"></div>
              {withdrawRequests.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="light-grey-border-bottom py-3 d-flex justify-content-between"
                  >
                    <div>
                      <h5 className="m-0 purple2">{e.name}</h5>
                      <span className="purple">{e.status}</span>
                    </div>
                    <div>
                      <h5
                        style={{ textAlign: "center" }}
                        className="m-0 blue mb-1"
                      >
                        {e.amount}
                      </h5>
                      <div>
                        <Button
                          className="bg-green white mb-1"
                          style={{ width: "100%", height: 30 }}
                        >
                          Approve
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="bg-red white"
                          style={{ width: "100%", height: 30 }}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
