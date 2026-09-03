import React, { useState, useEffect } from "react";
import "./css/index.css";
import { Menu, Tooltip } from "antd";
import {
  collection,
  gallery,
  home2,
  marketplace,
  right_arrow,
  history,
  plus,
  payment,
  setting,
  transaction_history,
  selling_history,
  purchase_history,
  account_settings,
  help_center,
  lock,
  about,
} from "../../assets";
import { useNavigate } from "react-router-dom";
import { UploadVideoModal } from "../../components";
import { useSelector } from "react-redux";

function getItem(label, key, icon, children, type) {
  console.log();

  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const MenuComponent = ({
  menuHandle,
  selectedKey,
  className,
  toggleCollapsed,
}) => {
  const { userData } = useSelector((state) => state.address.userData);
  const [uploadVideoModal, setUploadVideoModal] = useState(false);
  console.log("userData",userData)
  const isLogged = userData?.isLogged;

  let navigate = useNavigate();

  const [width, setWidth] = useState(window.innerWidth);

  const handleCreateNFT = () => {
    if (isLogged) {
      setUploadVideoModal(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    getItem("Home", "1", <img src={home2} />),
    isLogged && getItem("My Collection", "2", <img src={collection} />),
    getItem("Emote-Video Gallery", "3", <img src={gallery} />),
    getItem("Marketplace", "4", <img src={marketplace} />),
    isLogged && getItem("Mint NFT", "5", <img src={right_arrow} />),
    isLogged &&
      getItem("Transaction History", "sub1", <img src={history} />, [
        isLogged &&
        getItem(
          "Transaction History(Coming Soon)",
          "6",
          <img src={transaction_history} />,
          [],
          true
        ),
        // isLogged &&
        //   getItem(
        //     "Transaction History",
        //     "6",
        //     <img src={transaction_history} />
        //   ),
        isLogged &&
          getItem("Selling History", "7", <img src={selling_history} />),
        isLogged &&
          getItem("Purchase History", "8", <img src={purchase_history} />),
      ]),

    isLogged &&
      getItem(
        <Tooltip title="Create Emote(Coming Soon)" placement="right">
          <div style={{ cursor: "not-allowed" }}>Create Emote</div>
        </Tooltip>,
        "9",
        <Tooltip title="Create Emote(Coming Soon)" placement="right">
          <div style={{ cursor: "not-allowed" }}>
            <img src={plus} />
          </div>
        </Tooltip>,
        [],
        true
      ),

    // isLogged && getItem("Payment", "10", <img src={payment} />),
    getItem("Settings", "sub2", <img src={setting} />, [
      isLogged &&
        getItem("Account Settings", "11", <img src={account_settings} />),
      getItem("Help Center", "12", <img src={help_center} />),
      getItem("Privacy & Security", "13", <img src={lock} />),
      getItem("About", "14", <img src={about} />),
    ]),
  ];
  return (
    <div
      style={{
        zIndex: 1,
        position: "fixed",
        // top: width < 600 ? "70px" : "",
        top: "70px",
      }}
      className={className}
    >
      <UploadVideoModal
        visible={uploadVideoModal}
        onClose={() => setUploadVideoModal(false)}
      />
      <Menu
        defaultSelectedKeys={[selectedKey]}
        className="manuStyle"
        mode="inline"
        theme="dark"
        inlineCollapsed={menuHandle}
        items={items}
        onClick={(item) => {
          item.key === "1" && navigate("/");
          item.key === "2" && navigate(`/collections/${userData?.id}`);
          item.key === "3" && navigate("/video-gallery");
          item.key === "4" && navigate("/marketplace");
          item.key === "5" && navigate("/mint-nft");
          item.key === "6" && navigate("/transaction-history");
          item.key === "7" && navigate("/selling-history");
          item.key === "8" && navigate("/purchase-history");
          item.key === "9" && handleCreateNFT();
          // item.key === "10" && navigate("/payment");
          item.key === "11" && navigate("/account-settings");
          item.key === "12" && navigate("/help-center");
          item.key === "13" && navigate("/privacy-security");
          item.key === "14" && navigate("/about-us");

          // item.key === "15" && navigate("/");
        }}
        onSelect={(item) => {
          item.key === "1" && navigate("/");
          item.key === "2" && navigate(`/collections/${userData?.id}`);
          item.key === "3" && navigate("/video-gallery");
          item.key === "4" && navigate("/marketplace");
          item.key === "5" && navigate("/mint-nft");
          item.key === "6" && navigate("/transaction-history");
          item.key === "7" && navigate("/selling-history");
          item.key === "8" && navigate("/purchase-history");
          item.key === "9" && handleCreateNFT();
          // item.key === "10" && navigate("/payment");
          item.key === "11" && navigate("/account-settings");
          item.key === "12" && navigate("/help-center");
          item.key === "13" && navigate("/privacy-security");
          item.key === "14" && navigate("/about-us");

          // item.key === "15" && navigate("/");
        }}
      />
    </div>
  );
};

export default MenuComponent;
