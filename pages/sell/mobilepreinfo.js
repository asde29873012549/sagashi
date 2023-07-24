import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { LuShirt, LuWallet } from "react-icons/lu"
import { PiPants, PiShirtFoldedBold } from "react-icons/pi";
import { TbJacket, TbShoe } from "react-icons/tb";

export default function MobilePreInfo() {
  return (
    <main className="p-4">
	  <div className="grid grid-cols-2 gap-4">
		<div className="col-span-2 font-semibold">Department</div>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Menswear</Button>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Womenswear</Button>

		<div className="col-span-2 font-semibold">Category</div>
		<Button variant="outline" className="row-span-1 flex flex-col h-16 focus:bg-accent">
		  <LuShirt/>
		  <div>Tops</div>
		</Button>
		<Button variant="outline" className="row-span-1 flex flex-col h-16 focus:bg-accent">
		  <PiPants/>
		  <div>Buttoms</div>
		</Button>
		<Button variant="outline" className="row-span-1 flex flex-col h-16 focus:bg-accent">
		  <TbJacket/>
		  <div>Outerwear</div>
		</Button>
		<Button variant="outline" className="row-span-1 flex flex-col h-16 focus:bg-accent">
		  <TbShoe/>
		  <div>Footwear</div>
		</Button>
		<Button variant="outline" className="row-span-1 flex flex-col h-16 focus:bg-accent">
		  <PiShirtFoldedBold/>
		  <div>Tailoring</div>
		</Button>
		<Button variant="outline" className="row-span-1 flex flex-col h-16 focus:bg-accent">
		  <LuWallet/>
		  <div>Accessories</div>
		</Button>

		<div className="col-span-2 font-semibold">SubCategory</div>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Tops</Button>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Buttoms</Button>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Outerwear</Button>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Footwear</Button>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Tailoring</Button>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Accessories</Button>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Tailoring</Button>
		<Button variant="outline" className="row-span-1 focus:bg-accent">Accessories</Button>
	  </div>
    </main>
  );
}
