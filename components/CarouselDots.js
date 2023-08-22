export default function CarouselDots({ currentImage, slides }) {
	return (
		<div
			className={`m-auto flex h-10 w-24 items-center justify-between md:hidden [&>*:nth-child(${currentImage})]:text-slate-700`}
		>
			{slides.map((slide) => (
				<div key={slide.id} className="text-3xl text-slate-300">
					•
				</div>
			))}
		</div>
	);
}
