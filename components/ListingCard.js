import Image from "next/image";
import { Separator } from "./ui/separator";
import { PiHeart } from "react-icons/pi";

export default function ListingCard({ src }) {
  return (
    <div className="w-full h-fit ">
      <div className="relative w-full aspect-[4/5]">
        <Image src={src} fill={true} alt="pic" />
      </div>
      <div className="text-sm text-gray-500">8 months</div>
      <Separator />
      <div className="flex justify-between items-center">
        <div className="text-base text-foreground truncate font-semibold">
          Long Sleeve Jacket
        </div>
        <div className="text-sm text-foreground">XL</div>
      </div>
      <div className="text-xs text-foreground truncate">Maison Margiela</div>
      <div className="flex justify-between text-sm text-foreground items-center">
        <div>$300</div>
        <PiHeart />
      </div>
    </div>
  );
}
