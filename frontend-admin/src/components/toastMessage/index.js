import { notification } from "antd";

const ToastMessage = (title, message, type) => {
  notification[type]({
    message: title,
    description: message,
    duration: 5,
  });
};

export default ToastMessage;
