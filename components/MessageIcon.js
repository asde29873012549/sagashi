import { MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ItemCard from "./ItemCard";
import { received_message } from "@/lib/msg_template";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getMessages from "@/lib/queries/fetchQuery";
import { useDispatch } from "react-redux";
import { setMessageReadStatus } from "@/redux/messageSlice";

export default function MessageIcon({ user, chatroom, setChatroom, isMobile }) {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);

	const { refetch: fetchChatroomList } = useQuery({
		queryKey: ["chatroomList"],
		queryFn: () =>
			getMessages({
				uri: "/message",
			}),
		refetchOnWindowFocus: false,
		onSuccess: (initialChatroomList) => {
			setChatroom(initialChatroomList.data);
			dispatch(
				setMessageReadStatus(
					initialChatroomList.data?.map((c) => ({ chatroom_id: c.id, read_at: c.read_at })),
				),
			);
		},
	});

	const mes_type_helper = (msg) => {
		const sender =
			msg.sender_name === user || msg.last_sent_user_name === user
				? "You"
				: msg.sender_name || msg.last_sent_user_name;
		return received_message(sender, msg.text, msg.created_at || msg.updated_at);
	};

	const onToggleMessageIcon = () => {
		setIsOpen((o) => !o);
	};

	const shouldShowMessageCircle = () => {
		let yes = false;
		chatroom?.forEach((msg) => {
			if (!msg.read_at) yes = true;
		});

		return yes;
	};

	return (
		<Popover open={isOpen} onOpenChange={onToggleMessageIcon}>
			<PopoverTrigger className="relative flex" onClick={fetchChatroomList}>
				{/* Notification Circle */}
				<div
					className={`absolute right-[1px] z-50 mb-3 h-2.5 w-2.5 rounded-full bg-red-700 
					${shouldShowMessageCircle() ? "" : "hidden"}`} // Hide on desktop if no new message
				></div>

				{/* Message Icon */}
				<MessageCircle className="h-7 w-7" />
			</PopoverTrigger>

			<PopoverContent
				className={`mr-4 max-h-[70dvh] ${chatroom.length > 0 ? "" : "mr-1"} overflow-y-scroll`}
			>
				{chatroom &&
					chatroom.length > 0 &&
					chatroom.map((msg, index) => {
						const content = mes_type_helper(msg);
						return (
							<ItemCard
								user={user}
								key={`${msg.updated_at || msg.created_at}-${index}-msg`}
								src={msg.chatroom_avatar || msg.image}
								link={isMobile ? "" : msg.link}
								setIsOpen={onToggleMessageIcon}
								read_at={msg.read_at}
								message_id={msg.last_message || ""}
								chatroom_id={msg.id}
							>
								{content}
							</ItemCard>
						);
					})}
				{!chatroom.length && (
					<div className="flex h-14 w-60 items-center justify-center text-gray-500">
						No new message
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}
