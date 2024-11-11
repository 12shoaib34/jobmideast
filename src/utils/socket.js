import io from "socket.io-client";

export const initSocket = () => {
  const url = process.env.REACT_APP_CHAT_URL;
  const token = localStorage.getItem("token");
  return io(`${url}?token=Bearer ${token}`);
};
