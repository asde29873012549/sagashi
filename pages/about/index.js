import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
	return (
		<div className="flex w-screen flex-col items-center justify-center px-0 pb-5 md:px-6 lg:px-20">
			<div className="relative aspect-[4/5] w-full md:aspect-[9/4]">
				<div className="absolute z-10 flex aspect-[4/5] w-full items-center justify-center bg-gray-900/20 md:aspect-[9/4]">
					<h1 className="my-4 px-5 text-2xl font-bold text-background md:text-3xl lg:text-4xl">
						One-stop Designer Clothing Sell & Buy Platform
					</h1>
				</div>
				<picture>
					<source srcSet="/aboutBannerMobile.webp" media="(max-width: 780px)" type="image/webp" />
					<Image
						src="/aboutBanner.png"
						alt="aboutBanner"
						fill={true}
						sizes="100vw"
						priority={true}
						quality={100}
					/>
				</picture>
			</div>
			<div className="mx-auto mt-20 grid w-full grid-cols-1 md:grid-cols-2 lg:w-5/6">
				<div className="relative order-1 col-span-1 m-auto aspect-[4/5] w-4/6">
					<Image
						src="/aboutImage1.webp"
						alt="acneStudio"
						fill={true}
						sizes="(max-width: 768px) 50vw, 20vw"
					/>
				</div>
				<div className="order-2 flex flex-col items-center justify-center px-6">
					<h1 className="my-4 text-lg font-bold md:text-xl lg:text-3xl">
						Discover Unique Luxury, Unmatched Value
					</h1>
					<p className="pb-5 text-sm lg:text-base">
						At SAGASHI, unlock a world of unparalleled style and savings. Dive into our exclusive
						marketplace, where every piece tells a story. Unearth extraordinary finds—pre-loved and
						rare—from coveted designer labels, all meticulously authenticated by our discerning
						community.
					</p>
				</div>
				<div className="order-4 flex flex-col items-center justify-center px-6 md:order-3">
					<h1 className="my-4 text-lg font-bold md:text-xl lg:text-3xl">
						Turn Your Closet into Currency
					</h1>
					<p className="pb-5 text-sm lg:text-base">
						Your fashion sense has value. Transform your wardrobe into cash by joining our thriving
						community of sellers. Listing your item is effortless and always fee-free.
					</p>
				</div>
				<div className="relative order-3 col-span-1 m-auto aspect-square w-5/6 md:order-4">
					<Image
						src="/aboutImage2.webp"
						alt="acneStudio"
						fill={true}
						sizes="(max-width: 768px) 50vw, 20vw"
					/>
				</div>
				<div className="relative order-5 col-span-1 m-auto aspect-[4/5] w-5/6">
					<Image
						src="/aboutImage3.webp"
						alt="acneStudio"
						fill={true}
						sizes="(max-width: 768px) 50vw, 20vw"
					/>
				</div>
				<div className="order-6 flex flex-col items-center justify-center px-6">
					<h1 className="my-4 text-lg font-bold md:text-xl lg:text-3xl">
						Fair Deals, Exceptional Service
					</h1>
					<p className="pb-5 text-sm lg:text-base">
						With just a 9% commission fee upon sale, SAGASHI offers a fair playing field. Post your
						item at no cost—our fee applies only when you succeed. Trust in our dedication to secure
						transactions and seamless experiences.
					</p>
				</div>
				<div className="order-8 flex flex-col items-center justify-center px-6 md:order-7">
					<h1 className="my-4 text-lg font-bold md:text-xl lg:text-3xl">
						Seamless Shopping, Effortless Selling
					</h1>
					<p className="pb-5 text-sm lg:text-base">
						Shop and sell, anytime, anywhere. The SAGASHI app empowers you to explore exquisite
						pieces or sell from your personal collection on the move. Receive real-time updates on
						price adjustments, inquiries, and more.
					</p>
				</div>
				<div className="relative order-7 col-span-1 m-auto aspect-square w-full md:order-8">
					<Image
						src="/aboutImage4.webp"
						alt="acneStudio"
						fill={true}
						sizes="(max-width: 768px) 50vw, 20vw"
					/>
				</div>
			</div>
			<div className="relative aspect-[4/5] w-full md:aspect-[9/4]">
				<div className="absolute z-10 flex aspect-[4/5] w-full flex-col items-center justify-center bg-gray-900/40 text-background md:aspect-[9/4]">
					<h1 className="my-4 text-2xl font-bold md:text-3xl lg:text-4xl">More Questions?</h1>
					<p className="w-5/6 text-sm lg:w-4/6 lg:text-base">
						We&apos;ve got answers. Visit our Help Section for our most Frequently Asked Questions,
						detailed info on how Grailed works, or you can get in touch directly with our Community
						Support Team.
					</p>
					<div className="mt-6 space-x-4">
						<Link href="/info/faqs">
							<Button variant="outline" className="bg-transparent">
								VISIT HELP CENTER
							</Button>
						</Link>
						<Button variant="outline" className="bg-transparent">
							CONTACT US
						</Button>
					</div>
				</div>
				<picture>
					<source srcSet="/aboutFooterMobile.webp" media="(max-width: 780px)" type="image/webp" />
					<Image
						src="/aboutFooter.webp"
						alt="aboutFooter"
						fill={true}
						sizes="100vw"
						priority={true}
						quality={100}
					/>
				</picture>
			</div>
		</div>
	);
}
