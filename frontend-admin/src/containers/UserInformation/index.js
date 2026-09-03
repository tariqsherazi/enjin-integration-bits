import React, { useEffect, useState } from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import {
  filter,
  menu_icon2,
  plus,
  profile,
  sort,
  profile2,
  search,
} from "../../assets";
import { Table, Dropdown, Menu, Button, Space, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CONTACTS } from "../../gql/queries";
import { SEND_EMAIL_MUTATION } from "../../gql/mutations";
import environment from "../../environment";
import Loading from "../../components/loaders/loading";
import ToastMessage from "../../components/toastMessage";
import { useSelector } from "react-redux";

const UserInformation = () => {
  const [searchUser, setSearchUser] = useState(null);
  const [users, setUsers] = useState([]);
  const {viewOnly } = useSelector((state) => state.adminDetails.adminDetails);

  const {
    loading,
    error,
    data: contactData,
    refetch,
  } = useQuery(GET_ALL_CONTACTS);

  const [
    sendEmail,
    { data: emailData, loading: emailLoading, error: emailError },
  ] = useMutation(SEND_EMAIL_MUTATION);

  const navigate = useNavigate();
  const columns = [
    {
      title: "Name",
      dataIndex: "user_name",
      render: (values, record) => {
        const imgPath = environment.BACKEND_BASE_URL + "/" + record?.profileImg;

        return (
          <div className="d-flex center">
            <img src={record?.profileImg ? imgPath : profile2} width={50} />
            <div className="ms-3">
              <span className="semi-bold black">{record.user_name}</span>
              <p className="light-grey m-0">Updated 1 day ago</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (values, record) => {
        return (
          <div className="d-flex center">
            {record.email ? record.email : "-"}
          </div>
        );
      },
    },
    {
      title: "Contact Info",
      dataIndex: "phone_number",
      align: "center",

      render: (values, record) => {
        return (
          <p className=" ">{record.phone_number ? record.phone_number : "-"}</p>
        );
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      align: "center",
      render: (values, record) => {
        return <p className=" ">{record.country ? record.country : "-"}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (value, record, index) => {
        return (
          <Button
            className="bg-blue white"
            style={{ borderRadius: 20, width: "70%" }}
            disabled={viewOnly}
            onClick={async () => {
              const result = await sendEmail({
                variables: {
                  to: record.email,
                  from: environment.EMAIL_OWNER,
                  subject: "Test email",
                  text: "This is a test email",
                },
              });
            }}
          >
            Send Notifications
          </Button>
        );
      },
    },
    {
      title: "",
      dataIndex: "icon",
      render: (value, record) => {
        return (
          <Dropdown
          disabled={viewOnly}

          className="ms-4" overlay={profileMenu(record?.id)}>
            <img
              style={{ cursor: "pointer" }}
              className="p-2"
              src={menu_icon2}
            />
          </Dropdown>
        );
      },
    },
  ];
  const data = [
    {
      key: "1",
      name: "Snap",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "Pakistan",
    },
    {
      key: "2",
      name: "Haily",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "USA",
    },
    {
      key: "3",
      name: "Haily",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "USA",
    },
    {
      key: "4",
      name: "Haily",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "USA",
    },
    {
      key: "5",
      name: "Haily",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "USA",
    },
  ];
  const mobileviewcolumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: () => <img src={profile} />,
    },
    {
      title: "Details",
      dataIndex: "details",
      render: () => (
        <Button
          className="bg-blue white"
          style={{ borderRadius: 20, width: "100%" }}
        >
          Send Notifications
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: (value, record) => {
        console.log("value", value, record);
        return (
          <Dropdown className="ms-4" overlay={profileMenu(record?.id)}>
            <img
              style={{ cursor: "pointer" }}
              className="p-2"
              src={menu_icon2}
            />
          </Dropdown>
        );
      },
    },
  ];

  const menu = (
    <Menu
      onClick={(e) => console.log(e)}
      items={[
        {
          label: "Creators",
          key: "1",
        },
        {
          label: "Buyers",
          key: "2",
        },
      ]}
    />
  );

  const profileMenu = (id) => (
    <Menu
      onClick={(e) => {
        e.key === "1" && navigate(`user-profile/${id}`); // Pass the id to the navigation URL
        console.log(e);
      }}
      items={[
        {
          label: "See Profile",
          key: "1",
        },
        {
          label: "Delete",
          key: "2",
        },
        {
          label: "Block",
          key: "3",
        },
      ]}
    />
  );

  useEffect(() => {
    if (emailData) {
      ToastMessage(
        "Email Send Successfully",
        "Email Send Successfully",
        "success"
      );
    }
    if (emailError) {
      ToastMessage(emailError.message, emailError.message, "error");
    }
  }, [emailData, emailError]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (contactData?.GetAllUsers) {
      let temp = contactData?.GetAllUsers;

      if (searchUser) {
        temp = temp.filter((x) =>
          x?.user_name?.toLowerCase()?.startsWith(searchUser?.toLowerCase())
        );
      }
      setUsers(temp);
    }
  }, [searchUser, contactData?.GetAllUsers]);

  return (
    <div className="bg-white2">
      {emailLoading && <Loading content="" />}
      <NavbarComponent
        lightNav
        headerTxt={"User Information"}
        selectedKey={"2"}
      />

      <div
        className="container py-3 bg-white radius1"
        style={{ marginTop: 65 }}
      >
        <div className="d-flex searchStyle headerStyle bg-dark-blue3">
          <img className="cursor" style={{ width: 15 }} src={search} />
          <Input
            value={searchUser}
            onChange={(e) => {
              setSearchUser(e.target.value);
            }}
            placeholder="Search ..."
            className={`searchStyle bg-dark-blue3`}
          />
        </div>
        <div className="d-flex p-4 justify-content-between center">
          <h5 className="m-0">Creators</h5>
          <div className="d-flex center">
            <div>
              <div className="ms-4 mt-1 optionsMobView">
                <img src={sort} className="me-2" />
                <span className="purple">Sort</span>
              </div>
            </div>
            <div>
              <Dropdown className="ms-4" overlay={menu}>
                <Button className="dropdowmStyle">
                  <Space>
                    Creator
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <div className="ms-4 mt-1 optionsMobView">
                <img src={filter} className=" me-2" />
                <span className="purple">Filter</span>
              </div>
            </div>
            <div className="ms-4 optionsWebView">
              <img src={sort} className="me-2" />
              <span className="purple">Sort</span>
            </div>
            <div className="ms-4 optionsWebView">
              <img src={filter} className=" me-2" />
              <span className="purple">Filter</span>
            </div>
          </div>
        </div>

        <div className="mx-2 webtable px-3">
          <Table columns={columns} dataSource={users} />
        </div>
        <div className="mx-2 mobtable">
          <Table columns={mobileviewcolumns} dataSource={users} />
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
