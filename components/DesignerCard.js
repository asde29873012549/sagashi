/* eslint-disable*/
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function DesignerCard({ src, className }) {
  const [isFollow, setIsFollow] = useState(false);
  const router = useRouter();

  const onFollow = () => {
    setIsFollow((f) => !f);
  };
  return (
    <div
      className={`flex flex-col pb-4 justify-center h-fit rounded-md drop-shadow-lg ${className}`}
    >
      <Link href={`/shop/${router.query.item}`}>
        <div className="relative w-full aspect-[4/5]">
          <Image src={src} fill={true} alt="pic" />
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <Link href={`/shop/${router.query.item}`}>
          <div className="text-xl font-bold text-foreground mt-3 mb-2">
            Prada
          </div>
        </Link>
      </div>
      <Button
        variant={isFollow ? "outline" : "default"}
        className="w-1/2 m-auto"
      >
        {isFollow ? "Following" : "Follow"}
      </Button>
    </div>
  );
}
