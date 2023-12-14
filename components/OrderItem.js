import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteShoppingCartItem from "@/lib/queries/fetchQuery";
import { useToast } from "@/components/ui/use-toast";
import { genericError, deleteSuccess } from "@/lib/userMessage";

export default function OderItem({ username, cartData }) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate: shoppingCartMutate } = useMutation({
		mutationFn: () =>
			deleteShoppingCartItem({
				uri: `/user/${username}/shoppingCart/${cartData.product_id}`,
				method: "DELETE",
			}),
		onSuccess: () => {
			toast({
				title: deleteSuccess.title,
				description: deleteSuccess.desc,
				status: deleteSuccess.status,
			});
		},
		onError: () => {
			// invalidate both shoppingCart and shoppingCartTotal query
			queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	const onDelete = () => {
		queryClient.setQueryData(["shoppingCart"], (oldData) => {
			return {
				...oldData,
				data: oldData.data.filter((obj) => obj.product_id !== cartData.product_id),
			};
		});
		queryClient.setQueryData(["shoppingCart", "total"], (oldData) => {
			return { ...oldData, data: oldData.data - 1 };
		});
		shoppingCartMutate();
	};

	return (
		<div className="flex flex-col">
			<Separator />
			<div className="flex items-center justify-between">
				<div className="mt-2">
					<span>Sending From</span>
					<span className="ml-2 font-bold">@{cartData.seller_name}</span>
				</div>
			</div>
			<div className="mt-2 flex w-full justify-between space-x-1">
				<div className="flex w-11/12">
					<div className="relative aspect-[4/5] w-2/5 max-w-[160px] shrink-0">
						<Image src={cartData.primary_image} fill={true} alt="test" />
					</div>
					<div className="ml-4 flex w-3/5 flex-col justify-between">
						<div>
							<div className="w-full text-lg font-semibold ">{cartData.product_name}</div>
							<div className="w-full truncate text-sm underline">{cartData.Designer?.name}</div>
							<div className="w-full text-xs text-info">
								<span>ID</span>
								<span className="ml-2">{cartData.product_id}</span>
							</div>
						</div>

						<Button variant="outline" className="h-8 w-fit p-4 text-base">
							Size {cartData.Size?.name}
						</Button>
					</div>
				</div>
				<div className="flex w-1/12 flex-col items-end justify-between text-sm">
					<XCircle
						onClick={onDelete}
						className="hover:cursor-pointer hover:stroke-current hover:text-rose-700"
					/>
					<div className="flex flex-col items-end">
						<div
							className={`ml-1 before:content-['$'] ${
								cartData.Discount || cartData.Offer ? "line-through" : ""
							}`}
						>
							{cartData.price}
						</div>
						{(cartData.Discount || cartData.Offer) && (
							<div className="flex items-center">
								<div className="text-xs">{cartData.Discount ? "(DISCOUNT)" : "(OFFER)"}</div>
								<div className="ml-1 text-red-800 before:content-['$']">
									{(cartData.Discount ? cartData.Discount : cartData.Offer) * cartData.price}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
