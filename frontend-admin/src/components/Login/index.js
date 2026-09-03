import React, { useEffect } from "react";
import { logo2 } from "../../assets";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { ADMIN_LOGIN } from "../../gql/queries";
import { useLazyQuery } from "@apollo/client";
import { useFormik } from "formik";
import ToastMessage from "../toastMessage";
import { signInValidate } from "../../validations";

function Login() {
  const navigate = useNavigate();

  // login
  const [login, { loading, error: loginError, data: loginData }] = useLazyQuery(
    ADMIN_LOGIN,
    {
      fetchPolicy: "network-only",
    }
  );

  const { handleSubmit, values, touched, errors, resetForm, setFieldValue } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: signInValidate,

      onSubmit: async (values) => {
        try {
          console.log("values", values);
          const data = await login({
            variables: {
              email: values.email,
              password: values.password,
            },
          });

          console.log(data);
        } catch (e) {
          console.error(e);
        }
      },
    });

  useEffect(() => {
    if (loginData) {
      resetForm();

      const { AdminLogin } = loginData;

      localStorage.setItem("adminToken", AdminLogin?.token);
      localStorage.setItem("adminEmail", AdminLogin?.email);
      navigate("/");
      ToastMessage("Welcome to BITS dashboard", "", "success");
    }
    if (loginError) {
      ToastMessage("Sign in Error", loginError?.message, "error");
    }
  }, [loginData, loginError]);

  return (
    <div style={{ background: "black", minHeight: "100vh" }}>
      <div className="container loginContainer py-4">
        <img src={logo2} className="logoSize mb-5" />
        <div className="d-flex formMobView" style={{ width: "100%" }}>
          <div className="formContainer">
            <form autoComplete="off">
              <div className="d-flex justify-content-center mb-5">
                <span className="ms-4 semi-bold fs-5">Sign in</span>
              </div>
              <div className="mb-3">
                <Input
                  placeholder={"E-mail"}
                  name="email"
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  value={values.email}
                  autoComplete="off"
                />
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Input
                  type="password"
                  placeholder={"Password"}
                  name="password"
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  value={values.passowrd}
                  autoComplete="new-password"
                  className="mt-3"
                />

                {touched.password && errors.password && (
                  <p>{errors.password}</p>
                )}
              </div>

              <div className="d-flex justify-content-center my-5">
                <Button onClick={handleSubmit}>Sign in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
