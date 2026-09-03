import React, { useEffect, useState } from "react";
import {
  map_img,
  user_icon,
  mail_icon,
  phone_icon,
  send_msg_icon,
  mail_fill_icon,
  phone_fill_icon,
  location_fill_icon,
  logo,
} from "../../assets";
import {
  ButtonComponent,
  NavbarComponent,
  ToastMessage,
} from "../../components";
import "./css/index.css";
import { Col, Input, Row, Modal } from "antd";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT, SEND_EMAIL_MUTATION } from "../../gql/mutations";
import { useFormik } from "formik";
import { contactValidate } from "../../components/validations";
import environment from "../../environment";

const Contact = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const [addContact, { loading, error, data }] = useMutation(ADD_CONTACT);

  const [
    sendEmail,
    { data: emailData, loading: emailLoading, error: emailError },
  ] = useMutation(SEND_EMAIL_MUTATION);
    console.log("data",emailData)
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validate: contactValidate,

    onSubmit: async (values) => {
      try {

        const result = await sendEmail({
          variables: {
            to: environment.PLATFORM_OWNER,
            from: environment.EMAIL_OWNER,
            subject: `Contact Email From ${values?.fullName}`,
            text: `${values?.message} and here is my ${values?.phoneNumber && `phone number ${values?.phoneNumber} /`} email ${values?.email}`,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
      console.log("errorserrors",errors)
  useEffect(() => {
    if (emailData) {
      ToastMessage("Platform will contact you!", "", "success");
      resetForm("");
    }
    if (emailError) {
      ToastMessage("error", emailError.message, "error");
    }
  }, [emailError, emailData]);

  return (
    <div className={`${backgroundTheme}`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={""}
        headerText={"Contact"}
      />
      <div style={{ minHeight: "100vh" }}>
        <img src={map_img} style={{ width: "100%", height: "auto" }} />
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          className="contentModal"
          closable={false}
          maskClosable={true}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              cursor: "pointer",
            }}
          >
            <ImCross onClick={handleCancel} color="#ffffff" />
          </div>

          <div className="d-flex justify-content-center">
            <img src={logo} style={{ width: 100 }} />
          </div>
          <div>
            <Input
              placeholder={"Full Name"}
              className="contactInputsStyle regular"
              value={values.fullName}
              onChange={(e) => {
                setFieldValue("fullName", e.target.value);
              }}
              onBlur={handleBlur}
            />
            <div style={{ position: "absolute" }}>
              <img className="inputIcon" src={user_icon} />
            </div>
          </div>
          {errors.fullName && errors.fullName && (
            <div className="error text-center text-white">
              {errors.fullName}
            </div>
          )}
          <div>
            <Input
              placeholder={"Email"}
              className="contactInputsStyle regular"
              value={values.email}
              onChange={(e) => {
                setFieldValue("email", e.target.value);
              }}
              onBlur={handleBlur}
            />
            <div style={{ position: "absolute" }}>
              <img src={mail_icon} className="inputIcon" />
            </div>
          </div>
          {errors.email && errors.email && (
            <div className="error text-center text-white">{errors.email}</div>
          )}
          <div>
            <Input
              placeholder={"Phone"}
              className="contactInputsStyle regular"
              type="number"
              value={values.phoneNumber}
              onChange={(e) => {
                setFieldValue("phoneNumber", e.target.value);
              }}
              onBlur={handleBlur}
            />
            <div style={{ position: "absolute" }}>
              <img src={phone_icon} className="inputIcon" />
            </div>
          </div>
          {errors.phoneNumber && errors.phoneNumber && (
            <div className="error text-center text-white">
              {errors.phoneNumber}
            </div>
          )}
          <div>
            <div className="py-3 px-2">
              <img src={send_msg_icon} style={{ width: 25 }} />
              <span style={{ color: "#b0b0b0" }} className="ms-2">
                Message
              </span>
            </div>
            <Input.TextArea
              rows={4}
              className="msgTextArea"
              value={values.message}
              onChange={(e) => {
                setFieldValue("message", e.target.value);
              }}
              onBlur={handleBlur}
            />
          </div>

          {errors.message && errors.message && (
            <div className="error text-center text-white">{errors.message}</div>
          )}
          <div className="mt-4">
            <ButtonComponent
              height={40}
              onClick={handleSubmit}
              text={"Submit"}
            />
          </div>
          <Row gutter={{ xs: 8, sm: 16, md: 20, lg: 32 }} className="mt-5 mb-2">
            <Col span={8}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="contactIconsView d-flex align-items-center justify-content-center">
                  <img src={mail_fill_icon} style={{ width: 20 }} />
                </div>
              </div>
              <p
                className={`${textColor2} text-center m-0`}
                style={{ fontSize: 12 }}
              >
                Info@beautyinthestreets.com
              </p>
            </Col>
            <Col span={8}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="contactIconsView d-flex align-items-center justify-content-center">
                  <img src={phone_fill_icon} style={{ width: 20 }} />
                </div>
              </div>
              <p
                className={`${textColor2} text-center m-0`}
                style={{ fontSize: 12 }}
              >
                Info@beautyinthestreets.com
              </p>
            </Col>
            <Col span={8}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="contactIconsView d-flex align-items-center justify-content-center">
                  <img src={location_fill_icon} style={{ width: 20 }} />
                </div>
              </div>
              <p
                className={`${textColor2} text-center m-0`}
                style={{ fontSize: 12 }}
              >
                300 W Clarendon Ave. Suite 240 Phoenix, AZ, 85013
              </p>
            </Col>
          </Row>
        </Modal>
      </div>
    </div>
  );
};

export default Contact;
