import Logo from '@/components/Logo';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Footer() {
	const router = useRouter();

	const onInfoClick = (e) => {
		const path = e.currentTarget.innerText.split(" ").join("").toLowerCase();
		router.replace(`/info/${path}`);
	};
	return (
		<div className="relative my-14 flex h-fit w-screen flex-col bg-gray-200/50 px-3 py-4 md:mb-0 md:flex-row md:justify-between md:py-6">
			<div className="mb-6 flex w-full flex-col items-start justify-center md:mb-0 md:w-2/5 md:items-start">
				<Logo className="w-1/5"/>
				<p className="text-sm">One-stop platform for buying/selling luxury goods.</p>
				<p className="text-sm hidden md:inline">© 2033 sagashi.com</p>
			</div>

			<div className="flex w-full flex-col items-start md:w-2/5">
				<h1 className="mb-2 text-lg font-bold md:text-xl">News Letter</h1>
				<div className="flex w-full md:w-5/6">
					<Input
						placeholder="Get the latest of SAGASHI"
						className="w-3/4 border-foreground bg-transparent placeholder:text-xs placeholder:text-gray-400"
					/>
					<Button className="ml-1 w-1/4">Subscribe</Button>
				</div>
			</div>

			<div className="mt-5 flex w-full flex-col md:mt-0 md:w-1/5">
				<h1 className="mb-2 space-y-2 text-lg font-bold md:text-xl">Customer Service</h1>
				<Button
					variant="ghost"
					className="h-fit w-fit p-0 py-1 hover:bg-transparent hover:underline focus:bg-transparent"
					onClick={onInfoClick}
				>
					ORDER & DELIVERY
				</Button>
				<Button
					variant="ghost"
					className="h-fit w-fit p-0 py-1 hover:bg-transparent hover:underline focus:bg-transparent"
					onClick={onInfoClick}
				>
					RETURN & REFUND
				</Button>
				<Button
					variant="ghost"
					className="h-fit w-fit p-0 py-1 hover:bg-transparent hover:underline focus:bg-transparent"
					onClick={onInfoClick}
				>
					CONTACT US
				</Button>
			</div>

			<div className="mt-5 flex w-full flex-col md:mt-0 md:w-1/5 ">
				<h1 className="mb-2 space-y-2 text-lg font-bold md:text-xl">Information</h1>
				<Button
					variant="ghost"
					className="h-fit w-fit p-0 py-1 hover:bg-transparent hover:underline focus:bg-transparent"
					onClick={onInfoClick}
				>
					ABOUT
				</Button>
				<Button
					variant="ghost"
					className="h-fit w-fit p-0 py-1 hover:bg-transparent hover:underline focus:bg-transparent"
					onClick={onInfoClick}
				>
					FAQs
				</Button>
				<Button
					variant="ghost"
					className="h-fit w-fit p-0 py-1 hover:bg-transparent hover:underline focus:bg-transparent"
					onClick={onInfoClick}
				>
					TERMS & CONDITIONS
				</Button>
				<Button
					variant="ghost"
					className="h-fit w-fit p-0 py-1 hover:bg-transparent hover:underline focus:bg-transparent"
					onClick={onInfoClick}
				>
					PRIVACY POLICY
				</Button>
			</div>
			<p className="mt-8 text-sm md:hidden">© 2033 sagashi.com</p>
		</div>
	);
}
