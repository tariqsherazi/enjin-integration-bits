import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./css/index.css";
const antIcon = (
  <LoadingOutlined style={{ fontSize: 40, color: "#fff" }} spin />
);
const Loading = ({ content }) => {
  return (
    <div className="cover-spin">
      <Space size="middle">
        <Spin size="large" indicator={antIcon} />
        {content}
      </Space>
    </div>
  );
};

export default Loading;
