import { Fragment } from "react";
import Banner from "@/components/Banner";
import ListingCard from "@/components/ListingCard";
import DesignerCard from "@/components/DesignerCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import getFeaturedDesigners from "@/lib/queries/fetchQuery";
import getCurations from "@/lib/queries/fetchQuery";
import getNewArrivalsProducts from "@/lib/queries/fetchQuery";

export default function Home() {
	const { data: designerData, isFetching: isLoadingFeaturedDesigner } = useQuery({
		queryKey: ["featuredDesingers"],
		queryFn: () => getFeaturedDesigners({ uri: "/designer/featured" }),
	});

	const { data: curationData } = useQuery({
		queryKey: ["curations"],
		queryFn: () => getCurations({ uri: "/listing/curation" }),
	});

	const { data: newArrivalsProductData } = useQuery({
		queryKey: ["products", "newArrivals"],
		queryFn: () =>
			getNewArrivalsProducts({ uri: "/listing", method: "POST", body: { newArrivals: true } }),
	});

	return (
		<Fragment>
			<Banner />
			<section className="flex w-screen flex-col p-3 md:p-8">
				<h1 className="mt-10 text-2xl font-bold md:text-3xl">New In</h1>
				<p className="mb-6">Explore the Latest and Greatest in Contemporary Chic.</p>
				<main className="no-scrollbar flex  w-full items-center overflow-scroll">
					{newArrivalsProductData?.data?.result.map((obj) => (
						<ListingCard
							key={obj.prod_id}
							src={obj.primary_image}
							prod_id={obj.prod_id}
							product_data={obj}
							className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5"
						/>
					))}
					<Button
						variant="ghost"
						className=" flex w-[65%] shrink-0 cursor-pointer items-center justify-center font-semibold underline md:w-1/5"
						asChild
					>
						<Link href="/shop/newArrivals">See All</Link>
					</Button>
				</main>
				<Button variant="outline" className="mt-3 border-foreground font-semibold md:w-1/5" asChild>
					<Link href="/shop/newArrivals">SHOP NOW</Link>
				</Button>
			</section>

			<section className="flex w-screen flex-col p-3 md:p-8">
				<h1 className="mt-10 text-2xl font-bold md:text-3xl">Featured Designers</h1>
				<p className="mb-6">The Epitome of Fashion, Curated for Connoisseurs.</p>
				<main className="no-scrollbar flex w-full items-center overflow-scroll">
					{designerData?.data.slice(0, 7).map((obj) => (
						<DesignerCard
							key={obj.name}
							src={obj.logo}
							designer_id={obj.id}
							isFollowed={obj.isFollow}
							className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5"
							name={obj.name}
							isLoadingFeaturedDesigner={isLoadingFeaturedDesigner}
						/>
					))}
					<Button
						variant="ghost"
						className="flex w-[65%] shrink-0 cursor-pointer items-center justify-center font-semibold underline hover:font-bold md:w-1/5"
						asChild
					>
						<Link href="/designers">See All</Link>
					</Button>
				</main>
				<Button
					variant="outline"
					className="mt-3 border-foreground font-semibold hover:bg-primary hover:text-background md:w-1/5"
					asChild
				>
					<Link href="/shop/featuredDesigners">SHOP NOW</Link>
				</Button>
			</section>

			<section className="relative flex w-screen flex-col p-3 md:p-8">
				<h1 className="mt-10 text-2xl font-bold md:text-3xl">Curation</h1>
				<p className="mb-6">Seasonal curation to meet the zenith of worlds&apos; fashion trends</p>
				{curationData?.data.map((obj, index) => (
					<div className="relative mb-16 h-[500px] w-full" key={`${obj.theme}-${index}`}>
						<Image src={obj.image} alt={obj.theme} fill={true} className="object-cover" />
						<div className="absolute z-3 flex h-full w-full flex-col items-center justify-end px-5 pb-8 text-background md:justify-center">
							<h3 className="text-xl font-semibold drop-shadow-md md:text-3xl">{obj.theme}</h3>
							<p className="md:text-x text-center drop-shadow-md">{obj.slogan}</p>
							<Link
								className="cursor-pointer underline drop-shadow-md hover:text-foreground md:text-xl"
								href="/"
							>
								Shop Now
							</Link>
						</div>
						<div className="absolute z-2 h-full w-full bg-gray-300/10"></div>
					</div>
				))}
			</section>
		</Fragment>
	);
}

export async function getStaticProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["featuredDesingers"],
		queryFn: () => getFeaturedDesigners({ uri: "/designer/featured", server: true }),
	});

	await queryClient.prefetchQuery({
		queryKey: ["curations"],
		queryFn: () => getCurations({ uri: "/listing/curation", server: true }),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60 * 3,
	};
}
