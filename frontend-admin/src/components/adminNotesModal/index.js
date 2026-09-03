import React, { useRef, useState } from "react";
import "./css/index.css";
import { Modal } from "antd";
import { cross2, save } from "../../assets";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Input } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_ADMIN_NOTES } from "../../gql/mutations";
import { useFormik } from "formik";
import ToastMessage from "../toastMessage";
import { Switch } from 'antd';

const AdminNotesModal = ({id,visible, onCancel, refetch }) => {
  const [createAdminNotes] = useMutation(CREATE_ADMIN_NOTES);

  const [editorData, setEditorData] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validate: null,
    onSubmit: async (values) => {
      try {
        const { data } = await createAdminNotes({
          variables: {
            title: values?.title,
            description: values?.description,
            admin_id: id.toString(),
            is_public: isPublic,
          },
        });
        console.log("data", data);
        if (data) {
          setEditorData(null)
          resetForm()
          refetch();
          onCancel();
          ToastMessage("Notes added successfully", " ", "success");
        }
      } catch (error) {
        console.log(error);
        if (error && error?.message) {
          ToastMessage(error.message, " ", "error");
        }
      }
    },
  });

  const onChange = (checked) => {
    setIsPublic(checked)
  };

  return (
    <Modal
      title={
        <div className="bg-dark-blue d-flex justify-content-between center p-3">
          <h5 className="white m-0">+ Add New Note</h5>
          <div className="d-flex center">
            <div className="cursor">
              <img src={save} />
              <span className="blue ms-2">Save Note</span>
            </div>
            <img src={cross2} className="ms-4" />
          </div>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      closeIcon={<></>}
      footer={
        <div className="d-flex justify-content-between center p-3">
          <span onClick={onCancel} className="red m-0 red-border-bottom cursor">{`See Previous Notes >>`}</span>
          <Button
            className="bg-blue white radius1"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      }
      centered
      style={{ height: 400 }}
    >
      <Input
        className="modalInputStyle bg-white2 mb-3"
        placeholder="Write Title here ..."
        name="title"
        onChange={(e) => {
          setFieldValue("title", e.target.value);
        }}
        value={values.title}
      />
      <Editor
        editorState={editorData}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(editorData) => {
          console.log("editor", editorData);
          let newData = editorData?.getCurrentContent().getPlainText();
          console.log("newData", newData);
          setEditorData(editorData);
          setFieldValue("description", newData);
        }}
      />
      <p>Public</p>
      <Switch  onChange={onChange} />
    </Modal>
  );
};

export default AdminNotesModal;
