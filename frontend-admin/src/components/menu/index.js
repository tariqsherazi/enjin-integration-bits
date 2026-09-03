import React, { useMemo, useState } from "react";
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
import { LogoutOutlined } from "@ant-design/icons";
import environment from "../../environment";
import ToastMessage from "../toastMessage";
import { useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";

function getItem(label, key, icon, navigate, children, type, admin) {
  return {
    key,
    icon,
    children,
    label,
    type,
    navigate,
    onClick: admin
      ? () => {
          window.open("https://bmd9150.zendesk.com/", "_blank");
        }
      : undefined,
  };
}

let admin = true;
const items = [
  getItem("Dashboard", "1", <img src={home} />, "/"),
  getItem("User Information", "2", <img src={user} />, "/user-information"),
  getItem("Data Section", "3", <img src={folder} />, "/data-section"),
  getItem(
    "Admin Support",
    "4",
    <img src={message} />,
    undefined,
    undefined,
    true
  ),
  getItem("Payment", "5", <img src={paper} />, "/payment"),
  getItem("Previous Notes", "6", <img src={pen} />, "/previous-notes"),
  getItem("Settings", "7", <img src={settings} />, "/settings"),
  getItem("Logout", "8", <LogoutOutlined />, "/logout"),
  getItem("Top NFTs", "9", <AiOutlineSend />, "/top-nfts"),
];

const MenuComponent = ({ selectedKey, routeAccess, className }) => {
  let navigate = useNavigate();
  const [menuHandle, setmenuHandle] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem(environment.ADMIN_TOKEN);
    localStorage.removeItem(environment.ADMIN_EMAIL);
    navigate("/login");
    ToastMessage("Logout Successfully", "", "success");
  };

  const filteredItems = useMemo(() => {
    if (routeAccess) {
      let arr = routeAccess;
      if (!arr.includes("/logout")) {
        arr.push("/logout");
      }
      return items.filter((item) => arr?.includes(item.navigate));
    }
  }, [routeAccess]);

  console.log("filteredItems", filteredItems);

  console.log("menuItems", filteredItems);

  return (
    <div
      className={`${className} bg-dark-blue2`}
      style={{
        width: menuHandle ? 80 : 256,
        zIndex: 1,
        overflow: "auto",
        position: "fixed",
        left: 0,
      }}
    >
      {menuHandle ? (
        <div
          style={{ width: 80, height: 55 }}
          onClick={() => setmenuHandle(false)}
          className="cursor d-flex center justify-content-center mt-2"
        >
          <img src={toggle_menu} />
        </div>
      ) : (
        <div style={{ width: 260, height: 55 }} className="mt-2">
          <div className="d-flex justify-content-between center ps-2 pe-3">
            <div className="d-flex center">
              <img src={logo2}  width="60px"/>
              <h5 className="red ms-3 semi-bold m-0">BITS</h5>
            </div>
            <img
              src={toggle_menu}
              onClick={() => setmenuHandle(true)}
              className="cursor"
            />
          </div>
        </div>
      )}
      <div className="grey-border2 mt-2 mb-4 mx-3"></div>

      <Menu
        className="manuStyle bg-dark-blue2"
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
        inlineCollapsed={menuHandle}
        items={filteredItems}
        onSelect={(item) => {
          const selectedItem = filteredItems.find(
            (filteredItem) => filteredItem.key === item.key
          );
          if (selectedItem.navigate !== "/logout") {
            navigate(selectedItem.navigate);
          } else {
            handleLogout();
          }
        }}
      />
    </div>
  );
};

export default MenuComponent;
