import React, { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  Dashboard,
  Login,
  Collections,
  TransactionHistory,
  SellingHistory,
  PurchaseHistory,
  AccountSettings,
  EditProfile,
  HelpCenter,
  PrivacySecurity,
  Payment,
  VideoGallery,
  AboutUs,
  NotFound,
  MintNft,
  Contact,
} from "../../containers/index";
import ListNft from "../../containers/ListNft";
import AssetsDetails from "../../containers/AssetsDetails";
import Marketplace from "../../containers/Marketplace";
import SellsNft from "../../containers/Collections/sell";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import "./elements.css";
import PrivateRoute from "./PrivateRoute";
import { updateAccount } from "../../store/actions";
import NdtDetailsScreen from "../../components/nftDetailScreen";

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Router = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );

  const dispatch = useDispatch();
  const { web3, account } = useSelector((state) => state.web3.walletData);

  useEffect(() => {
    web3 &&
      window.ethereum.on("accountsChanged", async (data) => {
        console.log("account,", data[0]);
        dispatch(updateAccount(data[0]));
      });
  }, [web3, account]);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <div style={{ minHeight: "100vh" }} className={`${backgroundTheme}`}>
        <div className="footer-logo">
          <img src={logo} width={60} />
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />

          {/* <Route path="/collections" element={<PrivateRoute />}> */}
          <Route path="/collections/:userId" element={<Collections />} />
          {/* </Route> */}

          <Route path="transaction-history" element={<TransactionHistory />} />
          <Route path="selling-history" element={<SellingHistory />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />

          <Route path="/account-settings" element={<PrivateRoute />}>
            <Route path="/account-settings" element={<AccountSettings />} />
          </Route>

          <Route
            path="/account-settings/edit-profile"
            element={<PrivateRoute />}
          >
            <Route
              path="/account-settings/edit-profile"
              element={<EditProfile />}
            />
          </Route>
          <Route path="/nft-detail/:id" element={<NdtDetailsScreen />} />

          <Route path="help-center" element={<HelpCenter />} />
          <Route path="privacy-security" element={<PrivacySecurity />} />
          {/* <Route path="payment" element={<Payment />} /> */}
          <Route path="video-gallery" element={<VideoGallery />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="mint-nft" element={<MintNft />} />
          <Route path="assets-details" element={<AssetsDetails />} />
          <Route path="list-nft/:hash" element={<ListNft />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="sell" element={<SellsNft />} />

          {/* {(Object.keys(data).length > 0 || userData) && (
          <>
          </>
        )} */}
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
