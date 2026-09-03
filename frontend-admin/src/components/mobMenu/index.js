import React, { useState } from "react";
import "./css/index.css";
import { Menu } from "antd";
import {
  folder,
  home,
  logo2,
  paper,
  pen,
  settings,
  user,
  message,
  toggle_menu,
} from "../../assets";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Dashboard", "1", <img src={home} />),
  getItem("User Information", "2", <img src={user} />),
  getItem("Data Section", "3", <img src={folder} />),
  getItem("Admin Support", "4", <img src={message} />),
  getItem("Payment", "5", <img src={paper} />),
  getItem("Previous Notesss", "6", <img src={pen} />),
  getItem("Settings", "7", <img src={settings} />),
  
];

const MobMenuComponent = ({ selectedKey, className, showMenu, setShowMenu }) => {
  let navigate = useNavigate();
  return (
    <>
      {showMenu && <div
        className={`${className} bg-dark-blue2`}
        style={{
          width: 256,
          zIndex: 1,
          overflow: "auto",
          position: "fixed",
          left: 0,
        }}
      >
        <div style={{ width: 260, height: 55 }} className="mt-2">
          <div className="d-flex justify-content-between center ps-2 pe-3">
            <div className="d-flex center">
            <img src={logo2}  width="60px"/>
              <h5 className="red ms-3 semi-bold m-0">BITS</h5>
            </div>
            <img src={toggle_menu} onClick={()=>setShowMenu(false)} className="cursor" />
          </div>
        </div>
        <div className="grey-border2 mt-2 mb-4 mx-3"></div>
        <Menu
          className="manuStyle bg-dark-blue2"
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
          items={items}
          onSelect={(item) => {
            item.key === "1" && navigate("/");
            item.key === "2" && navigate("/user-information");
            item.key === "3" && navigate("/data-section");
            item.key === "4" && navigate("/admin-support");
            item.key === "5" && navigate("/payment");
            item.key === "6" && navigate("/previous-notes");
            item.key === "7" && navigate("/settings");
          }}
        />
      </div>}
    </>
  );
};

export default MobMenuComponent;
