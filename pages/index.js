import { Fragment } from "react";
import Banner from "@/components/Banner";
import ListingCard from "@/components/ListingCard";
import DesignerCard from "@/components/DesignerCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<Fragment>
			<Banner />
			<section className="flex w-screen flex-col p-3 md:p-8">
				<h1 className="mt-10 text-2xl font-bold md:text-3xl">New In</h1>
				<p className="mb-6">Freshly in boutiques for your best choice.</p>
				<main className="no-scrollbar flex  w-full items-center overflow-scroll">
					<ListingCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<ListingCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<ListingCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<ListingCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<ListingCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<ListingCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<ListingCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<ListingCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
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
				<p className="mb-6">Boutiques from the popular designers.</p>
				<main className="no-scrollbar flex w-full items-center overflow-scroll">
					<DesignerCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mb-4 mr-2 w-[65%] shrink-0 md:mr-4 md:w-1/5" />
					<Button
						variant="ghost"
						className="flex w-[65%] shrink-0 cursor-pointer items-center justify-center font-semibold underline md:w-1/5"
						asChild
					>
						<Link href="/designers">See All</Link>
					</Button>
				</main>
				<Button variant="outline" className="mt-3 border-foreground font-semibold md:w-1/5" asChild>
					<Link href="/shop/featuredDesigners">SHOP NOW</Link>
				</Button>
			</section>

			<section className="relative flex w-screen flex-col p-3 md:p-8">
				<h1 className="mt-10 text-2xl font-bold md:text-3xl">Curation</h1>
				<p className="mb-6">Seasonal curation to meet the zenith of worlds&apos; fashion trends</p>
				<div className="relative h-[500px] w-full">
					<Image
						src="/curation_shoes.jpeg"
						alt="curation_shoes"
						fill={true}
						className="object-cover"
					/>
					<div className="absolute z-3 flex h-full w-full flex-col items-center justify-end px-5 pb-8 text-background md:justify-center">
						<h3 className="text-xl font-semibold drop-shadow-md md:text-3xl">
							Investment Sneakers
						</h3>
						<p className="md:text-x text-center drop-shadow-md">
							Make the most of luxury where style meets functions
						</p>
						<Link
							className="cursor-pointer underline drop-shadow-md hover:text-foreground md:text-xl"
							href="/"
						>
							Shop Now
						</Link>
					</div>
					<div className="absolute z-2 h-full w-full bg-gray-300/10"></div>
				</div>

				<div className="relative mt-6 h-[500px] w-full md:mt-12">
					<Image
						src="/curation_summer.jpeg"
						alt="curation_summer"
						fill={true}
						className="object-cover"
					/>
					<div className="absolute z-3 flex h-full w-full flex-col items-center justify-end px-5 pb-8 text-background md:justify-center">
						<h3 className="text-xl font-semibold drop-shadow-md md:text-3xl">Summer kicks</h3>
						<p className="md:text-x text-center drop-shadow-md">Simply elegant in summer vibes</p>
						<Link
							className="cursor-pointer underline drop-shadow-md hover:text-foreground md:text-xl"
							href="/"
						>
							Shop Now
						</Link>
					</div>
					<div className="absolute z-2 h-full w-full bg-gray-300/10"></div>
				</div>

				<div className="relative mt-6 h-[500px] w-full md:mt-12">
					<Image
						src="/curation_jewelry.webp"
						alt="curation_jewelry"
						fill={true}
						className="object-cover"
					/>
					<div className="absolute z-3 flex h-full w-full flex-col items-center justify-end px-5 pb-8 text-background md:justify-center">
						<h3 className="text-xl font-semibold drop-shadow-md md:text-3xl">Glowing Glamour</h3>
						<p className="md:text-x text-center drop-shadow-md">
							Keeping up with the trendiest jewelry now
						</p>
						<Link
							className="cursor-pointer underline drop-shadow-md hover:text-foreground md:text-xl"
							href="/"
						>
							Shop Now
						</Link>
					</div>
					<div className="absolute z-2 h-full w-full bg-gray-300/10"></div>
				</div>
			</section>
		</Fragment>
	);
}
