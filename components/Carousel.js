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
	const isTouchActiveRef = useRef(false);

	const prevSlide = () => {
		if (direction > 0) {
			carouselRef.current.appendChild(carouselRef.current.firstElementChild);
			setDirection((d) => d * -1);
		}
		handleTouchPrevSlide();
	};

	const nextSlide = () => {
		if (direction < 0) {
			carouselRef.current.prepend(carouselRef.current.lastElementChild);
			setDirection((d) => d * -1);
		}
		handleTouchNextSlide();
	};

	const onTransitionEnd = () => {
		if (!isSwiped.current || isTouchActiveRef.current) return;
		direction > 0
			? carouselRef.current.appendChild(carouselRef.current.firstElementChild)
			: carouselRef.current.prepend(carouselRef.current.lastElementChild);
		carouselRef.current.style.transition = "none";
		carouselRef.current.style.transform = "translateX(0)";
		setTimeout(() => {
			carouselRef.current.style.transition = "transform 0.5s";
		});
	};

	const onTouchStart = (e) => {
		isTouchActiveRef.current = true;
		initialTouchRef.current = e.touches[0].screenX;
	};
	const onTouchMove = (e) => {
		endingTouchRef.current = e.touches[0].screenX;
		carouselRef.current.style.transform = `translateX(${
			endingTouchRef.current - initialTouchRef.current
		}px)`;
	};

	const onTouchEnd = () => {
		isTouchActiveRef.current = false;
		const distance = endingTouchRef.current - initialTouchRef.current;
		const isDirectionChanged = distance * direction > 0;
		if (Math.abs(distance) > 30) {
			isSwiped.current = true;
			if (isDirectionChanged) {
				setDirection((d) => d * -1);
				if (distance < 0) {
					carouselRef.current.prepend(carouselRef.current.lastElementChild);
					handleTouchNextSlide();
				} else {
					carouselRef.current.appendChild(carouselRef.current.firstElementChild);
					handleTouchPrevSlide();
				}
			} else {
				distance < 0 ? handleTouchNextSlide() : handleTouchPrevSlide();
			}
		} else {
			isSwiped.current = false;
			carouselRef.current.style.transform = "translateX(0px)";
		}

		initialTouchRef.current = null;
		endingTouchRef.current = null;
	};

	const handleTouchNextSlide = () => {
		carouselRef.current.style.justifyContent = "flex-start";
		carouselRef.current.style.transform = `translateX(-${carouselRef.current.offsetWidth}px)`;
		return setCurrentImage(carouselRef.current.children[1].id);
	};

	const handleTouchPrevSlide = () => {
		carouselRef.current.style.justifyContent = "flex-end";
		carouselRef.current.style.transform = `translateX(${carouselRef.current.offsetWidth}px)`;
		return setCurrentImage(carouselRef.current.children[slides.length - 2].id);
	};

	return (
		<Fragment>
			<div
				className={`no-scrollbar relative aspect-[4/5] w-screen overflow-hidden md:w-2/5 md:overflow-scroll ${className}`}
			>
				<div
					className="duration-400 flex h-full w-full justify-start transition-transform ease-out md:flex-col"
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
								priority
								src={slide.url}
								fill={true}
								alt="image"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
