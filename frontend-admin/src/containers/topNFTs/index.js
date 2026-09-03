import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  AddModal,
  DeleteModal,
  EditModal,
  NavbarComponent,
} from "../../components";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GET_TOP_NFTS } from "../../gql/queries";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { UPDATE_TOP_NFT_LIST } from "../../gql/mutations";

const TopNFTs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [obj, setObj] = useState(null);

  const { data: topNfts, refetch } = useQuery(GET_TOP_NFTS);
  const [UpdateSerialTopNft, { data, loading, error }] =
    useMutation(UPDATE_TOP_NFT_LIST);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddOk = () => {
    setIsAddModalOpen(false);
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const columns = [
    {
      key: "sort",
    },
    {
      title: "Sr#",
      dataIndex: "serial_number",
    },
    {
      title: "NFT Link",
      dataIndex: "nft_link",
    },
    {
      title: "NFT Name",
      dataIndex: ["nft_id", "name"],
    },
    {
      title: "Creator Name",
      dataIndex: ["nft_id", "user_id", "full_name"],
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_, record) => (
        <div>
          <p>{moment.unix(record.duration).format("YYYY-MM-DD HH:mm:ss")}</p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <span style={{ cursor: "pointer" }}>
            <AiOutlineEdit
              onClick={() => {
                showEditModal();
                setObj(record);
              }}
            />
          </span>{" "}
          &nbsp; | &nbsp;
          <span style={{ cursor: "pointer" }}>
            <AiOutlineDelete
              onClick={() => {
                showModal();
                setObj(record?.id);
              }}
            />
          </span>
        </div>
      ),
      sortable: false,
    },
  ];
  const Row = ({ children, ...props }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });
    const style = {
      ...props.style,
      transform: CSS.Transform.toString(
        transform && {
          ...transform,
          scaleY: 1,
        }
      ),
      transition,
      ...(isDragging
        ? {
            position: "relative",
            zIndex: 9999,
          }
        : {}),
    };
    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if (child.key === "sort") {
            return React.cloneElement(child, {
              children: (
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{
                    touchAction: "none",
                    cursor: "move",
                  }}
                  {...listeners}
                />
              ),
            });
          }
          return child;
        })}
      </tr>
    );
  };

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (topNfts) {
      setDataSource(
        topNfts?.GetTopNfts?.map((x) => {
          return { ...x, key: x.serial_number };
        })
      );
    }
  }, [topNfts]);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        const reorderedData = arrayMove(previous, activeIndex, overIndex);
        const updatedData = reorderedData.map((item, index) => ({
          ...item,
          serial_number: index + 1,
        }));
        console.log(updatedData, "updatedData");
        UpdateSerialTopNft({
          variables: {
            nftArray: updatedData?.map((c) => ({
              id: c.id,
              serial_number: c.serial_number,
            })),
          },
        });
        return updatedData;
      });
    }
  };
  return (
    <div className="bg-white2" style={{ minHeight: "100vh" }}>
      <NavbarComponent lightNav headerTxt={"NFTs"} selectedKey={"9"} />
      <div
        className="container py-3 bg-white radius1"
        style={{ marginTop: 65 }}
      >
        <div className="d-flex p-4 justify-content-between center">
          <h5 className="m-0">Top NFTs</h5>{" "}
          <Button onClick={showAddModal}>Add NFTs </Button>
        </div>

        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource?.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: Row,
                },
              }}
              rowKey="key"
              columns={columns}
              dataSource={dataSource}
            />
          </SortableContext>
        </DndContext>

        <DeleteModal
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          obj={obj}
          refetch={refetch}
        />
        <EditModal
          showModal={isEditModalOpen}
          isModalOpen={isEditModalOpen}
          handleCancel={handleEditCancel}
          handleOk={handleEditOk}
          obj={obj}
          refetch={refetch}
          setObj={setObj}
        />
        <AddModal
          showModal={isAddModalOpen}
          isModalOpen={isAddModalOpen}
          handleCancel={handleAddCancel}
          handleOk={handleAddOk}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default TopNFTs;
