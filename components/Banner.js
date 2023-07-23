import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export default function Banner() {
  return (
    <div className="block w-full h-auto">
      <div className="h-auto relative flex justify-center md:hidden">
        <div className="absolute w-3/5 h-fit grid grid-cols-2 gap-4 top-2/3">
          <Link
            className={
              buttonVariants({ variant: "outline" }) +
              " border-2 border-foreground w-full hover:bg-foreground hover:text-background"
            }
            href="/menswear"
          >
            Mens
          </Link>
          <Link
            className={
              buttonVariants({ variant: "outline" }) +
              " border-2 border-foreground w-full hover:bg-foreground hover:text-background"
            }
            href="/womenswear"
          >
            Womens
          </Link>
          <Link
            className={
              buttonVariants({ variant: "outline" }) +
              " border-2 border-foreground w-full hover:bg-foreground hover:text-background"
            }
            href="/menswear"
          >
            New In
          </Link>
          <Link
            className={
              buttonVariants({ variant: "outline" }) +
              " border-2 border-foreground w-full hover:bg-foreground hover:text-background"
            }
            href="/womenswear"
          >
            Staff Pick
          </Link>
        </div>
        <Image
          src="/banner.jpeg"
          alt="Marine Serre"
          width="2000"
          height="2500"
          className="h-auto object-cover sm:hidden"
        />
      </div>
      <div className="hidden md:h-auto md:relative md:flex md:justify-center">
        <div className="md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:items-center md:text-background md:text-4xl font-bold z-[2] bg-[rgba(0,0,0,0.3)]">
          <div className="md:mb-6">
            Ultimate Platform for your designer clothing
          </div>
          <div className="md:mb-16 text-2xl font-light">
            Start Selling Today
          </div>
          <div className="md:w-3/5 md:h-fit md:grid md:grid-cols-2 md:gap-4">
            <Link
              className={
                buttonVariants({ variant: "outline" }) +
                " md:h-16 md:text-background md:text-2xl md:border-3 md:font-bold"
              }
              href="/menswear"
            >
              Shop Mens
            </Link>
            <Link
              className={
                buttonVariants({ variant: "outline" }) +
                " md:h-16 md:text-background md:text-2xl md:border-3 md:font-bold"
              }
              href="/womenswear"
            >
              Shop Womens
            </Link>
          </div>
        </div>
        <video
          autoPlay={"autoplay"}
          muted
          playsInline
          loop
          width="100%"
          className="md:block md:w-full hidden"
        >
          <source src="/prada.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
