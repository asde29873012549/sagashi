import * as dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const server_domain = process.env.SERVER_DOMAIN;

export const config = {
	api: {
		bodyParser: false,
	},
};

const users = [];
const activeRoom = {};

export default async function handler(req, res) {
	if (res.socket.server.io) {
		console.log("Already set up");
		res.end();
		return;
	}

	const httpServer = res.socket.server;
	const io = new Server(httpServer, {
		transports: ["websocket", "polling"],
		cors: {
			origin: [server_domain],
			allowedHeaders: ["Authorization", "Content-Type"],
			credentials: true,
		},
		path: "/api/socketio",
		addTrailingSlash: false,
	}).listen(3001);

	// Event handler for client connections
	io.on("connection", (socket) => {
		const listingOwner = socket.handshake.query.listingOwner;
		const productId = socket.handshake.query.productId;
		const clientId = socket.handshake.query.user;
		let chatroom_id = "";

		if (!users.includes(clientId)) {
			users.push(clientId);
		}

		if (listingOwner !== clientId) {
			chatroom_id = `${productId}-${listingOwner}-${clientId}`;
			socket.join(chatroom_id);

			if (!activeRoom[productId]) {
				activeRoom[productId] = [chatroom_id];
			} else {
				activeRoom[productId].push(chatroom_id);
			}
			//console.log(activeRoom, "44");
		} else {
			activeRoom[productId].forEach((chatroom) => {
				socket.join(chatroom);
			});
			//console.log(activeRoom, "55");
		}

		io.emit("client-new", users);

		console.log(`A client connected. ID: ${clientId}-${socket.id}`);

		// Event handler for receiving messages from the client
		socket.on("message", ({ message, recipient }) => {
			console.log("Received message:", message, recipient);

			socket
				.to(`${productId}-${listingOwner}-${recipient}`)
				.emit("getMessage", { message, sender: clientId });
		});

		// Event handler for client disconnections
		socket.on("disconnect", () => {
			console.log("A client disconnected.");
		});
	});

	res.socket.server.io = io;
	res.status(200).send("ok");
}
