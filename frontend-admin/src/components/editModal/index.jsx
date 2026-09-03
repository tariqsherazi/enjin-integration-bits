import { Input, Modal } from "antd";
import "./css/index.css";
import moment from "moment";
import { format } from "date-fns";
import { CREATE_TOP_NFT, EDIT_TOP_NFT } from "../../gql/mutations";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const EditModal = ({
  showModal,
  handleCancel,
  handleOk,
  isModalOpen,
  obj,
  refetch,
  setObj,
}) => {
  // use this in add model
  const [CreateTopNft, { data, loading, error }] = useMutation(CREATE_TOP_NFT);
  const [startDate, setStartDate] = useState(new Date());
  const [EditTopNft, { data: edit }] = useMutation(EDIT_TOP_NFT);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      nft_link: "",
      duration: startDate,
    },
    validate: (values) => {
      const currentDateInSeconds = Math.floor(new Date().getTime() / 1000);
      const duration = moment(values.duration).unix();
      const nftUrl = /\/collections\/[a-zA-Z0-9]{24}$/;
      const errors = {};
      if (!values.nft_link) {
        errors.nft_link = "required";
      } else if (!nftUrl.test(values.nft_link)) {
        errors.nft_link = "Invalid URL";
      }
      if (!values.duration) {
        errors.duration = "required";
      } else if (values.duration && duration < currentDateInSeconds) {
        errors.duration =
          "duration Should be Greater Than Current Date And Time";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const unixTimestamp = moment(values.duration).unix();

      values.duration = unixTimestamp;
      values.nft_id = values.nft_link.substring(
        values.nft_link.lastIndexOf("/") + 1
      );

      //  will use in add modal

      // const variables = {
      //   ...values,
      // };

      // CreateTopNft({
      //   variables: variables,
      // });

      const variables = {
        ...values,
        id: obj.id,
      };
      EditTopNft({
        variables: variables,
      });
    },
  });

  useEffect(() => {
    if (obj?.id) {
      setFieldValue("nft_link", obj.nft_link);
      const dateObj1 = new Date(Number(obj?.duration) * 1000);
      const utcDate1 = new Date(
        Date.UTC(
          dateObj1.getUTCFullYear(),
          dateObj1.getUTCMonth(),
          dateObj1.getUTCDate(),
          dateObj1.getUTCHours(),
          dateObj1.getUTCMinutes()
        )
      );

      setFieldValue("duration", utcDate1);
    }
  }, [obj]);

  useEffect(() => {
    if (edit) {
      refetch();
      handleCancel();
    }
  }, [edit]);

  return (
    <>
      <Modal
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          resetForm();
          setObj(null);
          handleCancel();
        }}
        centered
        footer={false}
        // width={440}
        className="edit-modal"
      >
        <div className="modal-wrapper">
          <div className="inner-div">
            <h4 className="main-text">NFT Url</h4>
            <Input
              type="text"
              name="nft_link"
              placeholder="www.nft.com/1234"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.nft_link}
              style={{ width: "100%" }}
            />
          </div>
          <p className="error-msg">
            {touched?.nft_link && errors?.nft_link && errors?.nft_link}
          </p>
          <div className="info">
            <div className="inner-div">
              <h4 className="main-text">Duration</h4>

              <DatePicker
                className="modal-datepicker"
                showTimeSelect
                dateFormat="Pp"
                selected={values?.duration}
                onChange={(date) => {
                  setFieldValue("duration", date);
                  setFieldTouched("duration", true);
                }}
                onBlur={(e) => handleBlur(e)}
              />
            </div>
          </div>
          <p className="error-msg">
            {touched?.duration && errors?.duration && errors?.duration}
          </p>
          <button className="confirm-btn" onClick={() => handleSubmit()}>
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
