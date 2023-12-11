import Carousel from "../../components/Carousel";
import { Button } from "@/components/ui/button";
import ListingCard from "../../components/ListingCard";
import MessageBoxMobile from "../../components/MessageBoxMobile";
import MessageBoxDesktop from "../../components/MessageBoxDesktop";
import { dehydrate, QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import getSingleListing from "@/lib/queries/fetchQuery";
import getRecentlyViwed from "@/lib/queries/fetchQuery";
import addToShoppingCart from "@/lib/queries/fetchQuery";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import { genericError, addShoppingCartSuccess } from "@/lib/userMessage";
import CheckSvg from "@/components/checkSvg";
import { useDispatch } from "react-redux";
import { setShoppingCartItemCount } from "@/redux/shopSlice";

import { getToken } from "next-auth/jwt";

import { useState, useRef } from "react";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

export default function ListingItem({ username, product_id }) {
	const dispatch = useDispatch();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const { toast } = useToast();
	const [addToCart, setAddToCart] = useState("ADD TO CART");
	// tracking if the api call to add cart item is success
	const isAddShoppingCartApiSuccess = useRef(null);
	// for tracking add to cart timeout id
	let timeoutId = useRef(null);

	const { data: listingData } = useQuery({
		queryKey: ["products", { id: router.query.item }],
		queryFn: ({ queryKey }) => getSingleListing({ uri: `/listing/${queryKey[1].id}` }),
		refetchOnWindowFocus: false,
	});

	const delayShowCartItem = () => setTimeout(() => dispatch(setShoppingCartItemCount()), 250);

	const { mutate: addShoppingCartMutate, isError } = useMutation({
		mutationFn: () =>
			addToShoppingCart({
				uri: `/user/${username}/shoppingCart`,
				method: "POST",
				body: {
					product_id,
				},
			}),
		onSuccess: () => {
			isAddShoppingCartApiSuccess.current = true;
			if (addToCart.props.shouldNotCover) {
				setAddToCart(<CheckSvg />);
				delayShowCartItem();
			}
			/* toast({
				title: addShoppingCartSuccess.title,
				description: addShoppingCartSuccess.desc,
				status: addShoppingCartSuccess.status,
			}); */
		},
		onError: (err) => {
			setAddToCart("ADD TO CART");
			clearTimeout(timeoutId.current);
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
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
		addShoppingCartMutate();

		setAddToCart(<ShoppingCart className="animate-slide-shoppingCart" />);
		timeoutId.current = setTimeout(() => {
			if (isAddShoppingCartApiSuccess.current) {
				setAddToCart(<CheckSvg />);
				delayShowCartItem();
			} else {
				setAddToCart(<SmallSpinner shouldNotCover={true} />);
			}
			return;
		}, 2000);
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
							{addToCart}
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

function SmallSpinner() {
	return (
		<div>
			<svg
				aria-hidden="true"
				className="inline h-8 w-8 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
		</div>
	);
}
