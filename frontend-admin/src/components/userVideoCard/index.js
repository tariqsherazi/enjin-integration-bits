import React, { useState } from "react";
import "./css/index.css";
import Iframe from "react-iframe";
import { check, cross, menu_icon3, zoom } from "../../assets";
import { Dropdown, Menu, Button, Modal } from "antd";

const UserVideoCard = ({ videoUrl, Name }) => {
  const profileMenu = (
    <Menu
      onClick={(e) => {
        console.log(e);
      }}
      items={[
        {
          label: "Remove",
          key: "1",
        },
        {
          label: "Block",
          key: "2",
        },
      ]}
    />
  );
  const [isModalVisible, setIsModalVisible] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleVideoClick = (event) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent the default behavior of the click event
  };

  return (
    <div className="col-lg-4 col-md-6 col-12 my-3">
      <Modal
        title={false}
        closeIcon={<></>}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Iframe
          url={videoUrl}
          width="100%"
          height="470px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
          onClick={handleVideoClick}
        />
      </Modal>
      <div
        className="d-flex justify-content-between px-2"
        style={{ alignItems: "start" }}
      >
        <div className="playerView shadowBorder">
          <div
            onClick={showModal}
            className="cursor d-flex justify-content-end"
          >
            <img
              src={zoom}
              style={{ position: "absolute", width: 25 }}
              className="p-2"
            />
          </div>
          <Iframe
            url={videoUrl}
            width="130px"
            height="110px"
            id="myId"
            className="myClassname"
            display="initial"
          />
        </div>
        <div>
          <div className="mt-2 ms-3">
            <h5 className="m-0">{Name}</h5>
            <div>
              <img src={cross} />
              <span className="ms-2 my-2">No copyright Transfer</span>
            </div>
            <div>
              <img src={check} />
              <span className="ms-2 my-2">First Gen Emote</span>
            </div>
          </div>
        </div>
        <Dropdown overlay={profileMenu}>
          <Button className="videoCardMenuIcon">
            <img style={{ cursor: "pointer" }} src={menu_icon3} />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserVideoCard;
