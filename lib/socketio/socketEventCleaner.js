export default function socketEventCleaner(socket) {
	socket.off("connect");
	socket.off("disconnect");
	socket.off("connect_error");
	socket.off("reconnect");
	socket.off("reconnect_error");
	socket.off("reconnect_failed");
	socket.off("client-new");
	socket.off("getMessage");
	socket.off("client-count");
}
