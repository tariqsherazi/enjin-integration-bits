import React from "react";
import "./css/index.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import NFtAddressReducer from "../../store/reducers/NftAddress";
import { useNavigate } from "react-router-dom";
import { logoutWallet } from "../../store/actions";
function LogoutModal() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.address.userData);
  const dispatch = useDispatch();
  const address = userData?.address;
  const full_name = userData?.full_name;


  const logoutHandle = () => {
    console.log("logout", 222);
    dispatch({
      type: "USER_AUTH_RESET",
      userData: {
        address: "",
        full_name: "",
        country: "",
        bio: "",
        profileImg: "",
        id: "",
        token: "",
        isLogged: false,
      },
    });
    localStorage.removeItem("token");
    dispatch(logoutWallet());
    navigate("/login");
  };

  return (
    <div className="logoutModal">
      <div className="flexDiv firstDiv">
        <p className="logOutText">User Name</p>
        <p className="logOutvalue">{full_name}</p>
      </div>
      <div className="flexDiv">
        <p className="logOutText">Wallet Address</p>
        <p
          className="logOutvalue"
          onClick={() => {
            navigator.clipboard.writeText(address);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          {address.slice(0, 4)}...{address.slice(37, address.length)}
        </p>
      </div>

      <div className="btnDiv">
        <button className="logOutBtn" onClick={logoutHandle}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default LogoutModal;
