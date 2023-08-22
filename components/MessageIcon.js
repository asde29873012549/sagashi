import { LuMessageCircle } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ItemCard from "./ItemCard";

export default function MessageIcon() {
	return (
		<Popover>
			<PopoverTrigger className="relative">
				<div className="absolute right-[2px] z-50 mb-3 h-2.5 w-2.5 rounded-full bg-red-700 md:hidden"></div>
				<LuMessageCircle className="h-7 w-7 md:hidden" />
			</PopoverTrigger>
			<PopoverContent className="mr-1 max-h-[80%]">
				<ItemCard src="https://github.com/shadcn.png" postTime="3 min">
					12334444444444343434343434343
				</ItemCard>
			</PopoverContent>
		</Popover>
	);
}
