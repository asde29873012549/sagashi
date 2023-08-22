import { GiCancel } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function OderItem() {
	return (
		<div className="flex flex-col">
			<Separator />
			<div className="flex items-center justify-between">
				<div className="mt-2">
					<span>Sending From</span>
					<span className="ml-2 font-bold">@Noah</span>
				</div>
			</div>
			<div className="mt-2 flex w-full justify-between space-x-1">
				<div className="flex w-11/12">
					<div className="relative aspect-[4/5] w-2/5 max-w-[160px] shrink-0">
						<Image src="/banner.jpg" fill={true} alt="test" />
					</div>
					<div className="ml-4 flex w-3/5 flex-col justify-between">
						<div>
							<div className="w-full text-lg font-semibold ">Yellow HatYtYel</div>
							<div className="w-full truncate text-sm underline">Maison Margiela</div>
							<div className="w-full text-xs text-info">
								<span>ID</span>
								<span className="ml-2">453454269</span>
							</div>
						</div>

						<Button variant="outline" className="h-8 w-fit p-4 text-base">
							Size M
						</Button>
					</div>
				</div>
				<div className="flex w-1/12 flex-col items-end justify-between text-sm">
					<GiCancel />
					<div className="flex flex-col items-end">
						<div className="ml-1 line-through before:content-['$']">48000</div>
						<div className="flex items-center">
							<div className="text-xs">(OFFER)</div>
							<div className="ml-1 text-red-800 before:content-['$']">40000</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
