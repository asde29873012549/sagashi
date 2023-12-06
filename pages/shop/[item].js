import Carousel from "../../components/Carousel";
import { Button } from "@/components/ui/button";
import ListingCard from "../../components/ListingCard";
import MessageBoxMobile from "../../components/MessageBoxMobile";
import MessageBoxDesktop from "../../components/MessageBoxDesktop";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import getSingleListing from "@/lib/queries/fetchQuery";
import getRecentlyViwed from "@/lib/queries/fetchQuery";
import { useRouter } from "next/router";

import { getToken } from "next-auth/jwt";

import { useState } from "react";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

export default function ListingItem({ username, product_id }) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const { data: listingData } = useQuery({
		queryKey: ["products", { id: router.query.item }],
		queryFn: ({ queryKey }) => getSingleListing({ uri: `/listing/${queryKey[1].id}` }),
		refetchOnWindowFocus: false,
	});

	const createQueryKeyStr = (obj) => {
		if (!obj || typeof obj !== "object") return "";

		const str = Object.keys(obj).reduce((acc, key) => {
			acc += `${key}=${obj[key]}&`;
			return acc;
		}, "");
		return str.slice(0, -1);
	};

	const { data: mayAlsoLikeData } = useQuery({
		queryKey: [
			"products",
			{
				subCategory: listingData?.data[0].subCategory,
				category: listingData?.data[0].category,
				department: listingData?.data[0].department,
				designer: listingData?.data[0].designer,
			},
		],
		queryFn: ({ queryKey }) =>
			getSingleListing({ uri: `/listing/similar?${createQueryKeyStr(queryKey[1])}` }),
		refetchOnWindowFocus: false,
	});

	const { data: recentlyViewedData } = useQuery({
		queryKey: ["products", "recentlyViwed"],
		queryFn: () => getRecentlyViwed({ uri: `/listing/recentlyViewed` }),
		refetchOnWindowFocus: false,
	});

	const onCloseMessageBox = () => {
		setIsOpen((o) => !o);
	};

	const onAddShoppingCart = async () => {
		//
	};

	const productData = listingData?.data[0] ?? {};
	const secondaryImages = productData.secondary_image
		? JSON.parse(productData.secondary_image)
		: {};

	return (
		<div className="mt-10 w-screen md:mt-0 md:px-[6%]">
			<div className="relative flex flex-col items-center justify-between md:flex-row">
				<Carousel
					className="md:z-2 md:mx-auto"
					primary_image={productData.primary_image}
					secondary_images={secondaryImages}
				/>
				<div className="flex flex-col px-3 md:absolute md:w-full md:flex-row md:justify-between">
					<div className="items-between flex flex-col justify-center md:w-1/4">
						<div className="text-xl font-semibold">{productData.designer}</div>
						<div className="mb-6 text-base">{productData.name}</div>
						<div className="flex">
							<div className="mr-1">Size :</div>
							<div>{productData.size}</div>
						</div>
						<div className="flex">
							<div className="mr-1">Color :</div>
							<div>{productData.color}</div>
						</div>
						<div className="mb-6 flex">
							<div className="mr-1">Condition :</div>
							<div>{productData.condition}</div>
						</div>
						<div>
							<div className="break-words">{productData.desc}</div>
						</div>
					</div>
					<div className="mt-6 flex flex-col items-center justify-center md:mt-0 md:w-1/5">
						<div className="text-xl font-semibold">$1700</div>
						<div className="mb-4 flex items-center justify-between text-sm text-slate-500">
							<div className="mr-2">+ 60</div>
							<div>Family Mart Shipping</div>
						</div>
						<Button
							className="mb-4 h-12 w-full hover:border-2 hover:border-foreground hover:bg-background hover:text-foreground md:w-4/5"
							onClick={onAddShoppingCart}
						>
							ADD TO CART
						</Button>
						<Button className="mb-4 h-12 w-full hover:border-2 hover:border-foreground hover:bg-background hover:text-foreground md:w-4/5">
							OFFER
						</Button>
						<MessageBoxMobile
							className="w-full md:hidden"
							username={username}
							isOpen={isOpen}
							onCloseMessageBox={onCloseMessageBox}
						/>
						{isOpen && (
							<MessageBoxDesktop
								wsData={{ username, product_id, listingOwner: listingData?.data[0].seller_name }}
								isOpen={isOpen}
								onCloseMessageBox={onCloseMessageBox}
								image={productData.primary_image}
								listing_name={productData.name}
								listing_designer={productData.designer}
								date={productData.updated_at}
							/>
						)}
						{username !== listingData?.data[0].seller_name && (
							<Button
								className="hidden h-12 w-full hover:border-2 hover:border-foreground hover:bg-background hover:text-foreground md:block md:w-4/5"
								onClick={onCloseMessageBox}
							>
								MESSAGE SELLER
							</Button>
						)}
					</div>
				</div>
			</div>

			<div className="mt-20 px-3">
				<div className="mb-6 text-xl font-bold">You may also like</div>
				<div className="no-scrollbar flex flex-wrap justify-between md:w-full md:flex-nowrap md:justify-start md:space-x-6 md:overflow-scroll">
					{mayAlsoLikeData?.data.map((obj, index) => (
						<ListingCard
							key={`${index}-${obj.name}`}
							src={obj.primary_image}
							prod_id={obj.prod_id}
							product_data={obj}
							className="mb-4 w-[48%] shrink-0 md:w-1/6"
						/>
					))}
				</div>
			</div>

			<div className="mt-20 px-3">
				<div className="mb-6 text-xl font-bold">Recently Viewed</div>
				<div className="no-scrollbar flex flex-wrap justify-between md:w-full md:flex-nowrap md:justify-start md:space-x-6 md:overflow-scroll">
					{recentlyViewedData?.data.map((obj, index) => (
						<ListingCard
							key={`${obj.product_id}-${index}`}
							src={obj.Product.primary_image}
							prod_id={obj.product_id}
							product_data={obj.Product}
							className="mb-4 w-[48%] shrink-0 md:w-1/5"
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps({ req, query }) {
	const product_id = query.item;
	const queryClient = new QueryClient();
	const token = await getToken({ req, secret: JWT_TOKEN_SECRET });
	const username = token?.username ?? null;

	await queryClient.prefetchQuery({
		queryKey: ["products", { id: product_id }],
		queryFn: ({ queryKey }) => getSingleListing({ uri: `/listing/${queryKey[1].id}`, sever: true }),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			username,
			product_id,
		},
		//revalidate: 60 * 10,
	};
}
