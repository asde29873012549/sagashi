import { Separator } from "./ui/separator";

export default function CarouselDots({ currentImage, slides }) {
	const carouselDotLength = slides.length === 1 ? "w-full" : `w-${Math.floor(48 / slides.length)}`;
	return (
		<div className={`m-auto flex h-10 w-36 items-center space-x-2 md:hidden`}>
			{slides.map((slide, index) => (
				<div
					className={`${
						currentImage == index ? `${carouselDotLength} shrink-0 bg-slate-400` : "w-4 shrink"
					} inline-block h-px rounded bg-border transition-all duration-500`}
					key={index}
				/>
			))}
		</div>
	);
}
