export default function Message({ className = "", children, selfMessage, lastMessageElement }) {
	return (
		<div
			className={`flex w-full ${selfMessage ? "justify-end" : "justify-start"}`}
			ref={lastMessageElement}
		>
			<span
				className={`my-0.5 w-fit max-w-[60%] rounded-3xl border-2 px-3 py-1 text-sm ${className}`}
			>
				{children}
			</span>
		</div>
	);
}
