import { LuMessageCircle } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ItemCard from "./ItemCard";
import { likeListing, gotFollowed, receivedOrder, uploadListing } from "@/lib/msg_template";

export default function MessageIcon({ message, messageActive, onMessageIconClick }) {
	const mes_type_helper = (message) => {
		message.forEach((msg) => {
			switch (msg.type) {
				case "notification.like":
					msg.content = likeListing(msg.username, msg.listing_name);
					break;
				case "notification.follow":
					msg.content = gotFollowed(msg.username);
					break;
				case "notification.uploadListing":
					msg.content = uploadListing(msg.username, msg.listing_name);
					break;
				case "notification.order":
					msg.content = receivedOrder(msg.username, msg.listing_name);
					break;
			}
		});
	};

	return (
		<Popover>
			<PopoverTrigger className="relative flex">
				{/* Notification Circle */}
				<div
					className={`absolute right-[1px] z-50 mb-3 h-2.5 w-2.5 rounded-full bg-red-700 
					${!message.length || !messageActive ? "md:hidden" : ""}`} // Hide on desktop if no message
				></div>

				{/* Message Icon */}
				<LuMessageCircle className="h-7 w-7" onClick={onMessageIconClick} />
			</PopoverTrigger>

			<PopoverContent className={`mr-4 max-h-[80%] ${message.length > 0 ? "" : "mr-1"}`}>
				{message.length > 0 ? (
					message.map((msg, index) => {
						mes_type_helper(message);
						return (
							<ItemCard key={`${msg.username}-${index}`} src={msg.image} timing={msg.timing}>
								{msg.content}
							</ItemCard>
						);
					})
				) : (
					<div className="flex h-6 w-60 items-center justify-center px-6 py-8 text-gray-500">
						No new message
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}

/*
<Popover>
			<PopoverTrigger className="relative">
				<div className="absolute right-[2px] z-50 mb-3 h-2.5 w-2.5 rounded-full bg-red-700 md:hidden"></div>
				<LuMessageCircle className="h-7 w-7 md:hidden" />
			</PopoverTrigger>
			<PopoverContent className="mr-1 max-h-[80%]">
				{message.length > 0 ? (
					message.map((msg, index) => {
						mes_type_helper(message);
						return (
							<ItemCard
								key={`${msg.username}-${index}`}
								src={"https://github.com/shadcn.png"}
								postTime={"3 min"}
							>
								{msg.content}
							</ItemCard>
						);
					})
				) : (
					<div className="flex h-6 w-60 items-center justify-center text-gray-500">
						No new message
					</div>
				)}
			</PopoverContent>
		</Popover>
*/
