import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInterSectionObserver from "@/lib/hooks/useIntersectionObserver";
import getProducts from "@/lib/queries/fetchQuery";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MyItems({ user }) {
	const [isOpen, setIsOpen] = useState(false);
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
							setIsOpen={setIsOpen}
							lastProductElement={
								productData?.pages?.[0]?.data?.result.length === pageIndex + 1
									? lastProductElement
									: null
							}
						/>
					);
				});
			})}
			<h1 className="my-8 flex text-xl font-medium text-foreground">
				<Dot size={32} />
				SOLD
			</h1>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="p-6 sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Product</DialogTitle>
						<DialogDescription>
							Make changes to your product here. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Item Name
							</Label>
							<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="condition" className="text-right">
								Condition
							</Label>
							<Input id="condition" defaultValue="Pedro Duarte" className="col-span-3" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Input id="description" defaultValue="Pedro Duarte" className="col-span-3" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="tags" className="text-right">
								Tags
							</Label>
							<Input id="tags" defaultValue="Pedro Duarte" className="col-span-3" />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function MyItemCard({ productData, lastProductElement, setIsOpen }) {
	const onEditProduct = () => {
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
							onClick={onEditProduct}
						>
							Edit
						</Button>
					</span>
				</div>
			</div>
			<Separator />
		</>
	);
}
