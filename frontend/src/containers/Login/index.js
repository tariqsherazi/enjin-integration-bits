import React, { useEffect, useState } from "react";
import { logo } from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import {
  ButtonComponent,
  CustomCheckbox,
  InputComponent,
  ToastMessage,
} from "../../components";
import "./css/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../../components/loaders/loading";
import { signInSchema, signUpSchema } from "../../components/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_USER, GET_PLAYER } from "../../gql/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_USER } from "../../gql/mutations";
import ConnectModal from "../../components/connectModal";

function Login() {
  const dispatch = useDispatch();

  const { web3, account } = useSelector((state) => state.web3.walletData);
  console.log(" loginn", web3, account);
  const [connectModal, setConnectModal] = useState(false);

  // sign in checkbox
  const [rememberCheckbox, setRememberCheckbox] = useState(false);

  // sign up checkbox
  const [signUpAgreeCheckbox, setSignUpAgreeCheckbox] = useState(false);
  
  let navigate = useNavigate();
  
  //login
  const {
    register,
    handleSubmit,
    setValue,
    watch: signWatch,
    formState: { errors },
    reset: signInResetValue,
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const [login, { loading, error: loginError, data: loginData }] = useLazyQuery(
    LOGIN_USER,
    {
      fetchPolicy: "network-only",
    }
  );

  const loginUser = (values) => {
    login({
      variables: {
        email: values.email,
        password: values.password,
      },
    }).catch((err) => {
      console.log("errr", err);
    });
  };
  function onSubmit(data) {
    loginUser(data);
  }

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  useEffect(() => {
    if (loginData) {
      // need to check if LoginUser has linkingInfo
      signInResetValue();

      const { LoginUser } = loginData;
      const { user_address, id, token, full_name, country, bio, profileImg } =
        LoginUser;
      localStorage.setItem("token", token);


      dispatch({
        type: "NFT_ADDRESS",
        userData: {
          address: user_address,
          full_name: full_name,
          country: country,
          bio: bio,
          profileImg: profileImg,
          id,
          token,
          isLogged: true,
        },
      });
      navigate("/");
    }
    if (loginError) {
      ToastMessage("Sign in Error", loginError?.message, "error");
    }
  }, [loginData, loginError]);

  // login

  // signUp

  const {
    register: signUpRegister,
    handleSubmit: signUpSubmit,
    setValue: signUpSetValue,
    formState: { errors: signUpFormError },
    watch,
    reset: signUpResetValue,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      user_name: "",
      full_name: "",
      email: "",
    },
  });

  const [
    createUser,
    { loading: signUpLoading, error: singUpError, data: signUpData },
  ] = useMutation(CREATE_USER);

  // signUp useEffect to check if any error

  useEffect(() => {
    if (signUpData) {
      const { CreateUser } = signUpData;
      const { user_address, id, token, user_name, country, bio, profileImg } =
        CreateUser;

      localStorage.setItem("token", token);
      dispatch({
        type: "NFT_ADDRESS",
        userData: {
          address: user_address,
          user_name: user_name,
          country: country,
          bio: bio,
          profileImg: profileImg,
          id,
          token,
          isLogged: true,
        },
      });
      navigate(`/collections/${id}`);

      signUpResetValue();
      signUpSetValue("full_name", "");
      signUpSetValue("email", "");
      signUpSetValue("user_name", "");
      ToastMessage("success", "Account Created Successfully", "success");
    }
    if (singUpError) {
      ToastMessage("error", singUpError?.message, "error");
    }
  }, [signUpData, singUpError]);

  async function signUpHandle(data) {
    const variables = {
      userName: data.user_name,
      email: data.email,
      fullName: data.full_name,
      password: data.password,
      phoneNumber: data.phone_number,
      userAddress: account,
    };

    createUser({
      variables: variables,
    });
  }

  const handleChangeSignUp = (e) => {
    signUpSetValue(e.target.name, e.target.value);
  };

  // get Player
  const [
    { loading: playerLoading },
  ] = useLazyQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const closeConnectModel = () => {
    setConnectModal(false);
  };
  const connectWalletHandle = () => {
    if (!web3) {
      setConnectModal(true);
    }
  };

  useEffect(() => {
    if (web3) {
      setConnectModal(false);
    }
  }, [web3]);

  return (
    <div style={{ background: "black" }}>
      <ConnectModal visible={connectModal} onClose={closeConnectModel} />
      {playerLoading ||
        signUpLoading ||
        (loading && <Loading content="Loading" />)}

      <div className="container loginContainer py-4">
        <img src={logo} className="logoSize mb-5" />
        <div className="d-flex formMobView" style={{ width: "100%" }}>
          <div className="formContainer">
            <form autoComplete="off">
              <div className="d-flex justify-content-center mb-5">
                <img src={account} alt="" />
                <span className="ms-4 semi-bold fs-5">Sign in</span>
              </div>
              <div className="mb-5">
                <InputComponent
                  placeholder={"E-mail"}
                  name="email"
                  ref={register}
                  onChange={handleChange}
                  value={signWatch("email")}
                  autoComplete="off"
                />
                {errors.email && <span>{errors.email.message}</span>}

                <input
                  password
                  placeholder={"Password"}
                  type="password"
                  name="password"
                  ref={register}
                  onChange={handleChange}
                  value={signWatch("password")}
                  autoComplete="new-password"
                  {...register("password")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>

              <div className="my-2 d-flex" style={{ alignItems: "center" }}>
                <CustomCheckbox
                  active={rememberCheckbox}
                  setActive={setRememberCheckbox}
                />
                <span className="ms-3 light-grey">Remember me</span>
              </div>
              <div className="my-5">
                <ButtonComponent
                  onClick={handleSubmit(onSubmit)}
                  text={"SIGN IN"}
                />
              </div>
              <div className="d-flex justify-content-center">
                <span>
                  Don't have Account?{" "}
                  <span className="red cursor">Sign Up</span>
                </span>
              </div>
            </form>
          </div>

          <div className="formContainer">
            <form>
              <div className="d-flex justify-content-center mb-5">
                <img src={account} alt="" />
                <span className="ms-4 semi-bold fs-5">Create Account</span>
              </div>
              <div className="mb-5">
                <InputComponent
                  placeholder={"Full Name"}
                  name="full_name"
                  ref={signUpRegister}
                  value={watch("full_name")}
                  onChange={handleChangeSignUp}
                  autocomplete="off"
                />
                {signUpFormError.full_name && (
                  <span>{signUpFormError.full_name.message}</span>
                )}
                <InputComponent
                  placeholder={"User Name"}
                  ref={signUpRegister}
                  name="user_name"
                  value={watch("user_name")}
                  onChange={handleChangeSignUp}
                  autocomplete="off"
                />
                {signUpFormError.user_name && (
                  <span>{signUpFormError.user_name.message}</span>
                )}
                <InputComponent
                  placeholder={"E-mail"}
                  ref={signUpRegister}
                  name="email"
                  value={watch("email")}
                  onChange={handleChangeSignUp}
                  autocomplete="off"
                />
                {signUpFormError.email && (
                  <span>{signUpFormError.email.message}</span>
                )}
                <InputComponent
                  password
                  placeholder={"Password"}
                  ref={signUpRegister}
                  name="password"
                  value={watch("password")}
                  onChange={handleChangeSignUp}
                  autocomplete="off"
                />
                {signUpFormError.password && (
                  <span>{signUpFormError.password.message}</span>
                )}
                <InputComponent
                  placeholder={"Phone number"}
                  ref={signUpRegister}
                  name="phone_number"
                  value={watch("phone_number")}
                  onChange={handleChangeSignUp}
                  autocomplete="off"
                />
                {signUpFormError.phone_number && (
                  <span>{signUpFormError.phone_number.message}</span>
                )}
              </div>

              <div className="my-2 d-flex" style={{ alignItems: "center" }}>
                <CustomCheckbox
                  active={signUpAgreeCheckbox}
                  setActive={setSignUpAgreeCheckbox}
                />
                <Link to="/privacy-security">
                  <span className="ms-3 light-grey">
                    I agree to <span className="red">BITS’s</span>{" "}
                    <span style={{ color: "blue" }}>Terms & Conditions</span>
                  </span>
                </Link>
              </div>

              <div className="my-5">
                {!web3 ? (
                  <ButtonComponent
                    onClick={() => {
                      connectWalletHandle();
                    }}
                    text={"CONNECT WALLET"}
                  />
                ) : (
                  <ButtonComponent
                    onClick={signUpSubmit(signUpHandle)}
                    text={"CREATE ACCOUNT"}
                    disabled={!signUpAgreeCheckbox}
                  />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <span>
                  Already have Account?{" "}
                  <span className="red cursor">Login</span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
