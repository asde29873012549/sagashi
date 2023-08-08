import { GiCancel } from "react-icons/gi";
import { Button } from "@/components/ui/button"

export default function OderItem() {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between items-center">
				<div className="mt-4">
					<span>Sending From</span>
					<span className="font-bold ml-2">Noah</span>
				</div>
			</div>
			<div className="flex justify-between space-x-1 mt-4">
				<div className="flex w-11/12">
				<div className="w-1/4 aspect-[4/5]">
				<img src="./banner.jpg" fill={true} alt="test"/>
				</div>
				<div className="flex flex-col ml-4 justify-between">
					<div>
					<div className="text-xl font-semibold">Yellow Hat</div>
					<div className="text-sm leading-3">Maison Margiela</div>
					</div>
					
					<Button variant="outline" className="text-base">Size M</Button>
				</div>
				</div>
				<GiCancel className="w-1/12"/>
			</div>
		</div>
	)
}