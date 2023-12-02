import { MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ItemCard from "./ItemCard";
import { received_message } from "@/lib/msg_template";
import { useState } from "react";

export default function MessageIcon({ user, messageActive, onMessageIconClick, chatroom }) {
	const [isOpen, setIsOpen] = useState(false);

	const mes_type_helper = (msg) => {
		const sender =
			msg.last_sent_user_name === user || msg.sender_name === user
				? "You"
				: msg.last_sent_user_name || msg.sender_name;
		return received_message(
			sender,
			msg.last_message || msg.text,
			msg.updatedAt || msg.createdAt || msg.created_at,
		);
	};

	const onToggleMessageIcon = () => {
		setIsOpen((o) => !o);
	};

	return (
		<Popover open={isOpen} onOpenChange={onToggleMessageIcon}>
			<PopoverTrigger className="relative flex">
				{/* Notification Circle */}
				<div
					className={`absolute right-[1px] z-50 mb-3 h-2.5 w-2.5 rounded-full bg-red-700 
					${!chatroom.length || !messageActive ? "md:hidden" : ""}`} // Hide on desktop if no new message
				></div>

				{/* Message Icon */}
				<MessageCircle className="h-7 w-7" onClick={onMessageIconClick} />
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
								key={`${msg.updatedAt || msg.createdAt || msg.created_at}-${index}-offline`}
								src={msg.chatroom_avatar || msg.image}
								link={msg.link}
								setIsOpen={onToggleMessageIcon}
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
