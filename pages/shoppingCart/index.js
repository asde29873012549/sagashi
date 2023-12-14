import * as dotenv from "dotenv";
import OderItem from "@/components/OrderItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import getCart from "@/lib/queries/fetchQuery";
import { getToken } from "next-auth/jwt";

dotenv.config();

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

export default function ShoppingCart({ username }) {
	const { data: cartData } = useQuery({
		queryKey: ["shoppingCart"],
		queryFn: () => getCart({ uri: `/user/${username}/shoppingCart` }),
		refetchOnWindowFocus: false,
	});

	const subTotal = cartData?.data?.reduce((acc, obj) => Number(acc) + Number(obj.price), 0);
	const DeleiveryFee = 60;

	return (
		<div className="relative flex flex-col p-8">
			<div className="mb-4 text-2xl font-bold">SHOPPING CART</div>
			<div className="md:flex md:justify-between">
				<div className="shrink-0 space-y-4 md:w-4/6">
					{cartData?.data?.map((obj) => {
						return <OderItem key={obj.product_id} username={username} cartData={obj} />;
					})}
				</div>
				<div className="sticky bottom-0 right-0 w-full bg-white/95 px-4 md:w-2/6 ">
					<div className="space-y-2">
						<div className="my-2 text-lg font-semibold">Summary</div>
						<div className="flex w-full justify-between">
							<div>SubTotal</div>
							<div className="before:mr-1 before:content-['$']">{subTotal}</div>
						</div>
						<div className="flex w-full justify-between">
							<div>Delivery Fee</div>
							<div className="before:mr-1 before:content-['$']">{DeleiveryFee}</div>
						</div>
						<Separator />
						<div className="flex w-full justify-between">
							<div>Total</div>
							<div className="before:mr-1 before:content-['NTD']">{subTotal + DeleiveryFee}</div>
						</div>
					</div>
					<Button className="mt-4 w-full">Go to Checkout</Button>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps({ req }) {
	const queryClient = new QueryClient();
	const token = await getToken({ req, secret: JWT_TOKEN_SECRET });
	const username = token?.username ?? null;
	const accessToken = token?.accessToken ?? null;

	await queryClient.prefetchQuery({
		queryKey: ["shoppingCart"],
		queryFn: () =>
			getCart({ uri: `/user/${username}/shoppingCart`, server: true, token: accessToken }),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			username,
		},
	};
}
