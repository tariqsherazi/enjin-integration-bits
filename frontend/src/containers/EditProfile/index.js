import React, { useState, useEffect } from "react";
import "./css/index.css";
import {
  ButtonComponent,
  Loader,
  NavbarComponent,
  ToastMessage,
} from "../../components";
import { Input } from "antd";
import {
  account2,
  account_dark,
  book,
  down_arrow2,
  down_arrow4,
  left_arrow,
  location2,
  location_dark2,
} from "../../assets";
import { useDispatch, useSelector } from "react-redux";

import profileimg from "../../assets/images/profile1.svg";
import { editProfileValidate } from "../../components/validations";
import { useFormik } from "formik";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "../../gql/queries";
import environment from "../../environment";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.address.userData);

  let token = localStorage.getItem("token");

  const [updateUserProfile, { loading, error, data }] =
    useMutation(UPDATE_USER_PROFILE);

  const [userId, setUserId] = useState(null);

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
      full_name: "",
      bio: null,
      country: null,
      profileImg: "",
      userAddress: "",
    },
    validate: editProfileValidate,
    onSubmit: async (values) => {
      const id = userData?.id;

      const formData = new FormData();
      formData.append("file", file);
      try {
        if (file) {
          const response = await axios.post(
            `${environment.BACKEND_BASE_URL}/upload`,
            formData
          );

          if (response) {
            updateUserProfile({
              variables: {
                updateProfileId: userId,
                userName: values.full_name,
                userAddress: values.userAddress,
                country: values.country,
                bio: values.bio,
                profileImg: response.data,
              },
              context: {
                headers: {
                  Authorization: `Bearer ${token} `,
                },
              },
            });
          }
        } else {
          updateUserProfile({
            variables: {
              updateProfileId: userId,
              full_name: values.full_name,
              userAddress: values.userAddress,
              country: values.country,
              bio: values.bio,
            },
            context: {
              headers: {
                Authorization: `Bearer ${token} `,
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (data) {
      ToastMessage("success", "Profile Updated Successfully", "success");
      setFile(null);
    }
    if (error) {
      ToastMessage("error", error?.message, "error");
    }
  }, [data, error]);

  const [city, setCity] = useState("");
  let cities = [
    "Boston, MA (USA)",
    "New York City, NYC (USA)",
    "Washington DC, Washington (USA)",
    "Boston, MA",
    "New York City, NYC",
    "Washington DC, Washington",
  ];
  let filterization = cities.filter((e) => {
    if (city) {
      if (e.includes(city)) return e;
    }
  });
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const bgColor3 = useSelector((state) => state.app.theme.bgColor3);

  useEffect(() => {
    if (userData) {
      const address = userData?.address;
      const full_name = userData?.full_name;
      const id = userData?.id;
      setUserId(id);
      setFieldValue("full_name", full_name);

      const bio = userData?.bio;
      bio && setFieldValue("bio", bio);
      const profileImg = userData?.profileImg;
      setFieldValue("profileImg", profileImg);

      setFieldValue("userAddress", address);

      const country = userData?.country;
      country && setFieldValue("country", country);
    }
  }, [userData]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const { UpdateProfile } = data;

      const address = UpdateProfile?.user_address;
      const full_name = UpdateProfile?.full_name;

      const bio = UpdateProfile?.bio;

      const profileImg = UpdateProfile?.profileImg;

      const country = UpdateProfile?.country;

      dispatch({
        type: "NFT_ADDRESS",
        userData: {
          address: address,
          full_name: full_name,
          country: country,
          bio: bio,
          profileImg: profileImg,
          id: userId,
          isLogged: true,
        },
      });
    }
  }, [data]);

  const [previewUrl, setPreviewUrl] = useState(null);

  const [file, setFile] = useState(null);

  const profileHandle = (e) => {
    const file = e.target.files[0];

    if (file.type.startsWith("image/")) {
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      ToastMessage("Please upload an image file", "", "warning");
    }
  };

  const imgPath = environment.BACKEND_BASE_URL + "/" + values.profileImg;

  return (
    <div className={`${backgroundTheme} pb-4`}>
      {loading && <Loader content="loading" />}
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"16"}
        headerText={"Edit Profile"}
      />
      <form>
        <div className="container">
          <div
            className="d-flex mb-4"
            style={{ flexDirection: "column", alignItems: "center" }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                width={200}
                className="mt-4 mb-3"
                style={{
                  borderRadius: "50%",
                }}
              />
            ) : values.profileImg ? (
              <img
                src={imgPath}
                width={200}
                className="mt-4 mb-3"
                style={{
                  borderRadius: "50%",
                }}
              />
            ) : (
              <img src={profileimg} width={200} className="mt-4 mb-3" />
            )}

            <h5
              className="red cursor"
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              <label
                htmlFor="uploadFile"
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Change Profile Photo
              </label>
              <input
                onChange={profileHandle}
                type="file"
                style={{ display: "none" }}
                name="uploadFile"
                id="uploadFile"
                accept="image/jpeg,image/png"
              />
            </h5>
          </div>
          <div style={{ border: "1px solid #272727" }}></div>
          <div
            className="d-flex justify-content-between mt-4 mb-4"
            style={{ alignItems: "center" }}
          >
            <h5 className={`m-0 ${textColor} semi-regular`}>
              Account Information
            </h5>
            <h5 className="red-gradient-color  ">Edit</h5>
          </div>
          <div className="my-3">
            <p className={`${textColor2} ms-3`} style={{ marginBottom: -5 }}>
              Name
            </p>
            <div className={bgColor3} style={{ borderRadius: 10 }}>
              <div className="mt-3">
                <img
                  src={textColor === "white" ? account2 : account_dark}
                  className="ms-4 mt-3"
                  style={{ width: 15, position: "absolute", zIndex: 1 }}
                />
              </div>
              <Input
                name="full_name"
                value={values.full_name}
                onChange={(e) => {
                  setFieldValue("full_name", e.target.value);
                }}
                className="editProfileInput"
              />
            </div>
            {touched.full_name && errors.full_name && (
              <p className="text-white">{errors.full_name}</p>
            )}
          </div>

          <div className="my-3">
            <p className={`${textColor2} ms-3`}>Bio</p>
            <div
              className={`d-flex justify-content-between ${bgColor3}`}
              style={{
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <div>
                  <img
                    src={book}
                    className="ms-4 mt-3"
                    style={{ width: 15, position: "absolute", zIndex: 1 }}
                  />
                </div>
                <Input
                  name="bio"
                  value={values.bio}
                  onChange={(e) => {
                    setFieldValue("bio", e.target.value);
                  }}
                  maxLength={150}
                  className="editProfileInput"
                  style={{ width: "100%" }}
                />
              </div>
              <span className="red me-3">
                {values?.bio && values?.bio?.length
                  ? values?.bio?.length + "/150"
                  : "0/150"}
              </span>
            </div>
          </div>
          <div className="my-3">
            <p className={`${textColor2} ms-3`}>Country</p>
            <div
              className={`d-flex justify-content-between ${bgColor3}`}
              style={{
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <div>
                  <img
                    src={textColor === "white" ? location2 : location_dark2}
                    className="ms-4 mt-3"
                    style={{ width: 15, position: "absolute", zIndex: 1 }}
                  />
                </div>
                <Input
                  placeholder="country"
                  className="editProfileInput"
                  value={values.country}
                  onChange={(e) => {
                    setFieldValue("country", e.target.value);
                  }}
                  style={{ width: "100%" }}
                />
              </div>
              <img
                src={textColor === "white" ? down_arrow2 : down_arrow4}
                className="me-3"
                style={{ width: 20 }}
              />
            </div>
          </div>
          <div>
            {filterization.map((e, i) => {
              return (
                <div
                  className="d-flex justify-content-between p-4"
                  style={{ borderBottom: "1px solid #272727" }}
                  key={i}
                >
                  <span className="light-grey">{e}</span>
                  <img src={left_arrow} className="" style={{ width: 10 }} />
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center mt-5 mb-3">
            <Link to="/collections">
              <div style={{ width: 280 }} className="me-3">
                <ButtonComponent radius={5} text={"Cancel"} />
              </div>
            </Link>
            <div style={{ width: 280 }} className="ms-3">
              <ButtonComponent
                radius={5}
                green
                text={"Save"}
                onClick={handleSubmit}
                disabled={!values.userAddress || !values.full_name}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
