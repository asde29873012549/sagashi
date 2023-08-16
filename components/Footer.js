/*eslint-disable*/
import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <div className="relative flex flex-col md:flex-row items-center md:justify-between w-screen h-fit md:h-fit pt-5 pb-2 md:py-6 px-3 md:p-6 bg-gray-200/50 mt-10 mb-14 md:mb-0">
      <div className="hidden w-full md:w-2/5 md:flex flex-col items-center md:items-start">
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

      <div className="w-full md:w-1/5 flex flex-col mt-5 md:mt-0 ">
        <h1 className="mb-2 font-bold text-lg md:text-xl space-y-2">
          Customer Service
        </h1>
        <Link href="/">ABOUT</Link>
        <Link href="/">FAQs</Link>
        <Link href="/">CONTACT US</Link>
        <Link href="/">TERMS & CONDITIONS</Link>
        <Link href="/">PRIVATE POLICY</Link>
      </div>
      <p className="text-sm mt-3 md:hidden">© 2033 sagashi.com</p>
    </div>
  );
}
