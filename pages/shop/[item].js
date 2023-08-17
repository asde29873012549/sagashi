/*eslint-disable*/
import Carousel from "../../components/Carousel";
import { Button } from "@/components/ui/button";
import ListingCard from "../../components/ListingCard";
import MessageBoxMobile from "../../components/MessageBoxMobile";
import MessageBoxDesktop from "../../components/MessageBoxDesktop";

import { useState } from "react";

export default function ListingItem() {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseMessageBox = () => {
    console.log(isOpen);
    setIsOpen((o) => !o);
  };
  return (
    <div className="w-screen md:px-[7%]">
      <div className="relative flex justify-between items-center flex-col md:flex-row">
        <Carousel className="md:mx-auto md:z-2" />
        <div className="flex flex-col px-3 md:absolute md:justify-between md:flex-row md:w-full">
          <div className="flex flex-col items-between justify-center md:w-1/5">
            <div className="font-semibold text-xl">Jacueqmus</div>
            <div className="text-base mb-6">
              Yellow 'Le Bob Artichaut' Bucket Hat
            </div>
            <div className="flex">
              <div className="mr-1">Size :</div>
              <div>XS</div>
            </div>
            <div className="flex">
              <div className="mr-1">Color :</div>
              <div>Blue</div>
            </div>
            <div className="flex mb-6">
              <div className="mr-1">Condition :</div>
              <div>New / Never Worn</div>
            </div>
            <div>
              <div className="break-words">
                lorel ipsum lorel ipsum lorel ipsum lorel ipsum lorel ipsum
                lorel ipsum{" "}
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col items-center justify-center md:w-1/5">
            <div className="font-semibold text-xl">$1700</div>
            <div className="flex text-slate-500 mb-4 justify-between items-center text-sm">
              <div className="mr-2">+ 60</div>
              <div>Family Mart Shipping</div>
            </div>
            <Button className="w-full md:w-4/5 mb-4 h-12 hover:bg-background hover:border-foreground hover:border-2 hover:text-foreground">
              ADD TO CART
            </Button>
            <Button className="w-full md:w-4/5 mb-4 h-12 hover:bg-background hover:border-foreground hover:border-2 hover:text-foreground">
              OFFER
            </Button>
            <MessageBoxMobile
              className="w-full md:hidden"
              isOpen={isOpen}
              onCloseMessageBox={onCloseMessageBox}
            />
            <MessageBoxDesktop
              isOpen={isOpen}
              onCloseMessageBox={onCloseMessageBox}
            />
            <Button
              className="hidden md:block w-full md:w-4/5 h-12 hover:bg-background hover:border-foreground hover:border-2 hover:text-foreground"
              onClick={onCloseMessageBox}
            >
              MESSAGE SELLER
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20 px-3">
        <div className="font-bold mb-6 text-xl">You may also like</div>
        <div className="flex md:overflow-scroll no-scrollbar flex-wrap justify-between md:flex-nowrap">
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
        </div>
      </div>

      <div className="mt-20 px-3">
        <div className="font-bold mb-6 text-xl">Recently Viewed</div>
        <div className="flex md:overflow-scroll no-scrollbar flex-wrap justify-between md:flex-nowrap">
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[48%] mb-4 md:w-1/6 md:mr-4 shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
