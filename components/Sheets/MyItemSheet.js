import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ItemCard from "../ItemCard";
import { BsFillPencilFill } from "react-icons/bs";

export default function MyItemSheet() {
  return (
    <Sheet>
      <SheetTrigger className="underline">See all items</SheetTrigger>
      <SheetContent side="bottom" className="h-5/6 overflow-scroll">
        <SheetHeader>
          <SheetTitle>All Items</SheetTitle>
          <ItemCard
            src="https://github.com/shadcn.png"
            postTime={
              <div className="flex items-center">
                <div className="mr-4 text-base text-foreground before:content-['NT']">
                  600
                </div>
                <BsFillPencilFill />
              </div>
            }
          >
            <div>
              <div className="w-fit">Yellow Hat</div>
              <div className="text-xs text-info">Maison Margiela</div>
            </div>
          </ItemCard>
          <ItemCard
            src="https://github.com/shadcn.png"
            postTime={
              <div className="flex items-center">
                <div className="mr-4 text-base text-foreground before:content-['NT']">
                  600
                </div>
                <BsFillPencilFill />
              </div>
            }
          >
            <div>
              <div className="w-fit">Yellow Hat</div>
              <div className="text-xs text-info">Maison Margiela</div>
            </div>
          </ItemCard>
          <ItemCard
            src="https://github.com/shadcn.png"
            postTime={
              <div className="flex items-center">
                <div className="mr-4 text-base text-foreground before:content-['NT']">
                  600
                </div>
                <BsFillPencilFill />
              </div>
            }
          >
            <div>
              <div className="w-fit">Yellow Hat</div>
              <div className="text-xs text-info">Maison Margiela</div>
            </div>
          </ItemCard>
          <ItemCard
            src="https://github.com/shadcn.png"
            postTime={
              <div className="flex items-center">
                <div className="mr-4 text-base text-foreground before:content-['NT']">
                  600
                </div>
                <BsFillPencilFill />
              </div>
            }
          >
            <div>
              <div className="w-fit">Yellow Hat</div>
              <div className="text-xs text-info">Maison Margiela</div>
            </div>
          </ItemCard>
          <ItemCard
            src="https://github.com/shadcn.png"
            postTime={
              <div className="flex items-center">
                <div className="mr-4 text-base text-foreground before:content-['NT']">
                  600
                </div>
                <BsFillPencilFill />
              </div>
            }
          >
            <div>
              <div className="w-fit">Yellow Hat</div>
              <div className="text-xs text-info">Maison Margiela</div>
            </div>
          </ItemCard>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
