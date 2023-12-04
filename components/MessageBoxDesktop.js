import * as dotenv from "dotenv";
import Message from "./Message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { X as Xicon } from "lucide-react";
import { motion } from "framer-motion";
import socketInitializer from "@/lib/socketio/socketInitializer";
import socketEventCleaner from "@/lib/socketio/socketEventCleaner";
import socket from "@/lib/socketio/client";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { genericError } from "@/lib/userMessage";

import { useQuery } from "@tanstack/react-query";
import getMessages from "@/lib/queries/fetchQuery";
import createMessage from "@/lib/queries/fetchQuery";
import * as DOMPurify from "dompurify";

import { getDateDistance, parseISODate, timeDifference } from "@/lib/utils";

dotenv.config();

export default function MessageBoxDesktop({
	wsData,
	isOpen,
	onCloseMessageBox,
	image,
	listing_name,
	listing_designer,
	date,
}) {
	const [val, setVal] = useState("");
	const { toast } = useToast();
	const [message, setMessages] = useState([]);
	const [id, setId] = useState([]);
	const messageBoxContainer = useRef();

	const chatroom_id = `${wsData.product_id}-${wsData.listingOwner}-${wsData.username}`;

	useQuery({
		queryKey: ["messages", chatroom_id],
		queryFn: () => getMessages({ uri: `/message/${chatroom_id}` }),
		refetchOnWindowFocus: false,
		onSuccess: (initialMessageData) => {
			setMessages(initialMessageData.data);
		},
	});

	const onInput = (e) => {
		setVal(e.target.value);
	};

	const onPressEnter = async (e) => {
		if (e.keyCode === 13) {
			// check who should be the client
			let client;

			client = id[0]?.split("-")[2];

			socket.emit("message", {
				message: { created_at: new Date().toISOString(), text: val, sender_name: wsData.username },
				client,
			});
			// add message to message lists
			setMessages((m) => [
				...m,
				{ created_at: new Date().toISOString(), text: val, sender_name: wsData.username },
			]);
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
						buyer_name: wsData.username === wsData.listingOwner ? client : wsData.username,
						image,
						isFirstMessage: message.length === 0 ? true : false,
						text: DOMPurify.sanitize(val),
						isRead: false,
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
			socketEventCleaner(socket);
			socket.disconnect();
		};
	}, [wsData.username, wsData.listingOwner, wsData.product_id]);

	useEffect(() => {
		if (isOpen) {
			socket.connect();
		}
	}, [isOpen]);

	useEffect(() => {
		if (messageBoxContainer.current) {
			messageBoxContainer.current.scrollTop = messageBoxContainer.current.scrollHeight;
		}
	});

	return (
		<motion.div
			className="fixed bottom-0 right-[8%] z-20 h-3/5 w-80 overflow-scroll rounded-t-lg bg-background shadow-lg"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<header className="sticky top-0 z-2 flex h-14 w-full items-center border-b border-slate-200 bg-gray-50 px-2">
				<div className="flex w-full items-center justify-between">
					<Avatar className="h-10 w-10">
						<AvatarImage src={image} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="ml-2 w-9/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
						{listing_name}
					</div>
					<Xicon className="h-5 w-5 hover:cursor-pointer " onClick={onCloseMessageBox} />
				</div>
			</header>
			<main
				ref={messageBoxContainer}
				className={`relative flex h-[calc(100%-6.5rem)] w-full flex-col overflow-scroll px-3 ${
					message.length > 0 ? "items-end justify-start" : "items-center justify-center"
				}`}
			>
				{message.length > 0 ? (
					message.map((msg, index) => {
						const ISOdate = msg.created_at;
						const prevDate = message[index - 1]?.created_at;
						const currDate = parseISODate(ISOdate || null);
						return (
							<div key={`${msg.text}-${index}`} className="w-full">
								{(timeDifference(ISOdate, prevDate) > 5 || index === 0) && (
									<div className="mb-1 mt-4 flex w-full justify-center text-xs text-info">
										{currDate}
									</div>
								)}
								<Message selfMessage={msg.sender_name === wsData.username}>{msg.text}</Message>
							</div>
						);
					})
				) : (
					<div className="flex flex-col">
						<Avatar className="mx-auto h-24 w-24">
							<AvatarImage src={image} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="mt-2 flex flex-col items-center justify-center text-xs text-slate-400">
							<div>{listing_designer}</div>
							<div>{listing_name}</div>
							<div>Listed {getDateDistance(date)}</div>
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
	);
}
