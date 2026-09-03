import { Modal } from "antd";
import "./css/index.css";
import { DELETE_TOP_NFT } from "../../gql/mutations";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

const DeleteModal = ({
  showModal,
  handleCancel,
  handleOk,
  isModalOpen,
  obj,
  refetch,
}) => {
  const [DeleteTopNft, { data, loading, error }] = useMutation(DELETE_TOP_NFT);

  useEffect(() => {
    if (data) {
      refetch();
      handleCancel();
    }
  }, [data]);

  return (
    <>
      <Modal
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={false}
        width={440}
        className="delete-modal"
      >
        <div className="modal-wrapper">
          <h4 className="main-text">
            Are you sure you want to perform this action?
          </h4>

          <div className="buttons-div">
            <button className="dlt-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="dlt-confirm-btn"
              onClick={() => {
                const variables = {
                  id: obj,
                };

                DeleteTopNft({
                  variables: variables,
                });
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
