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
	});

	// Event handler for client connections
	io.on("connection", (socket) => {
		const listingOwner = socket.handshake.query.listingOwner;
		const product = socket.handshake.query.product;
		const clientId = socket.handshake.query.user;

		console.log(listingOwner, clientId);

		if (listingOwner !== clientId) {
			console.log(`${product}-${listingOwner}-${clientId}`);
			socket.join(`${product}-${listingOwner}-${clientId}`);
			users.push(`${product}-${listingOwner}-${clientId}`);
		}
		if (listingOwner === clientId) {
			users.forEach((chatroom) => {
				console.log(chatroom);
				socket.join(chatroom);
			});
		}
		console.log(`A client connected. ID: ${clientId}-${socket.id}`);
		io.emit("client-new", clientId);

		// Event handler for receiving messages from the client
		socket.on("message", ({ message, recipient }) => {
			console.log("Received message:", message, recipient);

			socket
				.to(`${product}-${listingOwner}-${recipient}`)
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
