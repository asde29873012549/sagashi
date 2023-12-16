import * as dotenv from "dotenv";
import Message from "./Message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X as Xicon } from "lucide-react";
import { motion } from "framer-motion";
import socketInitializer from "@/lib/socketio/socketInitializer";
import socketEventCleaner from "@/lib/socketio/socketEventCleaner";
import socket from "@/lib/socketio/client";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLastMessage } from "@/redux/messageSlice";
import useInterSectionObserver from "@/lib/hooks/useIntersectionObserver";
import ChatboxInput from "./ChatboxInput";

import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import getMessages from "@/lib/queries/fetchQuery";
import readMessage from "@/lib/queries/fetchQuery";
import createMessage from "@/lib/queries/fetchQuery";
import DOMPurify from "dompurify";

import { getDateDistance, parseISODate, timeDifference } from "@/lib/utils";

dotenv.config();

export default function MessageBoxDesktop({
	wsData,
	onCloseMessageBox,
	image,
	listing_name,
	listing_designer,
	date,
}) {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const [id, setId] = useState([]);
	const messageBoxContainer = useRef();
	const childValStateRef = useRef("");

	const chatroom_id = `${wsData.product_id}-${wsData.listingOwner}-${wsData.username}`;

	const {
		data: messageData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["messages", chatroom_id],
		queryFn: ({ pageParam = "" }) => {
			const uri = `/message/${chatroom_id}` + (pageParam ? `?cursor=${pageParam}` : "");
			return getMessages({ uri });
		},
		getNextPageParam: (lastPage, pages) => lastPage.data?.[lastPage.data.length - 1]?.id,
		refetchOnWindowFocus: false,
	});

	const flattenMessageData = messageData?.pages?.map((pageObj) => pageObj.data).flat();

	const lastMessageElement = useInterSectionObserver({
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	});

	const { mutate: messageMutate } = useMutation({
		mutationFn: (inputValue) =>
			createMessage({
				uri: "/message",
				method: "POST",
				body: {
					product_id: wsData.product_id,
					seller_name: wsData.listingOwner,
					buyer_name: wsData.username,
					image,
					text: DOMPurify.sanitize(inputValue.val),
					isRead: false,
				},
			}),
		onMutate: async () => {
			// Snapshot the previous value
			const previousMessage = queryClient.getQueryData(["messages", chatroom_id]);

			// clear input
			childValStateRef.current.setVal("");

			// Optimistically update to the new value
			queryClient.setQueryData(["messages", chatroom_id], (oldData) => {
				const newData = oldData;
				newData.pages[0].data.unshift({
					created_at: new Date().toISOString(),
					text: childValStateRef.current.val,
					sender_name: wsData.username,
				});
				return newData;
			});
			// Return a context object with the snapshotted value
			return { previousMessage };
		},
		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (err, newTodo, context) => {
			queryClient.setQueryData(["messages", chatroom_id], context.previousMessage);
		},
		onSuccess: (msgData) => {
			const client = id[0]?.split("-")[2];
			// if the mutation succeeds, emit message to ws server and proceed
			socket.emit("message", {
				message: {
					created_at: new Date().toISOString(),
					text: msgData?.data?.text,
					sender_name: wsData.username,
					message_id: msgData?.data?.id,
				},
				client,
			});

			// set local user's last message state
			dispatch(setLastMessage({ chatroom_id, text: msgData?.data?.text }));
		},
	});

	useEffect(() => {
		socketInitializer({
			queryClient,
			chatroom_id: `${wsData.product_id}-${wsData.listingOwner}-${wsData.username}`,
			setId,
			fetchQuery: async (message_id) =>
				await readMessage({
					uri: "/message",
					method: "PUT",
					body: {
						message_id,
					},
				}),
		});

		socket.io.opts.query.user = wsData.username;
		socket.io.opts.query.listingOwner = wsData.listingOwner;
		socket.io.opts.query.productId = wsData.product_id;

		socket.connect();

		return () => {
			console.log("socket disconnectd");
			socketEventCleaner(socket);
			socket.disconnect();
		};
	}, [wsData.username, wsData.listingOwner, wsData.product_id, queryClient]);

	/*useEffect(() => {
		if (isOpen) {
			socket.connect();
		}
	}, [isOpen]);*/

	const updateMessageInput = (valStateFromChild) => {
		childValStateRef.current = valStateFromChild;
	};

	return (
		<motion.div
			className="fixed bottom-0 right-[8%] z-20 h-3/5 w-80 rounded-t-lg bg-background shadow-lg"
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
				className={`relative flex h-[calc(100%-6.5rem)] w-full flex-col overflow-scroll ${
					flattenMessageData?.length > 0 ? "items-end justify-start" : "items-center justify-center"
				}`}
			>
				<div
					className="flex h-fit w-full flex-col-reverse overflow-scroll px-3"
					ref={messageBoxContainer}
				>
					{flattenMessageData?.length > 0 ? (
						flattenMessageData.map((msg, index) => {
							const ISOdate = msg.created_at;
							const prevDate = flattenMessageData[index + 1]?.created_at;
							const currDate = parseISODate(ISOdate || null);
							return (
								<div key={`${msg.text}-${index}`} className="w-full">
									{(timeDifference(ISOdate, prevDate) > 5 ||
										index === flattenMessageData.length - 1) && (
										<div className="mb-1 mt-4 flex w-full justify-center text-xs text-info">
											{currDate}
										</div>
									)}
									<Message
										lastMessageElement={
											index === flattenMessageData?.length - 1 ? lastMessageElement : null
										}
										selfMessage={msg.sender_name === wsData.username}
									>
										{msg.text}
									</Message>
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
				</div>
			</main>
			<footer className="fixed bottom-0 w-80 bg-background p-2">
				<ChatboxInput
					updateMessageInput={updateMessageInput}
					currentActiveChatroom={chatroom_id}
					messageMutate={messageMutate}
					isSmallMsgBox={true}
				/>
			</footer>
		</motion.div>
	);
}
