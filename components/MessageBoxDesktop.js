import * as dotenv from "dotenv";
import Message from "./Message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { X as Xicon } from "lucide-react";
import { motion } from "framer-motion";
import socketInitializer from "@/lib/socketio/socketInitializer";
import socket from "@/lib/socketio/client";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { genericError } from "@/lib/userMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useQuery } from "@tanstack/react-query";
import getMessages from "@/lib/queries/fetchQuery";
import createMessage from "@/lib/queries/fetchQuery";

dotenv.config();

export default function MessageBoxDesktop({ wsData, isOpen, onCloseMessageBox }) {
	const [val, setVal] = useState("");
	const { toast } = useToast();
	const [message, setMessages] = useState([]);
	const [id, setId] = useState([]);

	const chatroom_id = `${wsData.product_id}-${wsData.listingOwner}-${wsData.username}`;

	const { data: initialMessageData } = useQuery({
		queryKey: ["messages", chatroom_id],
		queryFn: () => getMessages({ uri: `/message/${chatroom_id}` }),
		refetchOnWindowFocus: false,
		onSuccess: (msgs) => {
			setMessages(msgs.data.map((msg) => msg.text));
		},
	});

	const onInput = (e) => {
		setVal(e.target.value);
	};

	const onPressEnter = async (e) => {
		if (e.keyCode === 13) {
			// check who should be the recipient
			let recipient;

			recipient = id[0]?.split("-")[2];

			socket.emit("message", { message: val, recipient });
			// add message to message lists
			setMessages((m) => [...m, val]);
			// clear input
			setVal("");

			// fetch message to database
			try {
				const res = createMessage({
					uri: "/message",
					method: "POST",
					body: {
						product_id: wsData.product_id,
						seller_name: wsData.listingOwner,
						buyer_name: wsData.username,
						isFirstMessage: message.length === 0 ? true : false,
						text: val,
						isRead: true,
					},
				});

				if (res.status === "fail") {
					throw new Error();
				}
			} catch (error) {
				toast({
					title: "Failed !",
					description: genericError,
					status: "fail",
				});
			}
		}
	};

	useEffect(() => {
		socketInitializer(setMessages, setId);

		socket.io.opts.query.user = wsData.username;
		socket.io.opts.query.listingOwner = wsData.listingOwner;
		socket.io.opts.query.productId = wsData.product_id;

		return () => {
			console.log("socket disconnectd");
			socket.disconnect();
		};
	}, [wsData.username, wsData.listingOwner, wsData.product_id]);

	useEffect(() => {
		if (isOpen) {
			socket.connect();
		}
	}, [isOpen]);

	return (
		isOpen && (
			<motion.div
				className="fixed bottom-0 right-[8%] z-20 h-3/5 w-80 overflow-scroll rounded-t-lg bg-background shadow-lg"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<header className="sticky top-0 z-2 flex h-14 w-full items-center border-b border-slate-200 bg-gray-50 px-2">
					<div className="flex w-full items-center justify-between">
						<Avatar className="h-10 w-10">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="ml-2 w-9/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
							Yellow Le Bob Artichaut Bucket Hat Bucket Hat Bucket Hat
						</div>
						<Xicon className="h-5 w-5 hover:cursor-pointer " onClick={onCloseMessageBox} />
					</div>
				</header>
				<main
					className={`relative flex h-[calc(100%-6.5rem)] w-full flex-col overflow-scroll px-3 ${
						message.length > 0 ? "items-end justify-start" : "items-center justify-center"
					}`}
				>
					{message.length > 0 ? (
						message.map((message, index) => (
							<Message key={`${message}-${index}`}>{message}</Message>
						))
					) : (
						<div className="flex flex-col">
							<Avatar className="mx-auto h-24 w-24">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className="mt-2 flex flex-col items-center justify-center text-xs text-slate-400">
								<div>Margiela</div>
								<div>Yellow Le Bob Artichaut Bucket Hat</div>
								<div>Listed 3 months ago</div>
							</div>
						</div>
					)}
				</main>
				<footer className="fixed bottom-0 w-80 bg-background p-2">
					<Input
						className="h-8 w-full rounded-full text-base placeholder:text-slate-400"
						placeholder="Aa"
						onChange={onInput}
						onKeyDown={onPressEnter}
						value={val}
					/>
				</footer>
			</motion.div>
		)
	);
}
