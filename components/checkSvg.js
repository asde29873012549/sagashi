export default function CheckSvg() {
	return (
		<div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="lucide lucide-check"
			>
				<path
					style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
					className="animate-svg"
					d="M4 12 L9 17 L20 6"
				/>
			</svg>
		</div>
	);
}
