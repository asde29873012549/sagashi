/* eslint-disable*/
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="absolute w-[35vw] aspect-[3/1] md:w-[15vw] m-auto inset-0 mb-1.5 md:mb-2 hover:cursor-pointer"
    >
      <Image
        src="/sagashi.webp"
        alt="Sagashi_logo"
        fill={true}
        sizes="(max-width: 768px) 35vw, (max-width: 1200px) 15vw, 15vw"
        priority
      />
    </Link>
  );
}

/**
 *  <Image
        src="/triangle_logo.png"
        alt="logo"
        width="30"
        height="30"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className=" w-[28px] md:w-16 animate-triangle_shrink_mobile md:animate-triangle_shrink animation-fill-forward animation-delay-1000 md:animation-fill-forward md:animation-delay-1000"
        priority
      />
      <div className="relative">
        <Image
          src="/sagashi-logo.png"
          alt="logo"
          width="30"
          height="30"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-24 mt-1 animate-logo_scale_mobile md:animate-logo_scale animation-delay-1000 animation-fill-forward md:animation-fill-forward md:animation-delay-1000"
          priority
        />
        <Image
          src="/a_logo.png"
          alt="logo"
          width="30"
          height="30"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-3.5 mt-[5px] absolute inset-0 left-3 animate-a_vanish animation-fill-forward animation-delay-1000 md:animation-fill-forward md:animation-delay-1000"
          priority
        />
      </div>
 */
