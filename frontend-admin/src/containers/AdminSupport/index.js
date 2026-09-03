import React from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import {
  ellipse,
  ellipse2,
  profile,
  right_arrow,
  search,
  send,
} from "../../assets";
import { Input } from "antd";

const AdminSupport = () => {
  let queueChats = [
    {
      image: profile,
      name: "John Smith",
    },
    {
      image: profile,
      name: "John Smith",
    },
    {
      image: profile,
      name: "John Smith",
    },
    {
      image: profile,
      name: "John Smith",
    },
    {
      image: profile,
      name: "John Smith",
    },
    {
      image: profile,
      name: "John Smith",
    },
    {
      image: profile,
      name: "John Smith",
    },
  ];
  let previousChats = [
    {
      image: profile,
      name: "John Smith",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum",
    },
  ];
  let chats = [
    {
      image: profile,
      name: "John Smith",
      description:
        "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum Loreum ipsum Loreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description:
        "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum Loreum ipsum Loreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description:
        "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum Loreum ipsum Loreum ipsumLoreum ipsum",
    },
    {
      image: profile,
      name: "John Smith",
      description:
        "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum Loreum ipsum Loreum ipsumLoreum ipsum",
    },
  ];
  return (
    <div className="bg-white2">
      <NavbarComponent lightNav headerTxt={"Admin Support"} selectedKey={"4"} />

      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        <div className="bg-grey2 radius1 p-3">
          <div className="d-flex center">
            <img src={ellipse} />
            <h5 className="m-0 ms-2">Chats in Queue</h5>
          </div>
          <div className="mt-3 d-flex flex-wrap">
            {queueChats.map((e, i) => {
              return (
                <div key={i} className="mx-3 mt-2">
                  <img src={e.image} style={{ width: 40 }} />
                  <span className="ms-2">{e.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3">
          <div className="row">
            <div className="col-lg-6">
              <div className="bg-grey2 radius1 p-3">
                <h5 className="m-0">Previous chats</h5>
                <div className="d-flex searchStyle bg-white py-1 my-3">
                  <Input
                    placeholder="Search here..."
                    className={`whiteSearchStyle bg-white`}
                  />
                  <img
                    className="cursor me-3"
                    style={{ width: 15 }}
                    src={search}
                  />
                </div>
              </div>
              <div className="bg-grey4 pt-4">
                {previousChats.map((e, i) => {
                  return (
                    <div key={i} className="mx-3 mb-4 d-flex center">
                      <img src={e.image} style={{ width: 50 }} />
                      <div className="ms-2">
                        <span>{e.name}</span>
                        <p className="light-grey m-0">{e.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-grey2 p-3 radius1">
                <div className="d-flex justify-content-between center">
                  <div className="d-flex center">
                    <img src={right_arrow} />
                    <h5 className="m-0 ms-2">John Smith</h5>
                  </div>
                  <div className="center liveChatHeadView">
                    <div className="d-flex center liveChat">
                      <img src={ellipse2} />
                      <h5 className="m-0 ms-2">Live Chat</h5>
                    </div>
                    <span className="ms-4 red-border radius1 red2 px-2">
                      End Chat
                    </span>
                  </div>
                </div>
                <div className="light-grey-border-bottom my-3"></div>
                {chats.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className={`${
                        i % 2 === 0 ? "bg-white" : "bg-blue"
                      } radius2 p-3 d-flex my-4`}
                      style={{
                        alignItems: "start",
                        flexDirection: i % 2 !== 0 && "row-reverse",
                      }}
                    >
                      <img src={e.image} />
                      <div className={`${i % 2 === 0 ? "ms-4" : "me-4"}`}>
                        <div
                          className={`${
                            i % 2 !== 0 && "d-flex justify-content-end"
                          }`}
                        >
                          <h5 className="m-0 mb-1">{e.name}</h5>
                        </div>
                        <span
                          className={` ${
                            i % 2 === 0 ? "light-grey" : "white"
                          } d-flex`}
                          style={{ textAlign: i % 2 !== 0 && "end" }}
                        >
                          {e.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex searchStyle bg-white my-3">
                  <Input
                    placeholder="Write here..."
                    className={`whiteSearchStyle bg-white`}
                  />
                  <div className="bg-blue sendBtn">
                    <img className="cursor" style={{ width: 15 }} src={send} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSupport;
