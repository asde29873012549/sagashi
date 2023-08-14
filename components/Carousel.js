import { Fragment, useState, useRef } from "react";

import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";

export default function Carousel({ className }) {
  const slides = [
    {
      id: 1,
      url: "/mr_1.jpg",
    },
    {
      id: 2,
      url: "/mr_2.jpg",
    },
    {
      id: 3,
      url: "/mr_3.jpg",
    },

    {
      id: 4,
      url: "/mr_4.jpg",
    },
    {
      id: 5,
      url: "/mr_5.jpg",
    },
  ];

  const [direction, setDirection] = useState(1);
  const carouselRef = useRef();
  const initialTouchRef = useRef();
  const endingTouchRef = useRef();
  const isSwiped = useRef(true);
  const [currentImage, setCurrentImage] = useState(1);

  const prevSlide = () => {
    if (direction > 0) {
      carouselRef.current.appendChild(carouselRef.current.firstElementChild);
      setDirection((d) => d * -1);
      setCurrentImage(carouselRef.current.children[1].id);
    }
    setCurrentImage(carouselRef.current.children[slides.length - 2].id);
    carouselRef.current.style.justifyContent = "flex-end";
    carouselRef.current.style.transform = "translateX(100%)";
  };

  const nextSlide = () => {
    if (direction < 0) {
      carouselRef.current.prepend(carouselRef.current.lastElementChild);
      setDirection((d) => d * -1);
      setCurrentImage(carouselRef.current.children[slides.length - 2].id);
    }
    setCurrentImage(carouselRef.current.children[1].id);
    carouselRef.current.style.justifyContent = "flex-start";
    carouselRef.current.style.transform = "translateX(-100%)";
  };

  const onTransitionEnd = () => {
    if (!isSwiped.current) return;
    direction > 0
      ? carouselRef.current.appendChild(carouselRef.current.firstElementChild)
      : carouselRef.current.prepend(carouselRef.current.lastElementChild);
    carouselRef.current.style.transition = "none";
    carouselRef.current.style.transform = "translateX(0%)";
    setTimeout(() => {
      carouselRef.current.style.transition = "transform 0.5s";
    });
  };

  const onTouchStart = (e) => {
    initialTouchRef.current = e.touches[0].screenX;
  };
  const onTouchMove = (e) => {
    endingTouchRef.current = e.touches[0].screenX;
    const movement = e.touches[0].screenX - initialTouchRef.current;
    carouselRef.current.style.transform = `translateX(${movement}px)`;
  };

  const onTouchEnd = () => {
    const distance = endingTouchRef.current - initialTouchRef.current;
    const swipeDirection = distance < 0 ? 1 : -1;
    if (Math.abs(distance) > 50) {
      isSwiped.current = true;
      if (swipeDirection !== direction) {
        setDirection(swipeDirection);
        if (swipeDirection === 1) {
          carouselRef.current.prepend(carouselRef.current.lastElementChild);
          carouselRef.current.style.justifyContent = "flex-end";
          carouselRef.current.style.transform = "translateX(100vw)";
          setCurrentImage(carouselRef.current.children[1].id);
        } else {
          carouselRef.current.appendChild(
            carouselRef.current.firstElementChild,
          );
          carouselRef.current.style.justifyContent = "flex-end";
          carouselRef.current.style.transform = "translateX(100vw)";
          setCurrentImage(carouselRef.current.children[slides.length - 2].id);
        }
      } else {
        if (distance < 0) {
          carouselRef.current.style.justifyContent = "flex-start";
          carouselRef.current.style.transform = "translateX(-100vw)";
          setCurrentImage(carouselRef.current.children[1].id);
        } else if (distance > 0) {
          carouselRef.current.style.justifyContent = "flex-end";
          carouselRef.current.style.transform = "translateX(100vw)";
          setCurrentImage(carouselRef.current.children[slides.length - 2].id);
        }
      }
    } else {
      isSwiped.current = false;
      carouselRef.current.style.transform = "translateX(0px)";
    }

    initialTouchRef.current = null;
    endingTouchRef.current = null;
  };

  return (
    <Fragment>
      <div
        className={`relative w-screen aspect-[4/5] overflow-hidden md:w-2/5 md:overflow-scroll no-scrollbar ${className}`}
      >
        <div
          className="flex justify-start transition-transform ease-out duration-500 w-full h-full md:flex-col"
          ref={carouselRef}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((slide) => (
            <div
              className="w-screen aspect-[4/5] relative shrink-0 md:w-full"
              key={slide.url}
              id={slide.id}
            >
              <Image
                src={slide.url}
                fill={true}
                alt="image"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              />
            </div>
          ))}
        </div>
        {/* Left Arrow */}
        <div className="md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
      <div
        className={
          "md:hidden flex h-10 w-36 justify-between items-center m-auto odd:bg-slate-700 odd:w-12"
        }
      >
        {slides.map((slide) => (
          <Separator
            className="w-5 h-px rounded inline-block bg-slate-400 transition-all duration-500"
            key={slide.url}
          />
        ))}
      </div>
    </Fragment>
  );
}

/**
 * <div className={`md:hidden flex h-10 w-36 justify-between items-center m-auto [&>*:nth-child(currentImage)]:bg-slate-700 [&>*:nth-child(currentImage)]:w-12`}>
        {slides.map((slide) => (
          <Separator
            className="w-5 h-px rounded inline-block bg-slate-400 transition-all duration-500"
            key={slide.url}
          />
        ))}
      </div>
 */
