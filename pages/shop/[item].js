import Carousel from "../../components/Carousel";
import { Button } from "@/components/ui/button";
import ListingCard from "../../components/ListingCard";
import MessageBoxMobile from "../../components/MessageBoxMobile";
import MessageBoxDesktop from "../../components/MessageBoxDesktop";

import { useState } from "react";

export default function ListingItem() {
	const [isOpen, setIsOpen] = useState(false);

	const onCloseMessageBox = () => {
		console.log(isOpen);
		setIsOpen((o) => !o);
	};
	return (
		<div className="w-screen md:px-[7%]">
			<div className="relative flex flex-col items-center justify-between md:flex-row">
				<Carousel className="md:z-2 md:mx-auto" />
				<div className="flex flex-col px-3 md:absolute md:w-full md:flex-row md:justify-between">
					<div className="items-between flex flex-col justify-center md:w-1/5">
						<div className="text-xl font-semibold">Jacueqmus</div>
						<div className="mb-6 text-base">Yellow 'Le Bob Artichaut' Bucket Hat</div>
						<div className="flex">
							<div className="mr-1">Size :</div>
							<div>XS</div>
						</div>
						<div className="flex">
							<div className="mr-1">Color :</div>
							<div>Blue</div>
						</div>
						<div className="mb-6 flex">
							<div className="mr-1">Condition :</div>
							<div>New / Never Worn</div>
						</div>
						<div>
							<div className="break-words">
								lorel ipsum lorel ipsum lorel ipsum lorel ipsum lorel ipsum lorel ipsum{" "}
							</div>
						</div>
					</div>
					<div className="mt-6 flex flex-col items-center justify-center md:mt-0 md:w-1/5">
						<div className="text-xl font-semibold">$1700</div>
						<div className="mb-4 flex items-center justify-between text-sm text-slate-500">
							<div className="mr-2">+ 60</div>
							<div>Family Mart Shipping</div>
						</div>
						<Button className="mb-4 h-12 w-full hover:border-2 hover:border-foreground hover:bg-background hover:text-foreground md:w-4/5">
							ADD TO CART
						</Button>
						<Button className="mb-4 h-12 w-full hover:border-2 hover:border-foreground hover:bg-background hover:text-foreground md:w-4/5">
							OFFER
						</Button>
						<MessageBoxMobile
							className="w-full md:hidden"
							isOpen={isOpen}
							onCloseMessageBox={onCloseMessageBox}
						/>
						<MessageBoxDesktop isOpen={isOpen} onCloseMessageBox={onCloseMessageBox} />
						<Button
							className="hidden h-12 w-full hover:border-2 hover:border-foreground hover:bg-background hover:text-foreground md:block md:w-4/5"
							onClick={onCloseMessageBox}
						>
							MESSAGE SELLER
						</Button>
					</div>
				</div>
			</div>

			<div className="mt-20 px-3">
				<div className="mb-6 text-xl font-bold">You may also like</div>
				<div className="no-scrollbar flex flex-wrap justify-between md:flex-nowrap md:overflow-scroll">
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
				</div>
			</div>

			<div className="mt-20 px-3">
				<div className="mb-6 text-xl font-bold">Recently Viewed</div>
				<div className="no-scrollbar flex flex-wrap justify-between md:flex-nowrap md:overflow-scroll">
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
					<ListingCard src="/banner.jpg" className="mb-4 w-[48%] shrink-0 md:mr-4 md:w-1/6" />
				</div>
			</div>
		</div>
	);
}
