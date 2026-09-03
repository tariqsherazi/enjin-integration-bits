import React from "react";
import { thumbnail, profile_small } from "../../assets";
import "./css/index.css";
import { Button } from "antd";

const VideoCard = ({
  id,
  videoThumbnail,
  name,
  title,
  video,
  description,
  updateNftStatus,
  isBlocked,
  refetch,
  viewOnly
}) => {
  console.log("ididid", id);

  const handleClick = async () => {
    await updateNftStatus({
      variables: {
        id: id,
      },
    });
    await refetch();
  };

  return (
    <div className="light-grey-border-bottom d-flex center py-4 videoCardMobView">
      <video src={video} height={150} width={150} />

      <div style={{ marginLeft: "10px" }}>
        <h5 className="m-0 videoCardMobAlignment">{title}</h5>
        <div className="d-flex center videoCardMobAlignment">
          {/* <img src={image} /> */}
          <h5 className="m-0 ms-2 red2">{name}</h5>
        </div>
        <span className="light-grey videoCardMobAlignment">{description}</span>
      </div>
      <div className="d-block ms-3 videoCardMobAlignment">
        <Button
        disabled={viewOnly}
          className="videoCardBtns bg-black radius1 mb-2 white"
          onClick={() => handleClick()}
        >
          {isBlocked ? "Unblock" : "Block"}
        </Button>
      </div>
    </div>
  );
};

export default VideoCard;
