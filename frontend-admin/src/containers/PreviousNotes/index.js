import React, { useMemo, useState } from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { delete_icon, plus4, profile } from "../../assets";
import {
  GET_ALL_ADMIN_NOTES,
  GET_ALL_NOTES_BY_ADMIN_ID,
} from "../../gql/queries";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import AdminNotesModal from "../../components/adminNotesModal";
import { DELETE_NOTE_BY_ID } from "../../gql/mutations";
import ToastMessage from "../../components/toastMessage";
import Loading from "../../components/loaders/loading";

const PreviousNotes = () => {
  const { id,viewOnly } = useSelector((state) => state.adminDetails.adminDetails);
  const [notesModal, setnotesModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);
  const [viewType, setViewType] = useState("1");
  const [deleteNoteById] = useMutation(DELETE_NOTE_BY_ID);
  console.log("viewOnly",viewOnly)
  const menuItems = [
    {
      label: "All Notes",
      key: "1",
    },
    {
      label: "My Notes",
      key: "2",
    },
    {
      label: "All Public Notes",
      key: "3",
    },
  ];

  const handleMenuClick = (e) => {
    setViewType(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  const { data: allNotesData, refetch: refetchAllNotes } =
    useQuery(GET_ALL_ADMIN_NOTES);
  const { data: notesByAdminIdData, refetch: refetchAdminNotes } = useQuery(
    GET_ALL_NOTES_BY_ADMIN_ID,
    {
      variables: { admin_id: id }, // Replace with the actual admin ID
    }
  );
  const uniqueData = useMemo(() => {
    if (notesByAdminIdData && allNotesData && viewType === "1") {
      const temp = [];
      const idSet = new Set();

      // Add array1 elements to the result
      for (const item of notesByAdminIdData?.getAllNoteByAdminId) {
        idSet.add(item.id);
        temp.push(item);
      }

      // Check array2 elements for uniqueness
      for (const item of allNotesData?.getAllAdminNotes) {
        if (!idSet.has(item.id)) {
          temp.push(item);
        }
      }

      return temp?.reverse();
    } else if (viewType === "2" && notesByAdminIdData) {
      return notesByAdminIdData?.getAllNoteByAdminId;
    } else if (viewType === "3" && allNotesData) {
      console.log(
        "allNotesData?.getAllAdminNotes",
        allNotesData?.getAllAdminNotes
      );
      return allNotesData?.getAllAdminNotes;
    }
  }, [notesByAdminIdData, allNotesData, viewType]);

  const handleDeleteNote = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await deleteNoteById({ variables: { id: id } });
      console.log(data);
      // Handle the response data or perform any additional actions
      if (data) {
        refetchAdminNotes();
        refetchAllNotes();
        ToastMessage("Notes Deleted Successfully", "", "success");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      if (error?.message) {
        ToastMessage(error.message, "", "error");
      }
      // Handle errors
    }
  };

  return (
    <div className="bg-white2">
      {!uniqueData && <Loading />}
      {isLoading && <Loading />}

      <NavbarComponent
        lightNav
        headerTxt={"Previous Notes"}
        selectedKey={"6"}
      />
      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        <div className="d-flex justify-content-between">
          <h5>All Previous Notes</h5>
          <div style={{ display: "flex" }}>
            {" "}
            <Dropdown overlay={menu}>
              <Button className="dropdownStyle">
                <Space>
                  {viewType
                    ? menuItems.find((item) => item.key === viewType)?.label
                    : "Button"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Button
            disabled={viewOnly}
              className="notesBtn px-4 d-flex center  ms-3"
              onClick={() => setnotesModal(!notesModal)}
            >
              <img src={plus4} />
              <span className="ms-2">Add New Note</span>
            </Button>
          </div>
        </div>
        <div className="light-grey-border-bottom my-3"></div>
        {uniqueData?.map((e, i) => {
          return (
            <>
              <div
                key={i}
                className="bg-white2 radius1 p-3 my-1 d-flex center notesView"
              >
                <div className="d-flex center">
                  <img src={profile} style={{ width: 80 }} />
                  <div className="ms-2">
                    <h5 className="m-0">{e?.admin_id?.name}</h5>
                    <p className="light-grey mb-1">{e?.title}</p>
                    <Button
                      onClick={() => {
                        if (openDesc === i) {
                          setOpenDesc(null);
                        } else {
                          setOpenDesc(i);
                        }
                      }}
                      className="readBtn px-4"
                    >
                      {openDesc === i ? "Close" : "Read"}
                    </Button>
                  </div>
                </div>
                {e?.admin_id?._id === id && (
                  <div
                    className="d-flex center addNotes"
                    onClick={() => handleDeleteNote(e?.id)}
                  >
                    <img className="ms-4 me-1 cursor" src={delete_icon} />
                  </div>
                )}
              </div>
              {openDesc === i && (
                <div
                  key={i}
                  className="bg-white2 radius1 p-3  d-flex center notesView"
                  style={{ marginTop: "-10px" }}
                >
                  <div className="d-flex center">
                    <h5 className="m-0">{e?.description}</h5>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

      <AdminNotesModal
        id={id}
        visible={notesModal}
        onCancel={() => setnotesModal(!notesModal)}
        refetch={() => {
          refetchAllNotes();
          refetchAdminNotes();
        }}
      />
    </div>
  );
};

export default PreviousNotes;
