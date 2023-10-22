import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Separator } from "./ui/separator";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { getDateDistance } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import createLike from "@/lib/queries/fetchQuery";
import { useToast } from "@/components/ui/use-toast";
import { genericError } from "@/lib/userMessage";

import { useState } from "react";

export default function ListingCard({ src, prod_id, product_data, lastProductElement, className }) {
	const [liked, setLiked] = useState(false);
	const { toast } = useToast();

	const onLike = async () => {
		setLiked((prev) => !prev);
		try {
			await likeMutate();
		} catch (err) {
			console.log(err);
		}
	};

	const { mutateAsync: likeMutate } = useMutation({
		mutationFn: () =>
			createLike({
				uri: "/listing/like",
				method: "POST",
				body: { listing_id: prod_id, listing_name: product_data.name },
			}),
		onError: (error) => {
			setLiked((prev) => !prev);
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	return (
		<div className={`mb-5 h-fit ${className}`} ref={lastProductElement ? lastProductElement : null}>
			<Link href={`/shop/${prod_id}`}>
				<div className="relative aspect-[4/5] w-full">
					<Image src={src} fill={true} alt="pic" sizes="(max-width: 768px) 50vw, 33vw" />
				</div>
			</Link>
			<div className="text-sm text-gray-500">{getDateDistance(product_data.created_at)}</div>
			<Separator />
			<div className="flex w-full items-center justify-between">
				<Link href={`/shop/${prod_id}`} className="w-5/6">
					<div className="truncate text-base font-semibold text-foreground">
						{product_data.name}
					</div>
				</Link>
				<div className="flex w-1/6 justify-end text-sm text-foreground">
					{product_data.size || product_data.Size?.name}
				</div>
			</div>
			<div className="truncate text-xs text-foreground">{product_data.designer}</div>
			<div className="flex items-center justify-between text-sm text-foreground">
				<div className="before:content-['$']">{product_data.price}</div>
				{liked ? (
					<PiHeartFill onClick={onLike} className="h-5 w-5 fill-red-700 hover:cursor-pointer" />
				) : (
					<PiHeart onClick={onLike} className="h-5 w-5 hover:cursor-pointer" />
				)}
			</div>
		</div>
	);
}
