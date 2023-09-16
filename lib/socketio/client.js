import { io } from "socket.io-client";

// Setup the Socket
const socket = io({
	transports: ["websocket", "polling"],
	path: "/api/socketio",
	addTrailingSlash: false,
	withCredentials: true,
	autoConnect: false,
	query: {
		user: localStorage && localStorage.getItem("user"),
		listingOwner: "noah",
		product: "aa",
	},
});

export default socket;
