import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInterSectionObserver from "@/lib/hooks/useIntersectionObserver";
import getProducts from "@/lib/queries/fetchQuery";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import { useState } from "react";
import EditProductDialog from "../EditProductDialog";

export default function MyItems({ user }) {
	const {
		data: productData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["products", {}, user],
		queryFn: () =>
			getProducts({
				uri: `/listing?user=${user}`,
				method: "POST",
				body: {},
			}),
		getNextPageParam: (lastPage, pages) =>
			// check if there is a next page by checking the sort property of elastic search result
			lastPage?.data?.result[lastPage.data.result.length - 1]?.sort,
		refetchOnWindowFocus: false,
	});

	const lastProductElement = useInterSectionObserver({
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	});

	return (
		<div>
			<h1 className="mb-8 flex text-xl font-medium text-foreground">
				<Dot size={32} />
				FOR SELL
			</h1>
			{(productData?.pages ?? []).map((page, pageIndex) => {
				const pageData = page.data.result || [];
				return pageData.map((product, productIndex) => {
					return (
						<MyItemCard
							key={`${pageIndex}-${productIndex}`}
							productData={product}
							lastProductElement={
								productData?.pages?.[0]?.data?.result.length === pageIndex + 1
									? lastProductElement
									: null
							}
							user={user}
						/>
					);
				});
			})}
			<h1 className="my-8 flex text-xl font-medium text-foreground">
				<Dot size={32} />
				SOLD
			</h1>
		</div>
	);
}

function MyItemCard({ productData, lastProductElement, user }) {
	const [isOpen, setIsOpen] = useState(false);

	const onEditProduct = (id) => {
		setIsOpen(true);
	};
	return (
		<>
			<div
				className="flex h-28 w-full items-center space-x-4 rounded-md px-3 py-2 hover:bg-slate-200"
				ref={lastProductElement}
			>
				<Avatar className="h-20 w-20">
					<AvatarImage src={productData?.primary_image} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="flex w-full justify-between">
					<span>
						<div className="text-base font-semibold">Product Name : {productData?.name}</div>
						<div className="text-sm italic underline">{productData?.designer}</div>
						<div className="text-sm">Size {productData?.size}</div>
					</span>
					<span className="flex flex-col items-end text-sm">
						<div>{productData?.condition}</div>
						<div className="before:content-['$']">{productData?.price}</div>
						<Button
							variant="secondary"
							className="mt-3 h-8 hover:bg-sky-900 hover:text-background"
							onClick={() => onEditProduct(productData?.prod_id)}
						>
							Edit
						</Button>
					</span>
				</div>
			</div>
			<Separator />
			{isOpen && (
				<EditProductDialog
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					productData={productData}
					user={user}
				/>
			)}
		</>
	);
}
