/* eslint-disable*/
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function DesignerCard({ src, className }) {
  const [isFollow, setIsFollow] = useState(false);
  const router = useRouter();

  const onFollow = (e) => {
    e.preventDefault();
    setIsFollow((f) => !f);
  };
  return (
    <div
      className={`flex flex-col border pb-4 justify-center h-fit rounded-md drop-shadow-lg ${className}`}
    >
      <Link href={`/shop/${router.query.item}`}>
        <div className="relative w-full aspect-[4/5] rounded-md ">
          <Image src={src} fill={true} alt="pic" />
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <Link href={`/shop/${router.query.item}`}>
          <div className="text-xl font-bold text-foreground mt-2 mb-1">
            Prada
          </div>
        </Link>
      </div>
      <span className="underline text-sm m-auto mb-2">1.3k listings</span>
      <Button
        onClick={onFollow}
        variant={isFollow ? "outline" : "default"}
        className="w-1/2 m-auto"
      >
        {isFollow ? "Following" : "Follow"}
      </Button>
    </div>
  );
}
