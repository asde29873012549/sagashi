import { MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ItemCard from "./ItemCard";
import { received_message } from "@/lib/msg_template";
import { useState } from "react";

export default function MessageIcon({
	user,
	messageActive,
	onMessageIconClick,
	onlineMessage,
	offlineMessage,
}) {
	const [isOpen, setIsOpen] = useState(false);

	const mes_type_helper_online = (msg) => {
		const sender = msg.sender_name === user ? "You" : msg.sender_name;
		return received_message(sender, msg.text);
	};

	const mes_type_helper_offline = (msg) => {
		const sender = msg.last_sent_user_name === user ? "You" : msg.last_sent_user_name;
		return received_message(sender, msg.last_message);
	};

	const onOpenMessageIcon = () => {
		setIsOpen((o) => !o);
	};

	const onRouteToNotification = () => {
		setIsOpen(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={onOpenMessageIcon}>
			<PopoverTrigger className="relative flex">
				{/* Notification Circle */}
				<div
					className={`absolute right-[1px] z-50 mb-3 h-2.5 w-2.5 rounded-full bg-red-700 
					${!onlineMessage.length || !messageActive ? "md:hidden" : ""}`} // Hide on desktop if no new message
				></div>

				{/* Message Icon */}
				<MessageCircle className="h-7 w-7" onClick={onMessageIconClick} />
			</PopoverTrigger>

			<PopoverContent
				className={`mr-4 max-h-[70dvh] ${onlineMessage.length > 0 ? "" : "mr-1"} overflow-y-scroll`}
			>
				{onlineMessage.map((msg, index) => {
					const content = mes_type_helper_online(msg);
					return (
						<ItemCard
							key={`${msg.created_at}-${index}-online`}
							src={msg.image}
							timing={msg.created_at || msg.createdAt}
							setIsOpen={setIsOpen}
						>
							{content}
						</ItemCard>
					);
				})}
				{offlineMessage &&
					offlineMessage.length > 0 &&
					offlineMessage.map((msg, index) => {
						const content = mes_type_helper_offline(msg);
						return (
							<ItemCard
								key={`${msg.created_at}-${index}-offline`}
								src={msg.image}
								timing={msg.created_at || msg.createdAt}
								setIsOpen={onRouteToNotification}
							>
								{content}
							</ItemCard>
						);
					})}
				{!onlineMessage.length && !offlineMessage.length && (
					<div className="flex h-6 w-60 items-center justify-center text-gray-500">
						No new message
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}
