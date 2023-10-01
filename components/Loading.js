import { useSelector } from "react-redux";
import { loadingSelector } from "../redux/loadingSlice";

export default function Loading() {
	const isLoadingActive = useSelector(loadingSelector).active;
	return (
		<div
			className={
				isLoadingActive
					? `fixed inset-0 z-[1000] flex h-screen w-screen items-center justify-center bg-black/70`
					: "hidden"
			}
		>
			<div className="absolute h-12 w-12 animate-spin rounded-md border-[5px] border-t-4 border-cyan-600"></div>
		</div>
	);
}
