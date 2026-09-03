import React from "react";
import "./css/index.css";
import { NavbarComponent, AccordianComponent } from "../../components/index";
import { useSelector } from "react-redux";

const HelpCenter = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  let faqsData = [
    {
      key: "1",
      title: "What is an Emote NFT?",
      description:
        "An Emote NFT is a real life dance move or other body movement made into a virtual animated character connected to an NFT (Non-Fungible Token). It can be purchased as a collectable and compatible to be added and used in video games. The first Emote Dance NFT in the world was created by Snap Boogie in March 2021.",
    },
    {
      key: "2",
      title: "What is Blockchain?",
      description:
        "Blockchain is a digital peer to peer distributed ledger. It allows for transactions to be sent back and forth with a protocol that provides immutability, transparency, consensus and decentralization. Blockchain allows us to be sovereign amongst one another.",
    },
    {
      key: "3",
      title: "What is Cryptocurrency (Bitcoin/Ethereum)?",
      description:
        "Bitcoin is the first Cryptocurrency. Its digital money that was created by Satoshi Nakamoto for people to be sovereign and become their own banks. ETH is a crypto token that powers the Ethereum blockchain where you can build decentralized applications. There are over 3,000 Cryptocurrency and the space keeps growing year by year.",
    },
    {
      key: "4",
      title: "Can I Resell on other NFT Secondary Markets?",
      description:
        "Secondary sales will be available only until BITS goes in Public Beta.",
    },
    {
      key: "5",
      title: "I’m Having technical Issues, Help!",
      description:
        "Let us help! Contact us at support@beautyinthestreets.com so we can assist you and solve your issue.",
    },
    {
      key: "6",
      title: "How Can I Cancel my Account?",
      description:
        "We don’t want to see you go! You may contact us at support@beautyinthestreets.com and request cancellation of your account.",
    },
    {
      key: "7",
      title: "Partner with BITS",
      description:
        "Want to partner with us!? Send us a line at Info@beautyinthestreets.com so we can chat about how we can collaborate.",
    },
  ];
  return (
    <div className={`${backgroundTheme} pb-4`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"12"}
        headerText={"Help Center"}
      />
      <div className="container">
        <div className="my-5">
          <h4 className={textColor}>FAQs</h4>
          <AccordianComponent list data={faqsData} />
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
