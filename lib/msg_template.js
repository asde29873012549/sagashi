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

const received_message = (last_sent_user_name, text) => {
	return (
		<>
			<span className="font-semibold">{last_sent_user_name}</span>
			<br />
			<span className="font-normal">{text}</span>
		</>
	);
};

export { gotFollowed, likeListing, receivedOrder, uploadListing, received_message };
