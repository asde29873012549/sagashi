import ShopPage from "./index";
import getTree from "@/lib/queries/fetchQuery";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

export default function Menswear() {
	const { data: OriginTreeData } = useQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree" }),
		refetchOnWindowFocus: false,
	});

	return <ShopPage isMenswear={true} treeData={OriginTreeData?.data} />;
}

export async function getStaticProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree", server: true }),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
