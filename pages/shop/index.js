import ListingCard from '../../components/ListingCard'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
  } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox"


export default function Shop() {
	return (
		<div className="p-2 md:px-6 md:flex">
			<div className="hidden md:inline-block md:w-1/5 md:mr-10">
			<Accordion type="multiple" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Department</AccordionTrigger>
					<AccordionContent>
					<div className="flex items-center space-x-2">
					<Checkbox id="menswear" />
					<label
						htmlFor="menswear"
						className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
					>
						Menswear
					</label>
					</div>
					</AccordionContent>
					<AccordionContent>
					<div className="flex items-center space-x-2">
					<Checkbox id="womenswear" />
					<label
						htmlFor="womenswear"
						className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
					>
						Womenswear
					</label>
					</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>NEW ARRIVALS</AccordionTrigger>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Category</AccordionTrigger>
					<AccordionContent>
					<div>Menswear</div>
					<Accordion type="single" className="pl-4" collapsible>
						<AccordionItem value="item-6-1">
						<AccordionTrigger>Jackets</AccordionTrigger>
						<AccordionContent>Blazers</AccordionContent>
						<AccordionContent>Leather Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" className="pl-4" collapsible>
						<AccordionItem value="item-6-2">
						<AccordionTrigger>Blazers</AccordionTrigger>
						<AccordionContent>Short Blazers</AccordionContent>
						<AccordionContent>Long Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" className="pl-4" collapsible>
						<AccordionItem value="item-6-3">
						<AccordionTrigger>Knitwear</AccordionTrigger>
						<AccordionContent>Blue Knitwear</AccordionContent>
						<AccordionContent>goe Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					</AccordionContent>
					<AccordionContent>
						<div>Momenswear</div>
						<Accordion type="single"  className="pl-4" collapsible>
						<AccordionItem value="item-6-1">
						<AccordionTrigger>Jackets</AccordionTrigger>
						<AccordionContent>Blazers</AccordionContent>
						<AccordionContent>Leather Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single"  className="pl-4" collapsible>
						<AccordionItem value="item-6-2">
						<AccordionTrigger>Blazers</AccordionTrigger>
						<AccordionContent>Short Blazers</AccordionContent>
						<AccordionContent>Long Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single"  className="pl-4" collapsible>
						<AccordionItem value="item-6-3">
						<AccordionTrigger>Knitwear</AccordionTrigger>
						<AccordionContent>Blue Knitwear</AccordionContent>
						<AccordionContent>goe Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
						</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger>Size</AccordionTrigger>
					<AccordionContent>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-4-1">
						<AccordionTrigger>Jackets</AccordionTrigger>
						<AccordionContent>Blazers</AccordionContent>
						<AccordionContent>Leather Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-4-2">
						<AccordionTrigger>Blazers</AccordionTrigger>
						<AccordionContent>Short Blazers</AccordionContent>
						<AccordionContent>Long Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-4-3" className="border-b-0">
						<AccordionTrigger>Knitwear</AccordionTrigger>
						<AccordionContent>Blue Knitwear</AccordionContent>
						<AccordionContent>goe Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-5">
					<AccordionTrigger>Designers</AccordionTrigger>
					<AccordionContent>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-5-1">
						<AccordionTrigger>Jackets</AccordionTrigger>
						<AccordionContent>Blazers</AccordionContent>
						<AccordionContent>Leather Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-5-2">
						<AccordionTrigger>Blazers</AccordionTrigger>
						<AccordionContent>Short Blazers</AccordionContent>
						<AccordionContent>Long Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-5-3">
						<AccordionTrigger>Knitwear</AccordionTrigger>
						<AccordionContent>Blue Knitwear</AccordionContent>
						<AccordionContent>goe Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-6">
					<AccordionTrigger>Price</AccordionTrigger>
					<AccordionContent>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-6-1">
						<AccordionTrigger>Jackets</AccordionTrigger>
						<AccordionContent>Blazers</AccordionContent>
						<AccordionContent>Leather Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-6-2">
						<AccordionTrigger>Blazers</AccordionTrigger>
						<AccordionContent>Short Blazers</AccordionContent>
						<AccordionContent>Long Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-6-3">
						<AccordionTrigger>Knitwear</AccordionTrigger>
						<AccordionContent>Blue Knitwear</AccordionContent>
						<AccordionContent>goe Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-7">
					<AccordionTrigger>Conditions</AccordionTrigger>
					<AccordionContent>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-7-1">
						<AccordionTrigger>Jackets</AccordionTrigger>
						<AccordionContent>Blazers</AccordionContent>
						<AccordionContent>Leather Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-7-2">
						<AccordionTrigger>Blazers</AccordionTrigger>
						<AccordionContent>Short Blazers</AccordionContent>
						<AccordionContent>Long Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-7-3">
						<AccordionTrigger>Knitwear</AccordionTrigger>
						<AccordionContent>Blue Knitwear</AccordionContent>
						<AccordionContent>goe Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			</div>
			<div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:w-4/5">
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
				<ListingCard src="/banner.jpg"/>
			</div>
		</div>
	)
}