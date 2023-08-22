import { Fragment, useState, useRef } from "react";

import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import CarouselDots from "./CarouselDots.js";

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
					carouselRef.current.appendChild(carouselRef.current.firstElementChild);
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
				className={`no-scrollbar relative aspect-[4/5] w-screen overflow-hidden md:w-2/5 md:overflow-scroll ${className}`}
			>
				<div
					className="flex h-full w-full justify-start transition-transform duration-500 ease-out md:flex-col"
					ref={carouselRef}
					onTransitionEnd={onTransitionEnd}
				>
					{slides.map((slide) => (
						<div
							className="relative aspect-[4/5] w-screen shrink-0 md:w-full"
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
				<div className="absolute left-5 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white md:hidden">
					<BsChevronCompactLeft onClick={prevSlide} size={30} />
				</div>
				{/* Right Arrow */}
				<div className="absolute right-5 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white md:hidden">
					<BsChevronCompactRight onClick={nextSlide} size={30} />
				</div>
			</div>
			<CarouselDots currentImage={currentImage} slides={slides} />
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
