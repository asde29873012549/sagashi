import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { shopSelector } from "@/redux/shopSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getShoppingCart from "@/lib/queries/fetchQuery";
import { setShoppingCartItemCount } from "@/redux/shopSlice";
import { useDispatch } from "react-redux";

export default function ShoppingCartIcon({ user }) {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const shoppingCartItemCount = useSelector(shopSelector).shoppingCartItemCount;

	const { data: shoppingCartData } = useQuery({
		queryKey: ["shoppingCart", "total"],
		queryFn: () => getShoppingCart({ uri: `/user/${user}/shoppingCart/total` }),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		enabled: user ? true : false,
	});

	return (
		<Link href={"/shoppingCart"}>
			<div className="relative">
				{shoppingCartData?.data > 0 && (
					<div
						className={`absolute right-[-6px] top-[-6px] z-50 mb-3 h-5 w-5 animate-opacityTransition rounded-full bg-red-700 text-center text-xs leading-5 text-white`}
					>
						{shoppingCartData.data}
					</div>
				)}
				<ShoppingCart className="h-7 w-7 hover:cursor-pointer" />
			</div>
		</Link>
	);
}
