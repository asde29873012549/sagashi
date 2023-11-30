import * as dotenv from "dotenv";
import socket from "@/lib/socketio/client";

dotenv.config();

const NEXT_PUBLIC_SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

export default async function socketInitializer(setter, setId) {
	// ping the server to setup a socket if not already running
	await fetch(`${NEXT_PUBLIC_SERVER_DOMAIN}/api/ws`);

	// Standard socket management
	socket.on("connect", () => {
		console.log("Connected to the server");
	});

	socket.on("disconnect", () => {
		console.log("Disconnected from the server");
	});

	socket.on("connect_error", (error) => {
		console.log("Connection error:", error);
	});

	socket.on("reconnect", (attemptNumber) => {
		console.log("Reconnected to the server. Attempt:", attemptNumber);
	});

	socket.on("reconnect_error", (error) => {
		console.log("Reconnection error:", error);
	});

	socket.on("reconnect_failed", () => {
		console.log("Failed to reconnect to the server");
	});

	// Manage socket message events
	socket.on("client-new", (chatroom_id) => {
		console.log("chatroom_id chatroom_id", chatroom_id);
		chatroom_id && setId(chatroom_id);
		console.log("new client", chatroom_id);
	});

	socket.on("getMessage", ({ message, sender }) => {
		console.log(sender);
		setter((m) => [...m, message]);

		console.log("getMessage", message);
	});

	socket.on("client-count", (count) => {
		console.log("clientCount", count);
	});

	return socket;
}
