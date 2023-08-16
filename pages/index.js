/*eslint-disable*/
import { Fragment } from "react";
import Banner from "../components/Banner";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Fragment>
      <Banner />
      <section className="flex flex-col w-screen p-3 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mt-10">New In</h1>
        <p className="mb-6">Freshly in boutiques for your best choice.</p>
        <main className="flex w-full  overflow-scroll no-scrollbar ">
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <div className="bg-slate-100/50 w-[65%] md:w-1/5 shrink-0 underline flex items-center justify-center cursor-pointer font-semibold">
            See Full
          </div>
        </main>
        <Button
          variant="outline"
          className="border-foreground font-semibold md:w-1/5 mt-3"
        >
          SHOP NOW
        </Button>
      </section>

      <section className="flex flex-col w-screen p-3 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mt-10">
          Popular Designers
        </h1>
        <p className="mb-6">Boutiques from the IT designers.</p>
        <main className="flex w-full  overflow-scroll no-scrollbar ">
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <ListingCard
            src="/banner.jpg"
            className="w-[65%] mb-4 md:w-1/5 mr-2 md:mr-4 shrink-0"
          />
          <div className="bg-slate-100/50 w-[65%] md:w-1/5 shrink-0 underline flex items-center justify-center cursor-pointer font-semibold">
            See Full
          </div>
        </main>
        <Button
          variant="outline"
          className="border-foreground font-semibold md:w-1/5 mt-3"
        >
          SHOP NOW
        </Button>
      </section>

      <section className="relative flex flex-col w-screen p-3 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mt-10">Curation</h1>
        <p className="mb-6">
          Seasonal curation to meet the zenith of worlds' fashion trends
        </p>
        <div className="relative w-full h-[500px]">
          <Image
            src="/curation_shoes.jpeg"
            alt="curation_shoes"
            fill={true}
            className="object-cover"
          />
          <div className="z-3 absolute text-background w-full h-full flex flex-col md:justify-center justify-end items-center pb-8 px-5">
            <h3 className="text-xl md:text-3xl font-semibold drop-shadow-md">
              Investment Sneakers
            </h3>
            <p className="drop-shadow-md md:text-x text-center">
              Make the most of luxury where style meets functions
            </p>
            <Link
              className="underline drop-shadow-md md:text-xl cursor-pointer hover:text-foreground"
              href="/"
            >
              Shop Now
            </Link>
          </div>
          <div className="absolute w-full h-full z-2 bg-gray-300/10"></div>
        </div>

        <div className="relative w-full h-[500px] mt-6 md:mt-12">
          <Image
            src="/curation_summer.jpeg"
            alt="curation_summer"
            fill={true}
            className="object-cover"
          />
          <div className="z-3 absolute text-background w-full h-full flex flex-col md:justify-center justify-end items-center pb-8 px-5">
            <h3 className="text-xl md:text-3xl font-semibold drop-shadow-md">
              Summer kicks
            </h3>
            <p className="drop-shadow-md md:text-x text-center">
              Simply elegant in summer vibes
            </p>
            <Link
              className="underline drop-shadow-md md:text-xl cursor-pointer hover:text-foreground"
              href="/"
            >
              Shop Now
            </Link>
          </div>
          <div className="absolute w-full h-full z-2 bg-gray-300/10"></div>
        </div>

        <div className="relative w-full h-[500px] mt-6 md:mt-12">
          <Image
            src="/curation_jewelry.webp"
            alt="curation_jewelry"
            fill={true}
            className="object-cover"
          />
          <div className="z-3 absolute text-background w-full h-full flex flex-col md:justify-center justify-end items-center pb-8 px-5">
            <h3 className="text-xl md:text-3xl font-semibold drop-shadow-md">
              Glowing Glamour
            </h3>
            <p className="drop-shadow-md md:text-x text-center">
              Keeping up with the trendiest jewelry now
            </p>
            <Link
              className="underline drop-shadow-md md:text-xl cursor-pointer hover:text-foreground"
              href="/"
            >
              Shop Now
            </Link>
          </div>
          <div className="absolute w-full h-full z-2 bg-gray-300/10"></div>
        </div>
      </section>
    </Fragment>
  );
}
