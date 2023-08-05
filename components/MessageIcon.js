import { LuMessageCircle } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MessageIcon() {
  return (
    <Popover>
      <PopoverTrigger style={{ position: "relative" }}>
        <div className="rounded-full w-2.5 h-2.5 bg-red-700 absolute right-[2px] mb-3 z-50 md:hidden"></div>
        <LuMessageCircle className="w-7 h-7 md:hidden" />
      </PopoverTrigger>
      <PopoverContent className="mr-1 max-h-[80%]">
        <Alert>
          <AlertDescription className="flex items-center justify-between">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-1 truncate px-2">123345677ssssssssssss86</div>
            <div className="text-info text-xs shrink-0">3 min</div>
          </AlertDescription>
        </Alert>
      </PopoverContent>
    </Popover>
  );
}
