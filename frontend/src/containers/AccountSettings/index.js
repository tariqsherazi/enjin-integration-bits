import React, { useEffect } from "react";
import "./css/index.css";
import {
  ButtonComponent,
  Loader,
  NavbarComponent,
  ToastMessage,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { UPDATE_EMAIL, UPDATE_PASSWORD_MUTATION } from "../../gql/mutations";
import { useFormik } from "formik";
import { Input } from "antd";
import { emailValidate, passwordValidate } from "../../components/validations";
import { logoutWallet } from "../../store/actions";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.address.userData);

  const username = userData?.user_name;

  let token = localStorage.getItem("token");

  const [updatePassword, { loading, error, data }] = useMutation(
    UPDATE_PASSWORD_MUTATION
  );

  const [
    updateEmail,
    { loading: emailLoading, error: emailError, data: emailData },
  ] = useMutation(UPDATE_EMAIL);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validate: passwordValidate,

    onSubmit: async (values) => {
      try {
        console.log("values", values);
        const { data } = await updatePassword({
          variables: {
            password: values.password,
            newPassword: values.newPassword,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token} `,
            },
          },
        });
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    },
  });

  const {
    handleSubmit: emailHandleSubmit,
    handleChange: emailHandleChange,
    handleBlur: emailHandleBlur,
    values: emailValue,
    touched: emailTouched,
    errors: emailErrors,
    setFieldValue: emailSetFieldValue,
  } = useFormik({
    initialValues: {
      newEmail: "",
      password: "",
    },
    validate: emailValidate,
    onSubmit: async (values) => {
      try {
        const { data } = await updateEmail({
          variables: {
            password: values.password,
            newEmail: values.newEmail,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token} `,
            },
          },
        });
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    },
  });

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      ToastMessage("Updated Successfully", "", "success");
      dispatch({
        type: "USER_AUTH_RESET",
        userData: {
          address: "",
          user_name: "",
          country: "",
          bio: "",
          profileImg: "",
          id: "",
          token: "",
        },
      });
      localStorage.removeItem("token");
      dispatch(logoutWallet());
      navigate("/login");
    }
    if (error) {
      ToastMessage(error.message, "", "error");
    }
  }, [error, data]);

  useEffect(() => {
    if (emailData) {
      ToastMessage("Updated Successfully", "", "success");

      dispatch({
        type: "USER_AUTH_RESET",
        userData: {
          address: "",
          user_name: "",
          country: "",
          bio: "",
          profileImg: "",
          id: "",
          token: "",
        },
      });
      localStorage.removeItem("token");
      dispatch(logoutWallet());
      navigate("/login");
    }
    if (emailError) {
      ToastMessage("error", emailError.message, "error");
    }
  }, [emailError, emailData]);

  return (
    <div className={`${backgroundTheme} pb-4`} style={{ minHeight: "100vh" }}>
      {loading && <Loader content={"Updating"} />}
      {emailLoading && <Loader content={"Email Updating"} />}

      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"11"}
        headerText={"Account Settings"}
      />
      <div className="container">
        <h4
          className="white semi-bold red-gradient-color mb-5 mt-3"
          style={{ textAlign: "center" }}
        >
          {username}
        </h4>
        <div style={{ border: "1px solid #272727" }}></div>

        <div>
          <div
            className="d-flex justify-content-between"
            style={{ alignItems: "center", marginTop: 40 }}
          >
            <h5 className={`m-0 ${textColor} semi-regular`}>
              User Credentials
            </h5>
            <h5 className="red-gradient-color cursor">Edit</h5>
          </div>
          {/* <LabelInput label={"Change Email"} /> */}
          <div className="d-flex mt-3">
            <span className="red inputLabel"> Current Password</span>
            <Input.Password
              className={`labelInputStyle ${textColor2} me-5`}
              placeholder={"Please Enter Current Password"}
              value={emailValue.password}
              visibilityToggle={false}
              onChange={(e) => {
                emailSetFieldValue("password", e.target.value);
              }}
              onBlur={emailHandleBlur}
              autoComplete="off"
            />
          </div>

          {emailErrors.password && emailTouched.password && (
            <div className="error text-center text-white">
              {emailErrors.password}
            </div>
          )}

          <div className="d-flex">
            <span className="red inputLabel"> Change Email</span>
            <Input
              className={`labelInputStyle ${textColor2} me-5`}
              placeholder={"Please Enter New Email"}
              type="text"
              value={emailValue.newEmail}
              onChange={(e) => {
                emailSetFieldValue("newEmail", e.target.value);
              }}
              onBlur={emailHandleBlur}
              autoComplete="off"
            />
          </div>

          {emailErrors.newEmail && emailTouched.newEmail && (
            <div className="error text-center text-white">
              {emailErrors.newEmail}
            </div>
          )}

          <div className=" d-flex justify-content-center">
            <div className="mt-4 saveBtn">
              <ButtonComponent
                text={"Update"}
                onClick={emailHandleSubmit}
                height={40}
              />
            </div>
          </div>

          <div className="d-flex mt-3">
            <span className="red inputLabel">Current Password</span>
            <Input.Password
              className={`labelInputStyle ${textColor2} me-5`}
              placeholder={"Please Enter Current Password"}
              value={values.password}
              visibilityToggle={false}
              onChange={(e) => {
                console.log("password", e.target.value);
                setFieldValue("password", e.target.value);
              }}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
          {errors.password && touched.password && (
            <div className="error text-center text-white">
              {errors.password}
            </div>
          )}
          <div className="d-flex">
            <span className="red inputLabel"> New Password</span>
            <Input.Password
              className={`labelInputStyle ${textColor2} me-5`}
              placeholder={"Please Enter New Password"}
              onChange={(e) => {
                setFieldValue("newPassword", e.target.value);
              }}
              visibilityToggle={false}
              name="newPassword"
              value={values.newPassword}
              autoComplete="off"
            />
          </div>
          {errors.newPassword && touched.newPassword && (
            <div className="error text-center text-white">
              {errors.newPassword}
            </div>
          )}
        </div>
        <div className=" d-flex justify-content-center">
          <div className="mt-4 saveBtn">
            <ButtonComponent text={"Save"} onClick={handleSubmit} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
