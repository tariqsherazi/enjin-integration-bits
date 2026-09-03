import React, { useState, useRef, useEffect } from "react";

import { ButtonComponent } from "../index";
import { Button, Modal, Row, Col, Progress, Input } from "antd";
import "./css/index.css";
import { useSelector, useDispatch } from "react-redux";

const QrCodeModal = ({ visible, onClose, qrCode }) => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor2 = useSelector((state) => state.app.theme.bgColor2);

  return (
    <Modal
      footer={null}
      className={`${backgroundTheme} qrModal`}
      bodyStyle={{ backgroundColor: "#222222" }}
      open={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      <div>
        <Row className=" ms-3 py-3" gutter={{ xs: 8, sm: 16, md: 20, lg: 32 }}>
          <Col>
            <p className={`${textColor} fs-5 text-center m-0`}>
              Please Close Modal After Scanning QR Code
            </p>
            <img className="mt-3" src={qrCode} width={400} height={400}></img>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default QrCodeModal;
