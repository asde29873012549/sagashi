import { Fragment, useState, useRef, createElement } from "react";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";

export default function ListingItem() {
  const slides = [
    {
      url: "/mr_1.jpg",
    },
    {
      url: "/mr_2.jpg",
    },
    {
      url: "/mr_3.jpg",
    },

    {
      url: "/mr_4.jpg",
    },
    {
      url: "/mr_5.jpg",
    },
  ];

  const [direction, setDirection] = useState(1);
  const carouselRef = useRef();

  const prevSlide = () => {
    setDirection((direction) => (direction > 0 ? direction * -1 : direction));
    carouselRef.current.style.transform = "translateX(100vw)";
  };

  const nextSlide = () => {
    setDirection((direction) => (direction < 0 ? direction * -1 : direction));
    carouselRef.current.style.transform = "translateX(-100vw)";
  };

  const onTransitionEnd = () => {
    direction > 0
      ? carouselRef.current.appendChild(carouselRef.current.children[0])
      : carouselRef.current.prepend(carouselRef.current.children[4]);
    carouselRef.current.style.transition = "none";
    carouselRef.current.style.transform = "translateX(0vw)";
    setTimeout(() => {
      carouselRef.current.style.transition = "all 0.5s";
    });
  };

  const goToSlide = (slideIndex) => {
    //setCurrentIndex(slideIndex);
  };

  return (
    <Fragment>
      <div className="aspect-[4/5] w-full m-auto relative group overflow-hidden">
        <div
          className="flex w-max ease-out duration-500"
          data-direction={direction}
          ref={carouselRef}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((slide) => (
            <div className="relative w-screen aspect-[4/5]">
              <Image src={slide.url} fill={true} alt="image" />
            </div>
          ))}
        </div>
        {/* Left Arrow */}
        <div className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <AiOutlineLine />
          </div>
        ))}
      </div>
    </Fragment>
  );
}
