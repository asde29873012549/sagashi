import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Message from "@/components/Message";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ItemCard from "../ItemCard";
import { useQuery } from "@tanstack/react-query";
import getMessages from "@/lib/queries/fetchQuery";
import createMessage from "@/lib/queries/fetchQuery";
import { received_message } from "@/lib/msg_template";

export default function Messages({ user }) {
	const [val, setVal] = useState("");
	const { toast } = useToast();
	const [message, setMessages] = useState([]);

	const { data: messageData } = useQuery({
		queryKey: ["messageList"],
		queryFn: () =>
			getMessages({
				uri: "/message",
			}),
		refetchOnWindowFocus: false,
	});

	const offlineMessage = messageData?.data ?? [];

	const mes_type_helper_offline = (msg) => {
		const sender = msg.last_sent_user_name === user ? "You" : msg.last_sent_user_name;
		return received_message(sender, msg.last_message);
	};

	const onInput = (e) => {
		setVal(e.target.value);
	};

	const onOpenChatroom = () => {
		console.log("open chatroom");
	};

	const onPressEnter = async (e) => {
		/*if (e.keyCode === 13) {
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
		}*/
	};

	return (
		<Tabs defaultValue="sell" className="w-full">
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
					className={`relative flex h-[500px] w-2/6 flex-col items-center justify-start overflow-scroll rounded-lg border-2 border-sky-900`}
				>
					{offlineMessage &&
						offlineMessage.length > 0 &&
						offlineMessage.map((msg, index) => {
							const content = mes_type_helper_offline(msg);
							return (
								<ItemCard
									key={`message-${msg.created_at}-${index}-offline`}
									src={msg.image}
									timing={msg.created_at || msg.createdAt}
									setIsOpen={onOpenChatroom}
								>
									{content}
								</ItemCard>
							);
						})}
				</aside>
				<div
					className={`relative flex h-[500px] w-4/6 flex-col overflow-scroll rounded-lg border-2 border-sky-900 px-3 ${
						message.length > 0 ? "items-end justify-start" : "items-center justify-center"
					}`}
				>
					<div>
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
					</div>
					<footer className="absolute bottom-0 w-80 w-full rounded-lg bg-background p-2">
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
			<TabsContent value="buy" className="relative box-border flex space-x-6 rounded-lg">
				<aside
					className={`relative flex h-[500px] w-2/6 flex-col items-center justify-start overflow-scroll rounded-lg border-2 border-sky-900`}
				>
					{offlineMessage &&
						offlineMessage.length > 0 &&
						offlineMessage.map((msg, index) => {
							const content = mes_type_helper_offline(msg);
							return (
								<ItemCard
									key={`message-${msg.created_at}-${index}-offline`}
									src={msg.image}
									timing={msg.created_at || msg.createdAt}
									setIsOpen={onOpenChatroom}
								>
									{content}
								</ItemCard>
							);
						})}
				</aside>
				<div
					className={`relative flex h-[500px] w-4/6 flex-col overflow-scroll rounded-lg border-2 border-sky-900 px-3 ${
						message.length > 0 ? "items-end justify-start" : "items-center justify-center"
					}`}
				>
					<div>
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
					</div>
					<footer className="absolute bottom-0 w-80 w-full rounded-lg bg-background p-2">
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
