import socket from "@/lib/socketio/client";

export default async function socketInitializer(setter, setId) {
	// ping the server to setup a socket if not already running
	await fetch("/api/socketio");

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
	socket.on("client-new", (users) => {
		setId([...users]);
		console.log("new client", users);
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
