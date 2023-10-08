import ListingCard from "../../components/ListingCard";
import Tree from "@/components/Tree";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import getAllCategories from "@/lib/queries/fetchQuery";

export default function Shop() {
	const { data: categoryData } = useQuery({
		queryKey: ["category"],
		queryFn: () => getAllCategories({ uri: "/category" }),
		refetchOnWindowFocus: false,
	});

	return (
		<div className="p-2 md:flex md:px-6">
			<div className="hidden md:mr-10 md:inline-block md:w-1/5">
				<Tree categoryData={categoryData} />
			</div>
			<div className="grid grid-cols-2 gap-2 md:w-4/5 md:grid-cols-4">
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
				<ListingCard src="/banner.jpg" className="w-full" />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["category"],
		queryFn: () => getAllCategories({ uri: "/category", sever: true }),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
