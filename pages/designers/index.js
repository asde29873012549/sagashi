import { Button } from "@/components/ui/button";
import DesignerAlphabaticSec from "@/components/DesignerAlphabaticSec";
import { useRef } from "react";

const designers = [
	"Vintage",
	"Streetwear",
	"Japanese Brand",
	"Nike",
	"Adidas",
	"Supreme",
	"Polo Ralph Lauren",
	"Burberry",
	"Jordan Brand",
	"Louis Vuitton",
	"Gucci",
	"Uniqlo",
	"Champion",
	"A Bathing Ape",
	"Carhartt",
	"The North Face",
	"New Era",
	"Tommy Hilfiger",
	"Stussy",
	"Dolce & Gabbana",
	"Anti Social Social Club",
	"Prada",
	"Issey Miyake",
	"Ralph Lauren",
	"Balenciaga",
];

const alphabat = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default function Designers() {
	const alphabatRef = useRef();

	const onAlphabatClick = (alph) => {
		const resMap = alphabatRef.current;
		const node = resMap.get(alph);
		node.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	return (
		<main className="w-screen p-2 md:px-14 md:py-8">
			<h1 className="my-4 text-xl font-bold md:my-8 md:text-2xl">Designer from A-Z</h1>
			<header className="grid grid-cols-10 md:flex md:w-full md:flex-wrap md:items-center md:justify-between">
				{alphabat.map((alph) => (
					<Button
						variant="ghost"
						className="m-0 w-fit px-1 text-xl md:px-3"
						key={alph}
						onClick={() => onAlphabatClick(alph)}
					>
						{alph}
					</Button>
				))}
			</header>
			<section className="mt-12">
				<DesignerAlphabaticSec alphabat="A" designers={designers} alphabatRef={alphabatRef} />
				<DesignerAlphabaticSec alphabat="B" designers={designers} alphabatRef={alphabatRef} />
			</section>
		</main>
	);
}
