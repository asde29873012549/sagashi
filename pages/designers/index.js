/*eslint-disable*/
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
export default function Designers() {
  return (
    <main className="w-screen py-8 px-14">
      <Image
        src="/abstract.webp"
        alt="abstract"
        width={800}
        height={250}
        className="w-full h-52 object-cover"
      />
      <div className="relative w-full flex justify-between py-7 h-56">
        <div className="flex flex-col justify-between w-2/5 ">
          <div className="flex w-full">
            <Avatar className="w-1/4 h-full mr-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">Casablanca</span>
              <span className="underline text-sm">1.3k listings</span>
            </div>
            <Button className="ml-2 w-24 h-fit py-2">Follow</Button>
          </div>
        </div>
        <p className="w-2/5 overflow-hidden">
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
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        <Button
          variant="ghost"
          className="underline absolute bottom-0 right-0 active:bg-transparent focus:bg-transparent"
        >
          Read More...
        </Button>
      </div>
    </main>
  );
}
