import { getDateDistance } from "@/lib/utils";
import { Dot } from "lucide-react";

const likeListing = (user, listing_name) => {
	return (
		<>
			<span className="font-semibold">{user}</span> liked your listing :{" "}
			<span className="font-semibold">{listing_name}</span>
		</>
	);
};

const gotFollowed = (user) => {
	return (
		<>
			<span className="font-semibold">{user}</span> started following you
		</>
	);
};

const receivedOrder = (user, listing_name) => {
	return (
		<>
			<span className="font-semibold">{user}</span> has placed an order on your listing{" "}
			<span className="font-semibold">{listing_name}</span>
		</>
	);
};

const uploadListing = (user, listing_name) => {
	return (
		<>
			<span className="font-semibold">{user}</span> has uploaded a new listing :{" "}
			<span className="font-semibold">{listing_name}</span>
		</>
	);
};

const received_message = (last_sent_user_name, text, timing) => {
	return (
		<div>
			<span className="font-semibold">{last_sent_user_name}</span>
			<br />
			<div className="flex items-center justify-start text-info">
				<div className="!w-[30%] overflow-hidden text-ellipsis whitespace-nowrap font-normal">
					{text}
				</div>
				<Dot size={24} />
				<span className="shrink-0 text-xs">{getDateDistance(timing)}</span>
			</div>
		</div>
	);
};

export { gotFollowed, likeListing, receivedOrder, uploadListing, received_message };
