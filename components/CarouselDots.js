import { Separator } from "./ui/separator";

export default function CarouselDots({ currentImage, slides }) {
	const carouselDotLength = slides.length === 1 ? "w-full" : `w-${Math.floor(48 / slides.length)}`;
	return (
		<div className={`m-auto flex h-10 w-36 items-center space-x-2 md:hidden`}>
			{slides.map((slide, index) => (
				<Separator
					className={`${
						currentImage == index ? `${carouselDotLength} bg-slate-700` : "shrink"
					} inline-block h-px rounded bg-slate-400 transition-all duration-500`}
					key={index}
				/>
			))}
		</div>
	);
}
