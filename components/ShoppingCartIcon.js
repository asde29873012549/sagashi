import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { shopSelector } from "@/redux/shopSlice";

export default function ShoppingCartIcon() {
	const shoppingCartItemCount = useSelector(shopSelector).shoppingCartItemCount;

	return (
		<Link href={"/shoppingBag"}>
			<div className="relative">
				{shoppingCartItemCount && (
					<div
						className={`absolute right-[-6px] top-[-6px] z-50 mb-3 h-5 w-5 animate-opacityTransition rounded-full bg-red-700 text-center text-xs leading-5 text-white`}
					>
						{shoppingCartItemCount}
					</div>
				)}
				<ShoppingCart className="h-7 w-7 hover:cursor-pointer" />
			</div>
		</Link>
	);
}
