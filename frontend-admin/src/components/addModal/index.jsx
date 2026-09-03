import { Input, Modal } from "antd";
import "./css/index.css";
import moment from "moment";
import { CREATE_TOP_NFT } from "../../gql/mutations";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const AddModal = ({
  showModal,
  handleCancel,
  handleOk,
  isModalOpen,
  refetch,
}) => {
  const [CreateTopNft, { data, loading, error }] = useMutation(CREATE_TOP_NFT);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
    resetForm,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      nft_link: "",
      duration: new Date(),
    },
    validate: (values) => {
      const currentDateInSeconds = Math.floor(new Date().getTime() / 1000);
      const duration = moment(values.duration?.$d || values.duration).unix();
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
      const unixTimestamp = moment(
        values.duration?.$d || values.duration
      ).unix();

      values.duration = unixTimestamp;
      values.nft_id = values.nft_link.substring(
        values.nft_link.lastIndexOf("/") + 1
      );

      const variables = {
        ...values,
      };
      CreateTopNft({
        variables: variables,
      });
    },
  });

  useEffect(() => {
    if (data) {
      refetch();
      handleCancel();
      resetForm();
    }
  }, [data]);

  return (
    <>
      <Modal
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          resetForm();
          handleCancel();
        }}
        centered
        footer={false}
        width={440}
        className="edit-modal"
      >
        <div className="modal-wrapper">
          <div className="inner-div mt-3">
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
          <div className="inner-div">
            <h4 className="main-text">Duration</h4>

            <DatePicker
              showTimeSelect
              dateFormat="Pp"
              className="modal-datepicker"
              selected={values.duration}
              onChange={(date) => {
                setFieldValue("duration", date);
                setFieldTouched("duration", true);
              }}
              onBlur={(e) => handleBlur(e)}
            />
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

export default AddModal;
