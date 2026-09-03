import React, { useState, useEffect } from "react";
import "./css/index.css";
import { Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";

const SwitchBtn = ({ toggleBtn }) => {
  const [toggle, setToggle] = useState(true);
  const textColor = useSelector((state) => state.app.theme.textColor);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   let theme = localStorage.getItem("theme");
  //   setToggle(theme)
  //   console.log("dsa",toggle)
  // },[])
  function onChange(checked) {
    // localStorage.setItem("theme", checked);
    // let theme = localStorage.getItem("theme");
    // textColor === 'white' ? setToggle(true) : setToggle(false)
    // setToggle(checked)
    dispatch({
      type: "THEME",
      theme: {
        backgroundTheme: `${checked ? "black-background" : "light-background"}`,
        headerTheme: `${checked ? "black-background2" : "red-background2"}`,
        textColor: `${checked ? "white" : "black"}`,
        textColor2: `${checked ? "light-grey" : "dark-grey"}`,
        textColor3: `${checked ? "white" : "red"}`,
        bgColor: `${checked ? "dark-grey-bg" : "white2"}`,
        bgColor2: `${checked ? "" : "light-background2"}`,
        bgColor3: `${checked ? "black-background3" : "light-background3"}`,
        border: `${checked ? "dark-border" : "light-border"}`,
      },
    });
    console.log(`switch to ${checked}`);
  }
  return (
    <Switch
      checked={toggleBtn}
      className="switchBtnStyle"
      onChange={onChange}
    />
  );
};

export default SwitchBtn;
