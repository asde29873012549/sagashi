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

export { gotFollowed, likeListing, receivedOrder };
