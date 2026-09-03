import React from "react";
import { ButtonComponent } from "../index";
import { Modal } from "antd";
import "./css/index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  loadBlockchainAction,
  loadWalletConnectAction,
} from "../../store/actions";

const ConnectModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const { web3, account } = useSelector((state) => state.web3.walletData);
  const { userData } = useSelector((state) => state.address.userData);
  const {contractData} = useSelector((state) => state.chain.contractData);
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  console.log("checking www", web3, account, userData?.address||account);

  const handleWeb3MetaMask = async () => {
    dispatch(loadBlockchainAction(contractData.chain, userData?.address ||account));
  };

  const handleWalletConnect = async () => {
    onClose()
    dispatch(loadWalletConnectAction(contractData.chain, userData?.address ||account));
  };

  return (
    <Modal
      // wrapClassName={backgroundTheme}
      style={{ marginTop: "6rem" }}
      footer={null}
      className={backgroundTheme}
      bodyStyle={{ backgroundColor: "#222222" }}
      open={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      <div>
        <div className="d-flex mt-3 gap-4   flex-column justify-content-center align-items-center">
          <ButtonComponent
            onClick={handleWeb3MetaMask}
            text={"Link MetaMask"}
            height={40}
            width={170}
          />
          <ButtonComponent
            onClick={handleWalletConnect}
            text={"Link Mobile Wallet"}
            height={40}
            width={170}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConnectModal;
