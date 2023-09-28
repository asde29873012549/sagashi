export default function Spinner() {
	return (
		<div className="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-gray-500/50">
			<span className="relative inline-block h-16 w-16 animate-[spin_3s_linear_infinite] rounded-full border-[6px] border-dotted border-white"></span>
		</div>
	);
}
