export default function Message({ children, selfMessage }) {
	return (
		<div className={`flex w-full ${selfMessage ? "justify-end" : "justify-start"}`}>
			<span
				className={`my-0.5 w-fit border-2 px-3 py-1 text-sm ${
					selfMessage ? "rounded-l-3xl rounded-r-lg" : "rounded-l-lg rounded-r-3xl"
				}`}
			>
				{children}
			</span>
		</div>
	);
}
