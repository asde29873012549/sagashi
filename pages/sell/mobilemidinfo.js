import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

export default function MobileMidInfo() {
  return (
    <main className="p-4 relative h-full">
		<div className="grid grid-cols-2 gap-4">
			<div className="col-span-2 font-semibold">Condition</div>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			New / Never Worn
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Gently Used
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Used
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Very Worn
			</Button>
		</div>
		<div className="grid grid-cols-4 gap-4 mt-8">
			<div className="col-span-4 font-semibold">Size</div>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			XXS
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			XS
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			S
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			M
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			L
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			XL
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			XXL
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			3XL
			</Button>
		</div>
		<div className="grid grid-cols-4 gap-4 mt-8">
			<div className="col-span-4 font-semibold">Color</div>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Black
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			White
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Blue
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Red
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Grey
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Brown
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Navy
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Green
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Yellow
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Orange
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Purple
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Beige
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Pink
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Silver
			</Button>
			<Button variant="outline" className="row-span-1 focus:bg-accent">
			Gold
			</Button>
		</div>
	  
		<Button className="flex justify-content items-center bg-blue-800 mt-10 w-full bottom-0">
			<Link href="/sell/mobilelastinfo">NEXT</Link>
		</Button>
	  
    </main>
  );
}
