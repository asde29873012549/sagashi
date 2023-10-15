import { Separator } from "./ui/separator";

export default function CarouselDots({ currentImage, slides }) {
	return (
		<div className={`m-auto flex h-10 w-36 items-center justify-between md:hidden`}>
			{slides.map((slide) => (
				<Separator
					className={`inline-block h-px w-4 rounded bg-slate-400 transition-all duration-500 ${
						currentImage == slide.id ? "w-12 bg-slate-700" : ""
					}`}
					key={slide.url}
				/>
			))}
		</div>
	);
}
