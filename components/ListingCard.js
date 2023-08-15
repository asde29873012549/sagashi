/* eslint-disable*/
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Separator } from "./ui/separator";
import { PiHeart, PiHeartFill } from "react-icons/pi";

import { useState } from "react";

export default function ListingCard({ src, className }) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const onLike = () => {
    setLiked((l) => !l);
  };
  return (
    <div className={`h-fit ${className}`}>
      <Link href={`/shop/${router.query.item}`}>
        <div className="relative w-full aspect-[4/5]">
          <Image src={src} fill={true} alt="pic" />
        </div>
      </Link>
      <div className="text-sm text-gray-500">8 months</div>
      <Separator />
      <div className="flex justify-between items-center">
        <Link href={`/shop/${router.query.item}`}>
          <div className="text-base text-foreground truncate font-semibold">
            Long Sleeve Jacket
          </div>
        </Link>
        <div className="text-sm text-foreground">XL</div>
      </div>
      <div className="text-xs text-foreground truncate">Maison Margiela</div>
      <div className="flex justify-between text-sm text-foreground items-center">
        <div className="before:content-['$']">300</div>
        {liked ? (
          <PiHeartFill
            onClick={onLike}
            className="fill-red-700 hover:cursor-pointer h-5 w-5"
          />
        ) : (
          <PiHeart onClick={onLike} className="hover:cursor-pointer h-5 w-5" />
        )}
      </div>
    </div>
  );
}
