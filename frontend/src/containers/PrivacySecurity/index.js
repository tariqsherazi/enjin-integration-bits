import React from "react";
import "./css/index.css";
import { NavbarComponent, AccordianComponent } from "../../components/index";
import { useSelector } from "react-redux";

const PrivacySecurity = () => {
  let faqsData = [
    {
      key: "1",
      title: "Terms & Agreements",
      description: "",
    },
    {
      key: "2",
      title: "Digital Millennium Copyright Act",
      description: "",
    },
    // {
    //   key: "3",
    //   title: "Security",
    //   description:
    //     "To ensure App Security, please keep your account safe please keep your password in a secure place.",
    // },
    // {
    //   key: "4",
    //   title: "Other Safety Practices",
    //   description:
    //     "Always practice safe-keep of your private wallet seed phrase and other wallet passwords private and not public to ensure the must security.",
    // },
    {
      key: "4",
      title: "Privacy Policy",
      description: "",
    },
  ];
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  return (
    <div className={`${backgroundTheme} pb-4`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"13"}
        headerText={"Privacy & Security"}
      />
      <div className="container">
        <div className="my-5">
          <AccordianComponent
            btnKey={"3"}
            data={faqsData}
            termKey={"1"}
            copyrightKey={"2"}
            privacyKey={"4"}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurity;
