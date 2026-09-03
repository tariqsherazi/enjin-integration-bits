import React, { useEffect, useMemo, useState } from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Modal } from "antd";
import {
  CREATE_SUB_ADMIN,
  UPDATE_ADMIN_NAME,
  UPDATE_ADMIN_PASSWORD,
} from "../../gql/mutations";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import Loading from "../../components/loaders/loading";
import { ADMIN_BY_EMAIL } from "../../gql/queries";
import environment from "../../environment";
import {
  nameValidate,
  passwordValidate,
  subAdminValidate,
} from "../../validations";
import { useDispatch, useSelector } from "react-redux";
import { loadAdminDetailsAction } from "../../store/actions";
import ToastMessage from "../../components/toastMessage";
import { useNavigate } from "react-router-dom";

const Settings = () => {

  const {id, superUser } = useSelector((state) => state.adminDetails.adminDetails);
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const [isModalVisible, setIsModalVisible] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isViewOnly, setIsViewOnly] = useState(false);
  console.log("isViewOnly",isViewOnly)
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    console.log("value", value);
    if (event.target.checked) {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        value,
      ]);
    } else {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((option) => option !== value)
      );
    }
  };
  console.log("selectedOptions", selectedOptions); // Log the selected options onChange

  const [createSubAdmin, { loading: subLoading, error: deleteError, data }] =
    useMutation(CREATE_SUB_ADMIN);

  const [
    updateAdminPassowrd,
    { loading: passLoading, error: passError, adminUpdated },
  ] = useMutation(UPDATE_ADMIN_PASSWORD);

  const {
    handleSubmit: updatePassword,
    handleChange: handlePassChange,
    values: passValues,
    touched: passTouched,
    errors: passErrors,
  } = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validate: passwordValidate,

    onSubmit: async (passValues) => {
      try {
        const data = await updateAdminPassowrd({
          variables: {
            id: id,
            password: passValues.password,
            new_password: passValues?.newPassword,
          },
        });
        localStorage.removeItem(environment.ADMIN_TOKEN);
        localStorage.removeItem(environment.ADMIN_EMAIL);
        navigate("/login");
        ToastMessage("Password updated", "", "success");

        console.log(data);
      } catch (e) {
        if (e?.message) {
          ToastMessage(e?.message, "", "error");
        }
        console.error("eee", e?.message);
      }
    },
  });

  const [
    updateAdminName,
    { loading: nameLoading, error: nameError, updatedName },
  ] = useMutation(UPDATE_ADMIN_NAME);

  const {
    handleSubmit: handleNameUpdate,
    handleChange: handleNameChange,
    values: nameValues,
    touched: nameTouched,
    errors: nameErrors,
    resetForm: resetName,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validate: nameValidate,

    onSubmit: async (nameValues) => {
      try {
        const data = await updateAdminName({
          variables: {
            id: id,
            name: nameValues.name,
          },
        });
        resetName()
        dispatch(loadAdminDetailsAction(data?.data?.UpdateAdminName))
        ToastMessage("Username Updated", "", "success");

      } catch (e) {
        console.error(e);
      }
    },
  });

  const { handleSubmit, handleBlur, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate: subAdminValidate,

    onSubmit: async (values) => {
      try {
        console.log("values", values);
        const data = await createSubAdmin({
          variables: {
            values: {
              name: values.name,
              email: values.email,
              routes: selectedOptions,
              view_only: isViewOnly
            },
          },
        });
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <div className="bg-white2 pb-4">
      <NavbarComponent lightNav headerTxt={"Settings"} selectedKey={"7"} />
      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        <Modal
          title={false}
          closeIcon={<></>}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          bodyStyle={{
            backgroundColor: "#10101c",
            opacity: ".8",
            height: 230,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          centered
        >
          <h3 style={{ color: "#34C943" }}>Admin Request Sent</h3>
        </Modal>
        <div className="row">
          <div className="col-lg-6">
            <div className="bg-white2 p-3 radius1" style={{ height: 500 }}>
              <span style={{ fontSize: 18 }} className="semi-bold">
                Edit Profile
              </span>
              <div className="light-grey-border-bottom my-3"></div>
              <div className="my-4">
                <span>Name</span>
                <Input
                  placeholder="Write Name Here"
                  className="mt-1 inputStyle"
                  value={nameValues?.name}
                  name="name"
                  onChange={handleNameChange}
                />
              </div>
              <div className="d-flex mx-5">
                <Button
                  onClick={() => handleNameUpdate()}
                  className="bg-blue white settingScreenBtns ms-2"
                >
                  Save
                </Button>
              </div>
              <div className="my-4">
                <span>Current Password</span>
                <Input.Password
                  className="mt-1 inputStyle"
                  placeholder="Write Password Here"
                  value={passValues?.password}
                  name="password"
                  onChange={handlePassChange}

                  // iconRender={(visible) =>
                  //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  // }
                />
              </div>
              <div className="my-4">
                <span>Change Password</span>
                <Input.Password
                  className="mt-1 inputStyle"
                  placeholder="Write Password Here"
                  value={passValues?.newPassword}
                  name="newPassword"
                  onChange={handlePassChange}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div className="d-flex mx-5">
                <Button
                  className="bg-blue white settingScreenBtns ms-2"
                  onClick={() => updatePassword()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
          {superUser && (
            <div className="col-lg-6 settingsSecondCard">
              <div className="bg-white2 p-3 radius1" style={{ height: 500 }}>
                <span style={{ fontSize: 18 }} className="semi-bold">
                  Assign New Admin Role
                </span>
                <div className="light-grey-border-bottom my-3"></div>
                <div className="my-4">
                  <span>Name</span>
                  <Input
                    placeholder="Write Name Here"
                    className="mt-1 inputStyle"
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="my-4">
                  <span>Email</span>
                  <Input
                    placeholder="Write Email Here"
                    className="mt-1 inputStyle"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="my-4">
                  <label>
                    <input
                      type="checkbox"
                      name="settings"
                      value="/settings"
                      onChange={handleCheckboxChange}
                    />
                    Settings
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="user-information"
                      value="/user-information"
                      onChange={handleCheckboxChange}
                    />
                    User Information
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="data-section"
                      value="/data-section"
                      onChange={handleCheckboxChange}
                    />
                    Data Section
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="payment"
                      value="/payment"
                      onChange={handleCheckboxChange}
                    />
                    Payment
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="previous-notes"
                      value="/previous-notes"
                      onChange={handleCheckboxChange}
                    />
                    Previous Notes
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="view only"
                      value="/view-only"
                      onChange={() => setIsViewOnly(!isViewOnly)}
                    />
                    View Only
                  </label>
                  <br />
                </div>

                <div className="d-flex justify-content-center">
                  <Button
                    style={{ width: "40%" }}
                    className="bg-black white settingScreenBtns"
                    onClick={handleSubmit}
                  >
                    Send Request
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {subLoading && <Loading />}
    </div>
  );
};

export default Settings;
