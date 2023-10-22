import { Separator } from "./ui/separator";

export default function CarouselDots({ currentImage, slides }) {
	return (
		<div className={`m-auto flex h-10 w-36 items-center justify-between md:hidden`}>
			{slides.map((slide, index) => (
				<Separator
					className={`inline-block h-px w-4 rounded bg-slate-400 transition-all duration-500 ${
						currentImage == index ? "w-12 bg-slate-700" : ""
					}`}
					key={index}
				/>
			))}
		</div>
	);
}
