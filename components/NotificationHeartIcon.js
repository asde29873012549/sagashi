import { Heart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ItemCard from "./ItemCard";
import { likeListing, gotFollowed, receivedOrder, uploadListing } from "@/lib/msg_template";
import { useState } from "react";

export default function MessageIcon({
	notificationActive,
	onNotificationHeartIconClick,
	onlineNotification,
	offlineNotification,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const mes_type_helper = (msg) => {
		let content = "";
		switch (msg.type) {
			case "notification.like":
				content = likeListing(
					msg.username || msg.sender_name,
					msg.listing_name || msg.content.listing_name,
				);
				break;
			case "notification.follow":
				content = gotFollowed(msg.username || msg.sender_name);
				break;
			case "notification.uploadListing":
				content = uploadListing(
					msg.username || msg.sender_name,
					msg.listing_name || msg.content.listing_name,
				);
				break;
			case "notification.order":
				content = receivedOrder(
					msg.username || msg.sender_name,
					msg.listing_name || msg.content.listing_name,
				);
				break;
		}

		return content;
	};

	const onToggleMessageIcon = () => {
		setIsOpen((o) => !o);
	};

	return (
		<Popover open={isOpen} onOpenChange={onToggleMessageIcon}>
			<PopoverTrigger className="relative flex">
				{/* Notification Circle */}
				<div
					className={`absolute right-[-2px] top-[0px] z-50 mb-3 h-2.5 w-2.5 rounded-full bg-red-700 
					${!onlineNotification?.length || !notificationActive ? "hidden" : ""}`} // Hide if no new message
				></div>

				{/* Message Icon */}
				<Heart className="h-7 w-7" onClick={onNotificationHeartIconClick} />
			</PopoverTrigger>

			<PopoverContent
				className={`mr-4 max-h-[70dvh] md:mr-8 ${
					onlineNotification?.length > 0 ? "" : "mr-1"
				} overflow-y-scroll`}
			>
				{onlineNotification?.map((msg, index) => {
					const content = mes_type_helper(msg);
					return (
						<ItemCard
							key={`${msg.created_at}-${index}-online`}
							src={msg.image}
							timing={msg.created_at}
							link={msg.link}
							setIsOpen={onToggleMessageIcon}
							notification_id={msg.id}
							// read_at={msg.read_at}
						>
							{content}
						</ItemCard>
					);
				})}
				{offlineNotification &&
					offlineNotification.length > 0 &&
					offlineNotification.map((msg, index) => {
						const content = mes_type_helper(msg);
						return (
							<ItemCard
								key={`${msg.created_at}-${index}-offline`}
								src={msg.image}
								timing={msg.created_at}
								link={msg.link}
								setIsOpen={onToggleMessageIcon}
								notification_id={msg.id}
								read_at={msg.read_at}
							>
								{content}
							</ItemCard>
						);
					})}
				{!onlineNotification?.length && !offlineNotification?.length && (
					<div className="flex h-14 w-60 items-center justify-center text-gray-500">
						No new message
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}
