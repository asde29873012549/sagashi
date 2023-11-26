import ListingCard from "../../components/ListingCard";
import Tree from "@/components/Tree";
import { dehydrate, QueryClient, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import getTree from "@/lib/queries/fetchQuery";
import getProducts from "@/lib/queries/fetchQuery";
import reformTree from "@/lib/tree/reformTree";
import { Skeleton } from "@/components/ui/skeleton";

import FilterSection from "@/components/FilterSection";
import { useState, useRef, useCallback } from "react";

export default function Shop({ isMenswear, isWomenswear, designer, user, treeData }) {
	const { data: OriginTreeData } = useQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree" }),
		refetchOnWindowFocus: false,
	});

	const initialFilterState = () => {
		if (isMenswear) {
			return { department: ["Menswear"] };
		} else if (isWomenswear) {
			return { department: ["Womenswear"] };
		} else if (designer) {
			return { designers: [designer] };
		} else {
			return {};
		}
	};

	const initialTreeState = () => {
		if (isMenswear) {
			return reformTree(OriginTreeData?.data, { department: ["Menswear"] });
		} else if (isWomenswear) {
			return reformTree(OriginTreeData?.data, { department: ["Womenswear"] });
		} else {
			return OriginTreeData?.data || treeData;
		}
	};

	const [filter, setFilter] = useState(initialFilterState());
	const [tree, setTree] = useState(initialTreeState());

	const createBody = (pageParam, restFilter) => {
		if (!pageParam && Object.keys(restFilter).length === 0) return {};

		const filts = { ...restFilter };

		if (pageParam) {
			filts.cursor = pageParam;
		}

		return filts;
	};

	const {
		data: productData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["products", filter, user],
		queryFn: ({ pageParam = "", ...restFilter }) =>
			getProducts({
				uri: user ? `/listing?user=${user}` : "/listing",
				method: "POST",
				body: createBody(pageParam, restFilter.queryKey[1]),
			}),
		getNextPageParam: (lastPage, pages) =>
			// check if there is a next page by checking the sort property of elastic search result
			lastPage?.data?.result[lastPage.data.result.length - 1]?.sort,
		refetchOnWindowFocus: false,
	});

	const observer = useRef();

	const lastProductElement = useCallback(
		(node) => {
			if (isFetchingNextPage) return;
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});

			if (node) observer.current.observe(node);
		},
		[isFetchingNextPage, hasNextPage],
	);

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
			<h6 className="my-4 p-2 text-sm font-semibold md:px-6">
				{productData?.pages?.[0]?.data?.total} Listings
			</h6>
			{!designer && !isMenswear && !isWomenswear && (
				<FilterSection filter={filter} setFilter={setFilter} />
			)}
			<div className="relative p-2 md:flex md:px-6">
				<div className="no-scrollbar sticky top-0 hidden md:mr-10 md:inline-block md:h-[calc(100dvh-50px)] md:w-1/5 md:overflow-y-scroll">
					<Tree
						isDesigner={designer ? true : false}
						isMenswear={isMenswear}
						isWomenswear={isWomenswear}
						treeData={tree}
						onChangeFilter={onChangeFilter}
						filter={filter}
					/>
				</div>
				<div className="relative grid grid-cols-2 gap-2 md:w-4/5 md:grid-cols-4">
					{(productData?.pages ?? []).map((page) => {
						const pageData = page.data.result || [];
						if (productData.pages[0].data.result.length === 0)
							return (
								<div key={"noresultsfound"} className="absolute">
									<p className="text-xl font-semibold">Sorry, no results found.</p>
									<p>
										Please consider modifying your search or filters to explore different results.
									</p>
								</div>
							);
						return pageData.map((obj, index) => (
							<ListingCard
								key={`${index}-${obj.prod_id}`}
								src={obj.primary_image}
								prod_id={obj.prod_id}
								product_data={obj}
								className="w-full"
								lastProductElement={
									productData?.pages?.[0]?.data?.result.length === index + 1
										? lastProductElement
										: null
								}
							/>
						));
					})}
					{isFetchingNextPage &&
						[...Array(8)].map((_, index) => (
							<div className="mb-5 w-full space-y-3" key={index}>
								<Skeleton className="h-80" />
								<div className="space-y-2">
									<span className="flex justify-between">
										<Skeleton className="h-5 w-5/6" />
										<Skeleton className="h-5 w-5 rounded-full" />
									</span>
									<Skeleton className="h-5 w-2/3" />
								</div>
							</div>
						))}
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

	await queryClient.prefetchQuery({
		queryKey: ["products", {}],
		queryFn: () => getProducts({ uri: "/listing", sever: true }),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
