export default function CarouselDots({ currentImage, slides }) {
  return (
    <div
      className={`md:hidden flex h-10 w-24 justify-between items-center m-auto [&>*:nth-child(${currentImage})]:text-slate-700`}
    >
      {slides.map((slide) => (
        <div key={slide.id} className="text-3xl text-slate-300">
          •
        </div>
      ))}
    </div>
  );
}
