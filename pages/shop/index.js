import ListingCard from "../../components/ListingCard";
import Tree from "@/components/Tree";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import getTree from "@/lib/queries/fetchQuery";
import reformTree from "@/lib/tree/reformTree";

import FilterSection from "@/components/FilterSection";
import { useState } from "react";

export default function Shop() {
	const [filter, setFilter] = useState({});
	const { data: OriginTreeData } = useQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree" }),
		refetchOnWindowFocus: false,
	});
	const [tree, setTree] = useState(OriginTreeData?.data || null);
	console.log(filter);
	const onChangeFilter = (filter) => {
		setFilter(filter);
		const department = filter.department ? [...filter.department] : null;
		const category = filter.subCategory ? {} : null;
		//const subCategory = filter.subCategory ? [...filter.subCategory] : null;

		if (filter.subCategory?.some((obj) => obj.dept === "Menswear")) {
			category.Menswear = [
				...new Set(filter.subCategory.map((obj) => (obj.dept === "Menswear" ? obj.cat : []))),
			];

			if (department) !department.includes("Menswear") && department.push("Menswear");
		}

		if (filter.subCategory?.some((obj) => obj.dept === "Womenswear")) {
			category.Womenswear = [
				...new Set(filter.subCategory.map((obj) => (obj.dept === "Womenswear" ? obj.cat : []))),
			];

			if (department) !department.includes("Womenswear") && department.push("Womenswear");
		}

		const reformedTree = reformTree(OriginTreeData?.data, { department, category });

		setTree(reformedTree);
	};

	return (
		<>
			<FilterSection filter={filter} setFilter={setFilter} />
			<div className="p-2 md:flex md:px-6">
				<div className="hidden md:mr-10 md:inline-block md:w-1/5">
					<Tree treeData={tree} onChangeFilter={onChangeFilter} filter={filter} />
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
		</>
	);
}

export async function getStaticProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree", sever: true }),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
