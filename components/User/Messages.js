import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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

import socket from "@/lib/socketio/client";
import socketInitializer from "@/lib/socketio/socketInitializer";
import socketEventCleaner from "@/lib/socketio/socketEventCleaner";

import { parseISODate, timeDifference } from "@/lib/utils";

export default function Messages({ user, chatroom_id: chatroom_id_from_url }) {
	const [val, setVal] = useState("");
	const { toast } = useToast();
	const [onlineMessage, setOnlineMessage] = useState([]);
	const [offlineMessage, setOfflineMessage] = useState([]);
	const [currentTab, setCurrentTab] = useState(
		(chatroom_id_from_url?.split("-")[1] ?? "") === user ? "buy" : "sell",
	);
	const currentActiveChatroom_id = useRef(chatroom_id_from_url || null);
	const currentChatroom_avatar = useRef(null);
	const sellContainer = useRef();
	const buyContainer = useRef();

	const { data: chatroomList } = useQuery({
		queryKey: ["chatroomList", currentTab],
		queryFn: () =>
			getChatrooms({
				uri: "/message?tab=" + currentTab,
			}),
		refetchOnWindowFocus: false,
	});

	const {
		data: messageData,
		refetch: fetchMessageData,
		isLoading: isMessageDataLoading,
	} = useQuery({
		queryKey: ["messages", currentActiveChatroom_id.current],
		queryFn: () =>
			getMessage({
				uri: `/message/${currentActiveChatroom_id.current}`,
			}),
		refetchOnWindowFocus: false,
		enabled: chatroom_id_from_url ? true : false,
		onSuccess: (initialMessageData) => {
			setOfflineMessage(initialMessageData.data);
		},
	});

	useEffect(() => {
		if (currentActiveChatroom_id.current) {
			const chatroom_id = currentActiveChatroom_id.current;
			const [product_id, listingOwner, client] = chatroom_id.split("-");
			socketInitializer(setOnlineMessage);

			socket.io.opts.query.user = client;
			socket.io.opts.query.listingOwner = listingOwner;
			socket.io.opts.query.productId = product_id;
		}

		return () => {
			console.log("socket disconnectd");
			socketEventCleaner(socket);
			socket.disconnect();
		};
	}, [currentActiveChatroom_id.current]);

	useEffect(() => {
		if (currentActiveChatroom_id.current) {
			socket.connect();
		}
	}, [currentActiveChatroom_id.current]);

	useEffect(() => {
		if (currentTab === "sell" && sellContainer.current) {
			sellContainer.current.scrollTop = sellContainer.current.scrollHeight;
		} else if (currentTab === "buy" && buyContainer.current) {
			buyContainer.current.scrollTop = buyContainer.current.scrollHeight;
		}
	}, [onlineMessage]);

	const offlineChatroom = chatroomList?.data ?? [];

	const mes_type_helper_offline = (msg) => {
		const sender = msg.last_sent_user_name === user ? "You" : msg.last_sent_user_name;
		return received_message(sender, msg.last_message, msg.updatedAt);
	};

	const onInput = (e) => {
		setVal(e.target.value);
	};

	const onOpenChatroom = (chatroom_id, chatroom_avatar) => {
		currentActiveChatroom_id.current = chatroom_id;
		currentChatroom_avatar.current = chatroom_avatar;
		fetchMessageData();
	};

	const onPressEnter = async (e) => {
		if (e.keyCode === 13) {
			// check who should be the recipient
			const [product_id, listingOwner, recipient] = currentActiveChatroom_id.current?.split("-");

			if (!recipient)
				return toast({
					title: "Failed !",
					description: genericError,
					status: "fail",
				});

			socket.emit("message", {
				message: { created_at: new Date().toISOString(), text: val, sender_name: user },
				client: recipient,
			});
			// add message to message lists
			setOnlineMessage((m) => [
				...m,
				{ created_at: new Date().toISOString(), text: val, sender_name: user },
			]);
			// clear input
			setVal("");

			// fetch message to database
			try {
				const res = createMessage({
					uri: "/message",
					method: "POST",
					body: {
						product_id,
						seller_name: listingOwner,
						buyer_name: recipient,
						isFirstMessage: onlineMessage.length === 0 && offlineMessage.length === 0,
						image: currentChatroom_avatar.current,
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

	const onChangeTab = (tab) => {
		setCurrentTab(tab);
		setOnlineMessage([]);
		setOfflineMessage([]);
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
					{offlineChatroom &&
						offlineChatroom.length > 0 &&
						offlineChatroom.map((msg, index) => {
							const content = mes_type_helper_offline(msg);
							return (
								<ItemCard
									key={`message-${msg.created_at}-${index}-offline`}
									src={msg.chatroom_avatar}
									setIsOpen={() => onOpenChatroom(msg.id, msg.chatroom_avatar)}
								>
									{content}
								</ItemCard>
							);
						})}
				</aside>
				<div
					className={`relative flex h-[500px] grow flex-col overflow-scroll rounded-lg border-2 border-sky-900 ${
						onlineMessage.length > 0 || offlineMessage.length > 0
							? "items-start"
							: "items-center justify-center"
					}`}
				>
					<div
						className="flex h-[calc(100%-56px)] w-full flex-col overflow-y-scroll px-3 py-2"
						ref={sellContainer}
					>
						{offlineMessage.length > 0 ? (
							offlineMessage.map((msg, index) => {
								const ISOdate = msg.createdAt;
								const prevDate = offlineMessage[index - 1]?.createdAt;
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
						{onlineMessage.length > 0 &&
							onlineMessage.map((msg, index) => {
								const ISOdate = msg.created_at;
								const prevDate = offlineMessage[index - 1]?.created_at;
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
							})}
					</div>
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
					{offlineChatroom &&
						offlineChatroom.length > 0 &&
						offlineChatroom.map((msg, index) => {
							const content = mes_type_helper_offline(msg);
							return (
								<ItemCard
									key={`message-${msg.created_at}-${index}-offline`}
									src={msg.chatroom_avatar}
									setIsOpen={() => onOpenChatroom(msg.id, msg.chatroom_avatar)}
								>
									{content}
								</ItemCard>
							);
						})}
				</aside>
				<div
					ref={buyContainer}
					className={`relative flex h-[500px] grow flex-col overflow-scroll rounded-lg border-2 border-sky-900 ${
						onlineMessage.length > 0 || offlineMessage.length > 0
							? "items-start"
							: "items-center justify-center"
					}`}
				>
					<div
						className="flex h-[calc(100%-56px)] w-full flex-col overflow-y-scroll px-3 py-2"
						ref={buyContainer}
					>
						{offlineMessage.length > 0 ? (
							offlineMessage.map((msg, index) => {
								const ISOdate = msg.createdAt || msg.created_at;
								const prevDate =
									offlineMessage[index - 1]?.createdAt || offlineMessage[index - 1]?.created_at;
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
						{onlineMessage.length > 0 &&
							onlineMessage.map((msg, index) => {
								const ISOdate = msg.created_at;
								const prevDate = offlineMessage[index - 1]?.created_at;
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
							})}
					</div>
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

/*<TabsContent value="buy" className="relative box-border flex space-x-6 rounded-lg">
				<aside
					className={`relative box-content flex h-[500px] w-[400px] shrink-0 flex-col items-center justify-start overflow-scroll rounded-lg border-2 border-sky-900`}
				>
					{offlineChatroom &&
						offlineChatroom.length > 0 &&
						offlineChatroom.map((msg, index) => {
							const content = mes_type_helper_offline(msg);
							return (
								<ItemCard
									key={`message-${msg.created_at}-${index}-offline`}
									src={msg.chatroom_avatar}
									setIsOpen={() => onOpenChatroom(msg.id)}
								>
									{content}
								</ItemCard>
							);
						})}
				</aside>
				<div
					className={`relative flex h-[500px] grow flex-col overflow-scroll rounded-lg border-2 border-sky-900 px-3 ${
						onlineMessage.length > 0 || messageData?.data.length > 0
							? "items-end justify-start"
							: "items-center justify-center"
					}`}
				>
					<div className="flex h-[calc(100%-56px)] w-full flex-col overflow-y-scroll px-3 py-2">
						{offlineMessage.length > 0 ? (
							offlineMessage.map((message, index) => (
								<Message key={`${message.chatroom_id}-${index}`}>{message.text}</Message>
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
						{onlineMessage.length > 0 &&
							onlineMessage.map((message, index) => (
								<Message key={`${message}-${index}`}>{message}</Message>
							))}
					</div>
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
			</TabsContent>*/
