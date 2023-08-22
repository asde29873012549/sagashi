import OderItem from "@/components/OrderItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ShoppingBag() {
	return (
		<div className="relative flex flex-col p-8">
			<div className="mb-4 text-2xl font-bold">SHOPPING BAG</div>
			<div className="md:flex md:justify-between">
				<div className="shrink-0 space-y-4 md:w-4/6">
					<OderItem />
					<OderItem />
					<OderItem />
				</div>
				<div className="sticky bottom-0 right-0 w-full bg-white/95 px-4 md:w-2/6 ">
					<div className="space-y-2">
						<div className="my-2 text-lg font-semibold">Summary</div>
						<div className="flex w-full justify-between">
							<div>SubTotal</div>
							<div className="before:mr-1 before:content-['$']">40000</div>
						</div>
						<div className="flex w-full justify-between">
							<div>Delivery Fee</div>
							<div className="before:mr-1 before:content-['$']">40</div>
						</div>
						<Separator />
						<div className="flex w-full justify-between">
							<div>Total</div>
							<div className="before:mr-1 before:content-['NTD']">40040</div>
						</div>
					</div>
					<Button className="mt-4 w-full">Go to Checkout</Button>
				</div>
			</div>
		</div>
	);
}
