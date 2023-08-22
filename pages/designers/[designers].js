import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DesignerCard from "@/components/DesignerCard";
import Shop from "../shop/index";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
export default function SingleDesignerPage() {
	const [designerIntroSecExpand, setDesignerIntroSecExpand] = useState(false);

	const onReadmore = (e) => {
		e.preventDefault();
		setDesignerIntroSecExpand((ex) => !ex);
	};
	return (
		<main className="w-screen md:px-14 md:py-8">
			<Image
				src="/abstract.webp"
				alt="abstract"
				width={800}
				height={250}
				className="h-52 w-full object-cover"
			/>
			<section
				className={`relative flex w-full flex-col justify-between py-3 md:flex-row md:py-7 ${
					designerIntroSecExpand ? "h-fit" : "h-96 md:h-56"
				}`}
			>
				<div className="h-fit w-full px-2 md:h-40 md:w-2/5 md:py-0">
					<div className="relative flex h-full w-full flex-col items-center md:h-fit md:flex-row">
						<Avatar className="inset-0 mx-auto aspect-square w-2/5 -translate-y-1/2 md:m-0 md:mr-6 md:w-1/4 md:translate-y-0">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="flex -translate-y-full flex-col items-center md:translate-y-0 md:items-start">
							<span className="text-3xl font-bold">Casablanca</span>
							<span className="text-sm underline">1.3k listings</span>
						</div>
						<Button className="h-fit w-24 -translate-y-full py-2 md:ml-5 md:translate-y-0">
							Follow
						</Button>
					</div>
				</div>
				<p className="w-full overflow-hidden px-4 md:w-2/5">
					Casablanca debuted its bold approach to luxury menswear in 2018. Founded by
					Franco-Moroccan designer Charaf Tajer, Casablanca designs pay homage to the Moroccan
					city’s vivid color story and ancient architecture. Casablanca tops are crafted in
					intricate eye-catching prints. Constructed of the finest silks and cashmere knits, the
					sportswear-inspired label is one of the most exciting new luxury design houses operating
					today. Casablanca knitwear and Casablanca hoodies add an element of intrigue to any
					outfit. Along with the line’s main offerings, exclusive collaborations such as Casablanca
					x New Balance expand the brand’s reach. Casablanca designer Charaf Tajer was no stranger
					to fashion when he started the label. Previously, Tajer collaborated closely with
					streetwear brand Pigalle. In 2020, Casablanca introduced its first-ever womenswear
					collection.
				</p>
				<div
					className={`${
						designerIntroSecExpand ? "hidden" : "absolute"
					} bottom-0 h-20 w-full bg-gradient-to-t from-white to-transparent`}
				></div>
				<Button
					variant="ghost"
					className="absolute bottom-0 right-0 translate-y-6 underline hover:bg-transparent focus:bg-transparent active:bg-transparent"
					onClick={onReadmore}
				>
					{designerIntroSecExpand ? "Collapse..." : "Read More..."}
				</Button>
			</section>

			<section className="relative mt-16 flex h-fit w-full flex-col px-4 md:px-0">
				<h1 className="text-2xl font-bold md:text-3xl">Related Designers</h1>
				<section className="no-scrollbar relative flex overflow-scroll">
					{/* Left Arrow */}
					<div className="left-1 top-[50%] z-2 hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white md:absolute md:left-5">
						<BsChevronCompactLeft size={30} />
					</div>
					{/* Right Arrow */}
					<div className="right-1 top-[50%] z-2 hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white md:absolute  md:right-5">
						<BsChevronCompactRight size={30} />
					</div>
					<DesignerCard src="/banner.jpg" className="mr-4 w-[65%] shrink-0 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mr-4 w-[65%] shrink-0 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mr-4 w-[65%] shrink-0 md:w-1/5" />
					<DesignerCard src="/banner.jpg" className="mr-4 w-[65%] shrink-0 md:w-1/5" />
				</section>
				<section className="mt-16 md:mt-28">
					<h6 className="my-4 underline">1,316 Listing</h6>
					<Shop />
				</section>
			</section>
		</main>
	);
}
