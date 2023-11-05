import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Separator } from "./ui/separator";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { getDateDistance } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import createLike from "@/lib/queries/fetchQuery";
import createNotification from "@/lib/queries/fetchQuery";
import { useToast } from "@/components/ui/use-toast";
import { genericError } from "@/lib/userMessage";
import getUserLikedListing from "@/lib/queries/fetchQuery";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";

export default function ListingCard({ src, prod_id, product_data, lastProductElement, className }) {
	const userLikedListing = safeParse(localStorage.getItem("likedListing")) || [];
	const [liked, setLiked] = useState(userLikedListing);
	const { toast } = useToast();
	const { data: session } = useSession();

	const user = session?.user?.username ?? "";

	const { mutateAsync: likeMutate } = useMutation({
		mutationFn: () =>
			createLike({
				uri: "/listing/like",
				method: "POST",
				body: {
					listing_id: prod_id,
					listing_name: product_data.name,
					seller_name: product_data?.seller_name,
					listing_image: src,
				},
			}),
		onError: (error) => {
			setLiked((prev) => prev.filter((id) => id !== prod_id));
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	const { mutateAsync: notificationMutate } = useMutation({
		mutationFn: () =>
			createNotification({
				uri: "/notification",
				method: "POST",
				body: {
					receiver_name: product_data?.seller_name,
					notification_type: "1",
					link: `/shop/${prod_id}`,
				},
			}),
	});

	const { data: likedListing, refetch } = useQuery({
		queryKey: ["listing", "liked"],
		queryFn: () => getUserLikedListing({ uri: `/listing/like` }),
		refetchOnWindowFocus: false,
		enabled: false,
	});

	// if local Storage is empty, fetch from server of current user liked listing
	useEffect(() => {
		if (user) {
			const localLikedListingData = safeParse(localStorage.getItem("likedListing"));
			const fetchLikedListing = async () => {
				return await refetch();
			};

			!localLikedListingData && fetchLikedListing();
		}
	}, [refetch, user]);

	// This useEffect handles setting to local storage
	useEffect(() => {
		if (user) {
			const setLikedListing = () => {
				if (!likedListing?.data) return;
				const likedListingId = likedListing.data.map((obj) => obj.product_id);

				// const currentLikedListing = localStorage.getItem("likedListing");
				// Check if the lists are different to prevent unnecessary updates
				setLiked(likedListingId); // Remove this to prevent setting state here
				localStorage.setItem("likedListing", JSON.stringify(likedListingId));
			};
			setLikedListing();
		}
	}, [likedListing, user]);

	const onLike = async () => {
		/*
		setLiked((prev) => {
			const likeOrUnLike = prev.includes(prod_id) ? prev.filter((id) => id !== prod_id) : [...prev, prod_id]
			//console.log(likeOrUnLike)
			localStorage.setItem("likedListing", JSON.stringify(likeOrUnLike));
			return likeOrUnLike;
		});
		*/

		setLiked((prev) =>
			prev.includes(prod_id) ? prev.filter((id) => id !== prod_id) : [...prev, prod_id],
		);
		const currLikedListing = safeParse(localStorage.getItem("likedListing"));
		localStorage.setItem(
			"likedListing",
			JSON.stringify(
				currLikedListing.includes(prod_id)
					? currLikedListing.filter((id) => id !== prod_id)
					: [...currLikedListing, prod_id],
			),
		);

		try {
			await Promise.allSettled([likeMutate(), notificationMutate()]);
		} catch (err) {
			console.log(err);
		}
	};

	function safeParse(json) {
		let res = null;
		try {
			res = JSON.parse(json);
		} catch (err) {
			console.log(err);
		}

		return res;
	}

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
				{liked.includes(prod_id) ? (
					<PiHeartFill onClick={onLike} className="h-5 w-5 fill-red-700 hover:cursor-pointer" />
				) : (
					<PiHeart onClick={onLike} className="h-5 w-5 hover:cursor-pointer" />
				)}
			</div>
		</div>
	);
}
