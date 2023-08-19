/*eslint-disable*/
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DesignerCard from "@/components/DesignerCard";
import Shop from "../shop/index";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
export default function SingleDesignerPage() {
  const [designerIntroSecExpand, setDesignerIntroSecExpand] = useState(false);

  const onReadmore = (e) => {
    e.preventDefault();
    setDesignerIntroSecExpand((ex) => !ex);
  };
  return (
    <main className="w-screen md:py-8 md:px-14">
      <Image
        src="/abstract.webp"
        alt="abstract"
        width={800}
        height={250}
        className="w-full h-52 object-cover"
      />
      <section
        className={`relative w-full flex flex-col md:flex-row justify-between py-3 md:py-7 ${
          designerIntroSecExpand ? "h-fit" : "h-96 md:h-56"
        }`}
      >
        <div className="px-2 md:py-0 h-fit md:h-40 w-full md:w-2/5">
          <div className="relative flex flex-col md:flex-row w-full h-full md:h-fit items-center">
            <Avatar className="w-2/5 md:w-1/4 aspect-square mx-auto inset-0 -translate-y-1/2 md:translate-y-0 md:m-0 md:mr-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center md:items-start -translate-y-full md:translate-y-0">
              <span className="text-3xl font-bold">Casablanca</span>
              <span className="underline text-sm">1.3k listings</span>
            </div>
            <Button className="md:ml-5 w-24 h-fit py-2 -translate-y-full md:translate-y-0">
              Follow
            </Button>
          </div>
        </div>
        <p className="w-full md:w-2/5 px-4 overflow-hidden">
          Casablanca debuted its bold approach to luxury menswear in 2018.
          Founded by Franco-Moroccan designer Charaf Tajer, Casablanca designs
          pay homage to the Moroccan city’s vivid color story and ancient
          architecture. Casablanca tops are crafted in intricate eye-catching
          prints. Constructed of the finest silks and cashmere knits, the
          sportswear-inspired label is one of the most exciting new luxury
          design houses operating today. Casablanca knitwear and Casablanca
          hoodies add an element of intrigue to any outfit. Along with the
          line’s main offerings, exclusive collaborations such as Casablanca x
          New Balance expand the brand’s reach. Casablanca designer Charaf Tajer
          was no stranger to fashion when he started the label. Previously,
          Tajer collaborated closely with streetwear brand Pigalle. In 2020,
          Casablanca introduced its first-ever womenswear collection.
        </p>
        <div
          className={`${
            designerIntroSecExpand ? "hidden" : "absolute"
          } bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent`}
        ></div>
        <Button
          variant="ghost"
          className="underline absolute bottom-0 right-0 hover:bg-transparent active:bg-transparent focus:bg-transparent translate-y-6"
          onClick={onReadmore}
        >
          {designerIntroSecExpand ? "Collapse..." : "Read More..."}
        </Button>
      </section>

      <section className="relative w-full h-fit md:px-0 px-4 mt-16 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold">Related Designers</h1>
        <section className="relative flex overflow-scroll no-scrollbar">
          {/* Left Arrow */}
          <div className="hidden md:absolute top-[50%] -translate-x-0 translate-y-[-50%] left-1 md:left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-2">
            <BsChevronCompactLeft size={30} />
          </div>
          {/* Right Arrow */}
          <div className="hidden md:absolute top-[50%] -translate-x-0 translate-y-[-50%] right-1 md:right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer  z-2">
            <BsChevronCompactRight size={30} />
          </div>
          <DesignerCard
            src="/banner.jpg"
            className="w-[65%] md:w-1/5 mr-4 shrink-0"
          />
          <DesignerCard
            src="/banner.jpg"
            className="w-[65%] md:w-1/5 mr-4 shrink-0"
          />
          <DesignerCard
            src="/banner.jpg"
            className="w-[65%] md:w-1/5 mr-4 shrink-0"
          />
          <DesignerCard
            src="/banner.jpg"
            className="w-[65%] md:w-1/5 mr-4 shrink-0"
          />
        </section>
        <section className="mt-16 md:mt-28">
          <h6 className="my-4 underline">1,316 Listing</h6>
          <Shop />
        </section>
      </section>
    </main>
  );
}
