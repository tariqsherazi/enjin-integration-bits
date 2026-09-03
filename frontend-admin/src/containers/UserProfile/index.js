import React, { useEffect, useMemo, useState } from "react";
import "./css/index.css";
import { NavbarComponent, UserVideoCard } from "../../components";
import {
  left_arrow,
  plus5,
  profile_large,
  location,
  user3,
  message3,
  call,
  location_large,
  calender,
  flag,
  plus4,
  delete_icon,
  profile,
  profile2,
} from "../../assets";
import { Menu, Dropdown, Button, Space, Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import TextEditorModal from "../../components/textEditorModal";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ALL_NFTS, GET_PROFILE_DETAILS_QUERY } from "../../gql/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import environment from "../../environment";
import Loading from "../../components/loaders/loading";
import {
  DELETE_MUTATION,
  SEND_EMAIL_MUTATION,
} from "../../gql/mutations";
import ToastMessage from "../../components/toastMessage";
import { Image } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState("");
  const [userVideos, setUserVideos] = useState(true);

  const [isNotesAdded, setIsNotesAdded] = useState(false);

  function CustomExpandIcon(props) {
    const { isActive } = props;
    return (
      <div>
        <Button className="notesBtn px-3 d-flex center">
          <span className="">
            View{" "}
            <CaretRightOutlined
              style={{ transform: "translateY(-3px)" }}
              rotate={isActive ? 270 : 90}
            />
          </span>
        </Button>
      </div>
    );
  }

  const menu = (
    <Menu
      onClick={(e) => console.log(e)}
      items={[
        {
          label: "1st menu item",
          key: "1",
        },
        {
          label: "2nd menu item",
          key: "2",
        },
      ]}
    />
  );
  const notesMenu = (
    <Menu
      items={[
        {
          label: "1st menu item",
          key: "1",
        },
        {
          label: "2nd menu item",
          key: "2",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ]}
    />
  );
  let cardsData = [
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
    {
      videoUrl:
        "https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)",
      name: "Speedy Walkovers",
    },
  ];
  let notesData = [
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
  ];
  const { Panel } = Collapse;

  const { id } = useParams();

  const [getProfile, { loading, error, data, refetch }] = useLazyQuery(
    GET_PROFILE_DETAILS_QUERY,
    {
      variables: { getProfileDetailsId: id },
    }
  );

  const [
    sendEmail,
    { data: emailData, loading: emailLoading, error: emailError },
  ] = useMutation(SEND_EMAIL_MUTATION);

  const [getNft, { loading: nftLoading, data: allNfts, error: nftError }] =
    useLazyQuery(GET_ALL_NFTS, {
      fetchPolicy: "network-only",
    });

  const [
    deleteProfile,
    { loading: deleteLoading, error: deleteError, data: deleteData },
  ] = useMutation(DELETE_MUTATION);

  useEffect(() => {
    if (id) {
      getProfile({ variables: id });
    }
  }, [id]);

  const profileDetails = [
    {
      icon: user3,
      title: "User name",
      data: data?.GetProfileDetails?.user_name,
    },
    {
      icon: message3,
      title: "Email",
      data: data?.GetProfileDetails?.email,
    },
    {
      icon: call,
      title: "Contact Number",
      data: data?.GetProfileDetails?.phone_number,
    },
    {
      icon: location_large,
      title: "Address",
      data: data?.GetProfileDetails?.country,
    },
    {
      icon: calender,
      title: "Joining Date",
      data: new Date(data?.GetProfileDetails?.createdAt)?.toLocaleString(),
    },
    {
      icon: flag,
      title: "Country",
      data: data?.GetProfileDetails?.country,
    },
  ];

  const imgPath =
    environment.BACKEND_BASE_URL + "/" + data?.GetProfileDetails?.profileImg;

  useEffect(() => {
    if (data) {
      const user_address = data?.GetProfileDetails?.user_address;
      const variables = {
        walletAddress: user_address,
      };
      getNft({ variables });
    }
  }, [data]);

  useEffect(() => {
    if (emailData) {
      ToastMessage("Email Send Successfully", "", "success");
    }
    if (emailError) {
      ToastMessage(emailError.message, emailError.message, "error");
    }
  }, [emailData, emailError]);

  const handleDelete = () => {
    const values = { id }; // Set the values for the DeleteInput object
    deleteProfile({ variables: { values } });
  };

  useEffect(() => {
    if (deleteData?.DeleteProfile?.is_deleted) {
      ToastMessage("Profile Removed Successfully", "", "success");
      navigate("/user-information");
    }
    if (deleteError) {
      ToastMessage(deleteError.message, deleteError.message, "error");
    }
  }, [deleteData, deleteError]);

  useEffect(() => {
    if (isNotesAdded) {
      refetch();
      setIsNotesAdded(false);
    }
  }, [isNotesAdded]);

  return (
    <div className="bg-white2">
      {loading ||
        deleteLoading ||
        (nftLoading && <Loading content="Loading..." />)}
      {emailLoading && <Loading content="Loading..." />}
      <NavbarComponent lightNav headerTxt={"User Profile"} selectedKey={"2"} />
      <div
        className="container py-3 bg-white radius1"
        style={{ marginTop: 65 }}
      >
        <TextEditorModal
          id={id}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          setIsNotesAdded={setIsNotesAdded}
        />
        <div className="p-3">
          <div className="d-flex profileInformationView">
            <h5 className="black m-0 me-4">Profile Information </h5>
            <span
              className="me-4 profileInformationBorder"
              style={{ border: "1px solid #D54343" }}
            ></span>
            <div className="optionsView">
              <div
                onClick={() => setIsModalVisible(true)}
                className="cursor  d-flex center"
              >
                <img src={plus5} />
                <span className="ms-2">Add a Note</span>
              </div>
              <div
                onClick={() => setUserVideos(!userVideos)}
                className="cursor ms-4 d-flex center"
              >
                <img src={left_arrow} />
                <span className="ms-2">Previous Notes</span>
              </div>
            </div>
          </div>
          <div className="light-grey-border-bottom my-3"></div>
          <div className="d-flex center justify-content-between profileContainer">
            <div
              className="d-flex profileImageContainer"
              style={{ alignItems: "center" }}
            >
              {data?.GetProfileDetails?.profileImg ? (
                <Image src={imgPath} width={200} className="mt-4 mb-3" />
              ) : (
                <Image src={profile2} width={200} className="mt-4 mb-3" />
              )}
              {/* <img src={profile_large} /> */}
              <div className="userNameView">
                <h3 className="red3 semi-bold">
                  {data?.GetProfileDetails?.user_name}
                </h3>

                <div className="d-flex mb-1">
                  <h5 className="m-0 black">
                    {" "}
                    {data?.GetProfileDetails?.country}{" "}
                  </h5>
                  {data?.GetProfileDetails?.country && (
                    <img className="ms-2" src={location} />
                  )}
                </div>
                <span className="black">{data?.GetProfileDetails?.bio}</span>
                <div style={{ width: "60%" }} className="mt-4">
                  <Button
                    className="bg-blue radius2 white"
                    onClick={async () => {
                      const result = await sendEmail({
                        variables: {
                          to: data?.GetProfileDetails?.email,
                          from: environment.EMAIL_OWNER,
                          subject: "Notification email from BITS",
                          text: "This is email from BITS platform for testing purpose",
                        },
                      });
                    }}
                  >
                    Send Notifications
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Button className="videoCardBtns bg-black radius1 mb-2 white">
                Block
              </Button>
              <Button
                className="videoCardBtns bg-orange radius1 white"
                onClick={handleDelete}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white2 px-5 py-3 row">
          {profileDetails.map((e, i) => {
            return (
              <div key={i} className="col-lg-4 my-3 ">
                <div className="d-flex center">
                  <div className="profileIconStyle">
                    <img src={e.icon} />
                  </div>
                  <div className="ms-4">
                    <h5 className="red3 mb-1 m-0">{e.title}</h5>
                    <span className="light-grey2">{e.data}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-3">
          {userVideos ? (
            <>
              <div className="d-flex justify-content-between">
                <h5 className="black">User NFT's</h5>
                <Dropdown overlay={menu}>
                  <Button className="dropdownStyle">
                    <Space>
                      Recent
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
              <div className="row my-4">
                {allNfts?.getAllNfts?.map((e, i) => {
                  return (
                    <UserVideoCard key={i} videoUrl={e.video} name={e.name} />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between mb-3">
                <h5>Previous Notes</h5>

                <Button
                  onClick={() => setIsModalVisible(true)}
                  className="  bg-black radius1 mb-2 white"
                >
                  Add notes
                </Button>
              </div>
              {data?.GetProfileDetails?.notes
                .slice()
                .reverse()
                .map((item, index) => {
                  const notesImgPath =
                    environment.BACKEND_BASE_URL + "/" + item.noteImg;
                  return (
                    <Collapse
                      expandIconPosition={"right"}
                      ghost={false}
                      expandIcon={CustomExpandIcon}
                      key={index}
                    >
                      <Panel
                        className={`p-2`}
                        header={
                          <div>
                            {item.noteImg ? (
                              <img
                                className="me-2"
                                src={notesImgPath}
                                style={{ width: 60 }}
                              />
                            ) : (
                              <img
                                className="me-2"
                                src={profile}
                                style={{ width: 60 }}
                              />
                            )}
                            {item.title}
                          </div>
                        }
                        key={index}
                      >
                        <span>{item.description}</span>
                        {item.noteImg && (
                          <Image src={notesImgPath} style={{ width: 60 }} />
                        )}
                      </Panel>
                    </Collapse>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
