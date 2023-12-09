import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Message from "@/components/Message";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import ItemCard from "../ItemCard";
import { useQuery } from "@tanstack/react-query";
import getChatrooms from "@/lib/queries/fetchQuery";
import getMessage from "@/lib/queries/fetchQuery";
import createMessage from "@/lib/queries/fetchQuery";
import { received_message } from "@/lib/msg_template";
import { genericError } from "@/lib/userMessage";
import readMessage from "@/lib/queries/fetchQuery";

import socket from "@/lib/socketio/client";
import socketInitializer from "@/lib/socketio/socketInitializer";
import socketEventCleaner from "@/lib/socketio/socketEventCleaner";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";

import {
	setLastMessage,
	setMessageReadStatus,
	messageSelector,
	setCurrentTab,
} from "@/redux/messageSlice";
import { useDispatch, useSelector } from "react-redux";

import { parseISODate, timeDifference } from "@/lib/utils";

export default function Messages({ user }) {
	const dispatch = useDispatch();
	const { chatroom_id: chatroom_id_from_url } = useRouter().query;
	const [val, setVal] = useState("");
	const { toast } = useToast();
	const [chatroomMessage, setChatroomMessage] = useState([]);
	const lastMessageMap = useSelector(messageSelector).lastMessage;
	const messageReadMap = useSelector(messageSelector).isMessageReadMap;
	const currentActiveChatroom = useSelector(messageSelector).currentActiveChatroom;
	const currentTab = useSelector(messageSelector).currentTab;
	const currentChatroom_avatar = useRef(null);
	const sellContainer = useRef();
	const maiContainer = useRef();
	const lastMessageRef = useRef();

	const { data: chatroomList } = useQuery({
		queryKey: ["chatroomList", currentTab],
		queryFn: () =>
			getChatrooms({
				uri: "/message?tab=" + currentTab,
			}),
		refetchOnWindowFocus: false,
		onSuccess: (initialChatroomList) => {
			// on successfully fetch chatroom list, populate the initial state of last message and read status
			dispatch(
				setLastMessage(initialChatroomList.data?.map((c) => ({ chatroom_id: c.id, text: c.text }))),
			);
			dispatch(
				setMessageReadStatus(
					initialChatroomList.data?.map((c) => ({ chatroom_id: c.id, read_at: c.read_at })),
				),
			);
		},
	});

	const {
		data: messageData,
		refetch: fetchMessageData,
		isFetching: isMessageDataLoading,
	} = useQuery({
		queryKey: ["messages", currentActiveChatroom],
		queryFn: () =>
			getMessage({
				uri: `/message/${currentActiveChatroom}`,
			}),
		refetchOnWindowFocus: false,
		// enabled: chatroom_id_from_url ? true : false,
		onSuccess: (initialMessageData) => {
			setChatroomMessage(initialMessageData.data);
		},
	});

	// There are two possible ways to initialize the websocket
	// 1. clikced on the itemCard on header messageIcon and navigate to user page's message section
	// the chatroom_id_from_url url query will be available and
	// thus caused the useEffect to run and initiate the websocket connection
	// 2. directly clicked itemCard when in the user's page message section
	// this will also triggered onOpenChatroom and set the currentActiveChatroom_id
	// thus caused the useEffect to run and initiate the websocket connection

	useEffect(() => {
		if (currentActiveChatroom) {
			const [product_id, listingOwner, client] = currentActiveChatroom.split("-");
			socketInitializer({
				setter: setChatroomMessage,
				fetchQuery: async (message_id) =>
					await readMessage({
						uri: "/message",
						method: "PUT",
						body: {
							message_id,
						},
					}),
			});

			socket.io.opts.query.user = client;
			socket.io.opts.query.listingOwner = listingOwner;
			socket.io.opts.query.productId = product_id;
		}

		return () => {
			console.log("socket disconnectd");
			socketEventCleaner(socket);
			socket.disconnect();
		};
	}, [currentActiveChatroom]);

	useEffect(() => {
		if (currentActiveChatroom) {
			socket.connect();
		}
	}, [currentActiveChatroom]);

	// scroll to bottom when new message is received
	useEffect(() => {
		if (currentTab === "sell" && sellContainer.current) {
			sellContainer.current.scrollTop =
				sellContainer.current.scrollHeight - sellContainer.current.clientHeight;
		} else if (currentTab === "buy" && maiContainer.current) {
			maiContainer.current.scrollTop =
				maiContainer.current.scrollHeight - maiContainer.current.clientHeight;
		}
	}, [chatroomMessage, currentTab]);

	const offlineChatroom = chatroomList?.data ?? [];

	const mes_type_helper = (msg) => {
		// check if last_sent_user_name(from message table) is the same as user
		const sender = msg.last_sent_user_name === user ? "You" : msg.last_sent_user_name;
		return received_message(
			sender,
			// check if the chatroom has received online new messages, if true, take the new messages from redux global store
			// otherwise, take the messages from the database
			lastMessageMap[msg.id]?.text || msg?.text,
			lastMessageMap[msg.id]?.updated_at || msg?.updated_at,
		);
	};

	const onInput = (e) => {
		setVal(e.target.value);
	};

	const onOpenChatroom = (chatroom_id, chatroom_avatar) => {
		// currentActiveChatroom = chatroom_id;
		currentChatroom_avatar.current = chatroom_avatar;
		setChatroomMessage([]);
		fetchMessageData();
	};

	const onPressEnter = async (e) => {
		if (e.keyCode === 13) {
			// check who should be the recipient
			const [product_id, listingOwner, recipient] = currentActiveChatroom?.split("-");

			if (!recipient)
				return toast({
					title: "Failed !",
					description: genericError,
					status: "fail",
				});

			// optimistically add message to message lists
			setChatroomMessage((m) => [
				...m,
				{ created_at: new Date().toISOString(), text: val, sender_name: user },
			]);

			// then post message to database
			let message = null;

			try {
				message = await createMessage({
					uri: "/message",
					method: "POST",
					body: {
						product_id,
						seller_name: listingOwner,
						buyer_name: recipient,
						isFirstMessage: chatroomMessage.length === 0,
						image: currentChatroom_avatar.current,
						text: DOMPurify.sanitize(val),
						isRead: false,
					},
				});

				if (message.status === "fail") {
					throw new Error();
				}
			} catch (error) {
				// remove message from message list if create-message api failed
				setChatroomMessage((m) => m.filter((msg) => msg.text !== val && msg.sender_name !== user));

				return toast({
					title: "Message failed to deliver !",
					description: genericError,
					status: "fail",
				});
			}

			socket.emit("message", {
				message: {
					created_at: new Date().toISOString(),
					text: val,
					sender_name: user,
					message_id: message.data?.id,
				},
				client: recipient,
			});

			// clear input
			setVal("");

			// set local user's last message state
			dispatch(setLastMessage({ chatroom_id: currentActiveChatroom, text: val }));
		}
	};

	const onChangeTab = (tab) => {
		dispatch(setCurrentTab(tab));
		setChatroomMessage([]);
	};

	return (
		<Tabs value={currentTab} onValueChange={onChangeTab} className="w-full">
			<TabsList className="h-14 w-full bg-sky-950/90">
				<TabsTrigger
					value="sell"
					className="h-12 w-1/2 text-background data-[state=active]:text-foreground"
				>
					SELL Messages
				</TabsTrigger>
				<TabsTrigger
					value="buy"
					className="h-12 w-1/2 text-background data-[state=active]:text-foreground"
				>
					BUY Messages
				</TabsTrigger>
			</TabsList>
			<TabsContent
				value="sell"
				className="relative box-border flex space-x-6 rounded-lg data-[state=inactive]:mt-0"
			>
				<aside
					className={`relative box-content flex h-[500px] w-[400px] shrink-0 flex-col items-center justify-start overflow-scroll rounded-lg border-2 border-sky-900`}
				>
					{offlineChatroom && offlineChatroom.length > 0 ? (
						offlineChatroom.map((msg, index) => {
							const content = mes_type_helper(msg);
							return (
								<ItemCard
									key={`message-${msg.created_at}-${index}-offline`}
									src={msg.chatroom_avatar}
									setIsOpen={() => onOpenChatroom(msg.id, msg.chatroom_avatar)}
									read_at={!messageReadMap[msg.id] ? null : msg.read_at}
									chatroom_id={msg.id}
									chatroom_id_from_url={chatroom_id_from_url}
								>
									{content}
								</ItemCard>
							);
						})
					) : (
						<div className="flex h-14 w-full items-center justify-center text-sm text-info">
							No Message Available
						</div>
					)}
				</aside>
				<div
					className={`relative flex h-[500px] grow flex-col overflow-scroll rounded-lg border-2 border-sky-900 ${
						chatroomMessage.length > 0 ? "items-start" : "items-center justify-center"
					}`}
				>
					<div
						className="flex h-[calc(100%-56px)] w-full flex-col overflow-y-scroll px-3 py-2"
						ref={sellContainer}
					>
						{isMessageDataLoading ? (
							<MessageLoadingSkeleton />
						) : chatroomMessage.length > 0 ? (
							chatroomMessage.map((msg, index) => {
								const ISOdate = msg.created_at;
								const prevDate = chatroomMessage[index - 1]?.created_at;
								const currDate = parseISODate(ISOdate || null);
								return (
									<div key={`${msg.text}-${index}`} className="w-full">
										{(timeDifference(ISOdate, prevDate) > 5 || index === 0) && (
											<div className="mb-1 mt-4 flex w-full justify-center text-xs text-info">
												{currDate}
											</div>
										)}
										<Message selfMessage={msg.sender_name === user}>{msg.text}</Message>
									</div>
								);
							})
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
					</div>
					<span className="invisible opacity-0" ref={lastMessageRef}></span>
					<footer className="absolute bottom-0 w-full rounded-lg bg-background p-2">
						<Input
							className="h-10 w-full rounded-lg border-slate-800 text-base placeholder:text-slate-400"
							placeholder="Aa"
							onChange={onInput}
							onKeyDown={onPressEnter}
							value={val}
						/>
					</footer>
				</div>
			</TabsContent>
			<TabsContent
				value="buy"
				className="relative box-border flex space-x-6 rounded-lg data-[state=inactive]:mt-0"
			>
				<aside
					className={`relative box-content flex h-[500px] w-[400px] shrink-0 flex-col items-center justify-start overflow-scroll rounded-lg border-2 border-sky-900`}
				>
					{offlineChatroom && offlineChatroom.length > 0 ? (
						offlineChatroom.map((msg, index) => {
							const content = mes_type_helper(msg);
							return (
								<ItemCard
									key={`message-${msg.created_at}-${index}-offline`}
									src={msg.chatroom_avatar}
									setIsOpen={() => onOpenChatroom(msg.id, msg.chatroom_avatar)}
									read_at={!messageReadMap[msg.id] ? null : msg.read_at}
									chatroom_id={msg.id}
									chatroom_id_from_url={chatroom_id_from_url}
								>
									{content}
								</ItemCard>
							);
						})
					) : (
						<div className="flex h-14 w-full items-center justify-center text-sm text-info">
							No Message Available
						</div>
					)}
				</aside>
				<div
					className={`relative flex h-[500px] grow flex-col overflow-scroll rounded-lg border-2 border-sky-900 ${
						chatroomMessage.length > 0 ? "items-start" : "items-center justify-center"
					}`}
				>
					<div
						className="flex h-[calc(100%-56px)] w-full flex-col overflow-y-scroll px-3 py-2"
						ref={maiContainer}
					>
						{isMessageDataLoading ? (
							<MessageLoadingSkeleton />
						) : chatroomMessage.length > 0 ? (
							chatroomMessage.map((msg, index) => {
								const ISOdate = msg.created_at;
								const prevDate = chatroomMessage[index - 1]?.created_at;
								const currDate = parseISODate(ISOdate || null);
								return (
									<div key={`${msg.text}-${index}`} className="w-full">
										{(timeDifference(ISOdate, prevDate) > 5 || index === 0) && (
											<div className="mb-1 mt-4 flex w-full justify-center text-xs text-info">
												{currDate}
											</div>
										)}
										<Message selfMessage={msg.sender_name === user}>{msg.text}</Message>
									</div>
								);
							})
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
					</div>
					<span className="invisible opacity-0" ref={lastMessageRef}></span>
					<footer className="absolute bottom-0 w-full rounded-lg bg-background p-2">
						<Input
							className="h-10 w-full rounded-lg border-slate-800 text-base placeholder:text-slate-400"
							placeholder="Aa"
							onChange={onInput}
							onKeyDown={onPressEnter}
							value={val}
						/>
					</footer>
				</div>
			</TabsContent>
		</Tabs>
	);
}

function MessageLoadingSkeleton() {
	return (
		<div className="h-full w-full space-y-3">
			<div className="flex w-full justify-end">
				<Skeleton className="h-8 w-60 rounded-3xl" />
			</div>
			<div className="flex w-full justify-end">
				<Skeleton className="h-8 w-40 rounded-3xl" />
			</div>
			<div className="flex w-full justify-start">
				<Skeleton className="h-8 w-40 rounded-3xl" />
			</div>
			<div className="flex w-full justify-end">
				<Skeleton className="h-8 w-32 rounded-3xl" />
			</div>
			<div className="flex w-full justify-start">
				<Skeleton className="w-62 h-8 rounded-3xl" />
			</div>
			<div className="flex w-full justify-start">
				<Skeleton className="h-8 w-32 rounded-3xl" />
			</div>
			<div className="flex w-full justify-end">
				<Skeleton className="h-8 w-40 rounded-3xl" />
			</div>
			<div className="flex w-full justify-end">
				<Skeleton className="h-8 w-60 rounded-3xl" />
			</div>
			<div className="flex w-full justify-start">
				<Skeleton className="h-8 w-20 rounded-3xl" />
			</div>
		</div>
	);
}
