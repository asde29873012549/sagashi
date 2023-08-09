import { LuMessageCircle } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ItemCard from "./ItemCard";

export default function MessageIcon() {
  return (
    <Popover>
      <PopoverTrigger className="relative">
        <div className="rounded-full w-2.5 h-2.5 bg-red-700 absolute right-[2px] mb-3 z-50 md:hidden"></div>
        <LuMessageCircle className="w-7 h-7 md:hidden" />
      </PopoverTrigger>
      <PopoverContent className="mr-1 max-h-[80%]">
        <ItemCard src="https://github.com/shadcn.png" postTime="3 min">
          12334444444444343434343434343
        </ItemCard>
      </PopoverContent>
    </Popover>
  );
}
