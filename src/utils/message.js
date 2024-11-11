import { message } from "antd";

export const showErrorMessage = (content) => {
  message.error({
    content,
  });
};

export const showSuccessMessage = (content) => {
  message.success({
    content,
  });
};

export const showWarningMessage = (content) => {
  message.warning({
    content,
  });
};
