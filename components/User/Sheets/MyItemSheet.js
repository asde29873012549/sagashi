import { Fragment } from "react";
import ItemCard from "../../ItemCard";
import { BsFillPencilFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";

export default function MyItemSheet() {
  return (
    <Fragment>
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
      <Separator />
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
      <Separator />
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
      <Separator />
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
      <Separator />
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
    </Fragment>
  );
}
