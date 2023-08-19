/*eslint-disable*/
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  const onInfoClick = (e) => {
    const path = e.currentTarget.innerText.split(" ").join("").toLowerCase();
    router.replace(`/info/${path}`);
  };
  return (
    <div className="relative flex flex-col md:flex-row md:justify-between w-screen h-fit py-3 md:py-6 px-3 bg-gray-200/50 my-14 md:mb-0">
      <div className="w-full md:w-2/5 flex flex-col items-start justify-center md:items-start mb-6 md:mb-0">
        <Link href="/" className="relative w-1/3">
          <Image
            src="/sagashi.webp"
            alt="Sagashi_logo"
            width={250}
            height={100}
            priority
          />
        </Link>
        <p className="text-sm mt-3">
          One-stop platform for buying/selling luxury goods.
        </p>
        <p className="text-sm">© 2033 sagashi.com</p>
      </div>

      <div className="w-full md:w-2/5 flex flex-col items-start">
        <h1 className="font-bold text-lg md:text-xl mb-2">News Letter</h1>
        <div className="flex w-full md:w-5/6">
          <Input
            placeholder="Get the latest of SAGASHI"
            className="placeholder:text-xs placeholder:text-gray-400 bg-transparent border-foreground w-3/4"
          />
          <Button className="ml-1 w-1/4">Subscribe</Button>
        </div>
      </div>

      <div className="w-full md:w-1/5 flex flex-col mt-5 md:mt-0">
        <h1 className="mb-2 font-bold text-lg md:text-xl space-y-2">
          Customer Service
        </h1>
        <Button
          variant="ghost"
          className="w-fit h-fit p-0 py-1 hover:bg-transparent focus:bg-transparent hover:underline"
          onClick={onInfoClick}
        >
          ORDER & DELIVERY
        </Button>
        <Button
          variant="ghost"
          className="w-fit h-fit p-0 py-1 hover:bg-transparent focus:bg-transparent hover:underline"
          onClick={onInfoClick}
        >
          RETURN & REFUND
        </Button>
        <Button
          variant="ghost"
          className="w-fit h-fit p-0 py-1 hover:bg-transparent focus:bg-transparent hover:underline"
          onClick={onInfoClick}
        >
          CONTACT US
        </Button>
      </div>

      <div className="w-full md:w-1/5 flex flex-col mt-5 md:mt-0 ">
        <h1 className="mb-2 font-bold text-lg md:text-xl space-y-2">
          Information
        </h1>
        <Button
          variant="ghost"
          className="w-fit h-fit p-0 py-1 hover:bg-transparent focus:bg-transparent hover:underline"
          onClick={onInfoClick}
        >
          ABOUT
        </Button>
        <Button
          variant="ghost"
          className="w-fit h-fit p-0 py-1 hover:bg-transparent focus:bg-transparent hover:underline"
          onClick={onInfoClick}
        >
          FAQs
        </Button>
        <Button
          variant="ghost"
          className="w-fit h-fit p-0 py-1 hover:bg-transparent focus:bg-transparent hover:underline"
          onClick={onInfoClick}
        >
          TERMS & CONDITIONS
        </Button>
        <Button
          variant="ghost"
          className="w-fit h-fit p-0 py-1 hover:bg-transparent focus:bg-transparent hover:underline"
          onClick={onInfoClick}
        >
          PRIVACY POLICY
        </Button>
      </div>
      <p className="text-sm mt-8 md:hidden">© 2033 sagashi.com</p>
    </div>
  );
}
