import React, { useMemo, useRef, useState } from "react";
import "./css/index.css";
import { Modal } from "antd";
import { attachment, cross2, save, upload2 } from "../../assets";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Input } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_NOTES_MUTATION } from "../../gql/mutations";
import environment from "../../environment";
import { useFormik } from "formik";
import axios from "axios";
import Loading from "../loaders/loading";
import ToastMessage from "../toastMessage";

const TextEditorModal = ({ id, visible, onCancel, setIsNotesAdded }) => {
  const [
    addNotes,
    { loading: notesLoading, error: notesError, data: allNotes },
  ] = useMutation(ADD_NOTES_MUTATION);

  const [editorData, setEditorData] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);


  const [file, setFile] = useState(null);

  const hiddenFileInput = useRef(null);

  const uploadHandle = (event) => {
    hiddenFileInput.current.click();
  };

  const profileHandle = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

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
      const formData = new FormData();
      formData.append("file", file);
      try {
        let response;
        if (file) {
          setImageLoader(true);
          response = await axios.post(
            `${environment.BACKEND_BASE_URL}/upload`,
            formData
          );
          setImageLoader(false);
        }

        const result = await addNotes({
          variables: {
            values: {
              id: id,
              title: values.title,
              description: values.description,
              noteImg: response && response?.data,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  useMemo(() => {
    if (allNotes) {
      ToastMessage("Notes added successfully", " ", "success");
      resetForm("");
      setIsNotesAdded(true);
      setEditorData(null);
      onCancel();
    }

    if (notesError) {
      ToastMessage(notesError.message, " ", "error");
    }
  }, [allNotes, notesError]);

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
          <span className="red m-0 red-border-bottom cursor">{`See Previous Notes >>`}</span>
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
      {imageLoader && <Loading content="image Uploading" />}
      {notesLoading && <Loading content="Processing" />}

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
      <div className="mt-4">
        <Button className="bg-white2 white radius1">
          <img src={attachment} />
          <span className="light-grey2 ms-2">Add Attachement</span>
        </Button>
        <Button className="bg-white2 white radius1 ms-3">
          <img src={upload2} />
          <span className="light-grey2 ms-2" onClick={uploadHandle}>
            Upload Image
          </span>
          <input
            ref={hiddenFileInput}
            onChange={profileHandle}
            type="file"
            style={{ display: "none" }}
            name="uploadFile"
            id="uploadFile"
            accept="image/jpeg,image/png"
          />
        </Button>
      </div>
    </Modal>
  );
};

export default TextEditorModal;
