import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export default function Banner() {
	return (
		<div className="block h-auto w-full">
			<div className="relative flex h-auto justify-center md:hidden">
				<div className="absolute top-2/3 grid h-24 w-3/5 grid-cols-2 gap-4">
					<Link
						className={
							buttonVariants({ variant: "outline" }) +
							" w-full border-2 border-foreground hover:bg-foreground hover:text-background"
						}
						href="/shop/menswear"
					>
						Mens
					</Link>
					<Link
						className={
							buttonVariants({ variant: "outline" }) +
							" w-full border-2 border-foreground hover:bg-foreground hover:text-background"
						}
						href="/shop/womenswear"
					>
						Womens
					</Link>
					<Link
						className={
							buttonVariants({ variant: "outline" }) +
							" w-full border-2 border-foreground hover:bg-foreground hover:text-background"
						}
						href="/shop/newArrivals"
					>
						New In
					</Link>
					<Link
						className={
							buttonVariants({ variant: "outline" }) +
							" w-full border-2 border-foreground hover:bg-foreground hover:text-background"
						}
						href="/womenswear"
					>
						Staff Pick
					</Link>
				</div>
				<Image
					src="/banner.jpg"
					alt="Marine Serre"
					width="2000"
					height="2500"
					className="h-auto object-cover md:hidden"
					priority
				/>
			</div>
			<div className="hidden md:relative md:flex md:h-auto md:justify-center">
				<div className="z-2 bg-[rgba(0,0,0,0.3)] font-bold md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:text-4xl md:text-background">
					<div className="md:mb-6">Ultimate Platform for your designer clothing</div>
					<div className="text-2xl font-light md:mb-16">Start Selling Today</div>
					<div className="md:grid md:h-fit md:w-3/5 md:grid-cols-2 md:gap-4">
						<Link
							className={
								buttonVariants({ variant: "outline" }) +
								" md:border-3 md:h-16 md:text-2xl md:font-bold md:text-foreground"
							}
							href="/shop/menswear"
						>
							Shop Mens
						</Link>
						<Link
							className={
								buttonVariants({ variant: "outline" }) +
								" md:border-3 md:h-16 md:text-2xl md:font-bold md:text-foreground"
							}
							href="/shop/womenswear"
						>
							Shop Womens
						</Link>
					</div>
				</div>
				<video
					autoPlay={"autoplay"}
					muted
					playsInline
					loop
					width="100%"
					className="hidden md:block md:w-full"
				>
					<source src="/prada.mp4" type="video/mp4" />
				</video>
			</div>
		</div>
	);
}
