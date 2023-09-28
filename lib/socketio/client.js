import { io } from "socket.io-client";

// Setup the Socket
const socket = io(":3001", {
	transports: ["websocket", "polling"],
	path: "/api/socketio",
	addTrailingSlash: false,
	withCredentials: true,
	autoConnect: false,
	query: {},
});

export default socket;
