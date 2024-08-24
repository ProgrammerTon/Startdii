import io from "socket.io-client";

const socket = io("https://socket.236sec.org", {
  transports: ["websocket"],
});
export default socket;
