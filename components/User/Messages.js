import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Message from "@/components/Message";
import { useState, useRef, useEffect } from "react";
import ItemCard from "../ItemCard";
import { useQuery, useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import getChatrooms from "@/lib/queries/fetchQuery";
import getMessages from "@/lib/queries/fetchQuery";
import createMessage from "@/lib/queries/fetchQuery";
import { received_message } from "@/lib/msg_template";
import readMessage from "@/lib/queries/fetchQuery";
import useInterSectionObserver from "@/lib/hooks/useIntersectionObserver";
import ChatboxInput from "@/components/ChatboxInput";

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
	setCurrentActiveChatroom,
} from "@/redux/messageSlice";
import { useDispatch, useSelector } from "react-redux";

import { parseISODate, timeDifference } from "@/lib/utils";

export default function Messages({ user }) {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const { chatroom_id: chatroom_id_from_url } = useRouter().query;
	// const [val, setVal] = useState("");
	// const { toast } = useToast();
	const [shouldBeInitialChatroomDisplay, setShouldBeInitialChatroomDisplay] = useState(
		chatroom_id_from_url ? false : true,
	);
	const lastMessageMap = useSelector(messageSelector).lastMessage;
	const messageReadMap = useSelector(messageSelector).isMessageReadMap;
	const currentActiveChatroom = useSelector(messageSelector).currentActiveChatroom;
	const currentTab = useSelector(messageSelector).currentTab;
	const currentChatroom_avatar = useRef(null);
	const sellContainer = useRef();
	const buyContainer = useRef();
	const lastMessageRef = useRef();
	const childValStateRef = useRef("");

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
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch: fetchMessageData,
		isInitialLoading: isMessageDataLoading,
	} = useInfiniteQuery({
		queryKey: ["messages", currentActiveChatroom],
		queryFn: ({ pageParam = "" }) => {
			const uri = `/message/${currentActiveChatroom}` + (pageParam ? `?cursor=${pageParam}` : "");
			return getMessages({ uri });
		},
		enabled: currentActiveChatroom ? true : false,
		getNextPageParam: (lastPage, pages) => lastPage.data?.[lastPage.data.length - 1]?.id,
		refetchOnWindowFocus: false,
	});

	const flattenMessageData = messageData?.pages?.map((pageObj) => pageObj.data).flat();

	const lastMessageElement = useInterSectionObserver({
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
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
				queryClient,
				chatroom_id: currentActiveChatroom,
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

			socket.connect();
		}

		return () => {
			console.log("socket disconnectd");
			socketEventCleaner(socket);
			socket.disconnect();
		};
	}, [currentActiveChatroom, queryClient]);

	useEffect(() => {
		return () => dispatch(setCurrentActiveChatroom(null));
	}, [dispatch]);

	// scroll to bottom when switching charoom or tabs
	useEffect(() => {
		if (currentTab === "sell" && sellContainer.current) {
			sellContainer.current.scrollTop =
				sellContainer.current.scrollHeight - sellContainer.current.clientHeight;
		} else if (currentTab === "buy" && buyContainer.current) {
			buyContainer.current.scrollTop =
				buyContainer.current.scrollHeight - buyContainer.current.clientHeight;
		}
	}, [currentTab]);

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

	const onOpenChatroom = (chatroom_avatar) => {
		currentChatroom_avatar.current = chatroom_avatar;
		fetchMessageData();
		setShouldBeInitialChatroomDisplay(false);
	};

	const { mutate: messageMutate } = useMutation({
		mutationFn: ({ val, product_id, listingOwner, recipient }) => {
			return createMessage({
				uri: "/message",
				method: "POST",
				body: {
					product_id,
					seller_name: listingOwner,
					buyer_name: recipient,
					image: currentChatroom_avatar.current,
					text: DOMPurify.sanitize(val),
					isRead: false,
				},
			});
		},
		onMutate: async () => {
			// Snapshot the previous value
			const previousMessage = queryClient.getQueryData(["messages", currentActiveChatroom]);

			// clear input
			childValStateRef.current.setVal("");

			// Optimistically update to the new value
			queryClient.setQueryData(["messages", currentActiveChatroom], (oldData) => {
				const newData = oldData;
				newData.pages[0].data.unshift({
					created_at: new Date().toISOString(),
					text: childValStateRef.current.val,
					sender_name: user,
				});
				return newData;
			});
			// Return a context object with the snapshotted value
			return previousMessage;
		},
		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (err, newTodo, context) => {
			queryClient.setQueryData(["messages", currentActiveChatroom], context);
		},
		onSuccess: (messageData) => {
			const client = currentActiveChatroom?.split("-")[2];
			// if the mutation succeeds, emit message to ws server and proceed
			socket.emit("message", {
				message: {
					created_at: new Date().toISOString(),
					text: messageData.data?.text,
					sender_name: user,
					message_id: messageData.data?.id,
				},
				client,
			});

			// set local user's last message state
			dispatch(setLastMessage({ currentActiveChatroom, text: messageData.data?.text }));
		},
	});

	const onChangeTab = (tab) => {
		dispatch(setCurrentTab(tab));
		setShouldBeInitialChatroomDisplay(true);
	};

	const updateMessageInput = (valStateFromChild) => {
		childValStateRef.current = valStateFromChild;
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
									setIsOpen={() => onOpenChatroom(msg.chatroom_avatar)}
									read_at={!messageReadMap[msg.id] ? null : msg.read_at}
									message_id={msg.last_message}
									chatroom_id={msg.id}
									chatroom_id_from_url={currentActiveChatroom}
									isDesktop={true}
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
						flattenMessageData?.length > 0 ? "items-start" : "items-center justify-center"
					}`}
				>
					<div
						className="mb-14 flex h-fit w-full flex-col-reverse overflow-y-scroll px-3 py-2"
						ref={sellContainer}
					>
						{isMessageDataLoading ? (
							<MessageLoadingSkeleton />
						) : shouldBeInitialChatroomDisplay ? (
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
						) : (
							flattenMessageData?.length > 0 &&
							flattenMessageData.map((msg, index) => {
								const ISOdate = msg.created_at;
								const prevDate = flattenMessageData[index - 1]?.created_at;
								const currDate = parseISODate(ISOdate || null);
								return (
									<div key={`${msg.text}-${index}`} className="w-full">
										{(timeDifference(prevDate, ISOdate) > 5 || index === 0) && (
											<div className="mb-1 mt-4 flex w-full justify-center text-xs text-info">
												{currDate}
											</div>
										)}
										<Message
											lastMessageElement={
												index === flattenMessageData?.length - 1 ? lastMessageElement : null
											}
											selfMessage={msg.sender_name === user}
										>
											{msg.text}
										</Message>
									</div>
								);
							})
						)}
					</div>
					<span className="invisible opacity-0" ref={lastMessageRef}></span>
					<footer className="absolute bottom-0 w-full rounded-lg bg-background p-2">
						<ChatboxInput
							updateMessageInput={updateMessageInput}
							currentActiveChatroom={currentActiveChatroom}
							messageMutate={messageMutate}
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
									setIsOpen={() => onOpenChatroom(msg.chatroom_avatar)}
									read_at={!messageReadMap[msg.id] ? null : msg.read_at}
									message_id={msg.last_message}
									chatroom_id={msg.id}
									chatroom_id_from_url={chatroom_id_from_url}
									isDesktop={true}
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
						flattenMessageData?.length > 0 ? "items-start" : "items-center justify-center"
					}`}
				>
					<div
						className="mb-14 flex h-fit w-full flex-col-reverse overflow-y-scroll px-3 py-2"
						ref={buyContainer}
					>
						{isMessageDataLoading ? (
							<MessageLoadingSkeleton />
						) : shouldBeInitialChatroomDisplay ? (
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
						) : (
							flattenMessageData?.length > 0 &&
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
											selfMessage={msg.sender_name === user}
										>
											{msg.text}
										</Message>
									</div>
								);
							})
						)}
					</div>
					<span className="invisible opacity-0" ref={lastMessageRef}></span>
					<footer className="absolute bottom-0 w-full rounded-lg bg-background p-2">
						<ChatboxInput
							updateMessageInput={updateMessageInput}
							currentActiveChatroom={currentActiveChatroom}
							messageMutate={messageMutate}
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
