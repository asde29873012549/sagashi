/*eslint-disable*/
import OderItem from "@/components/OrderItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ShoppingBag() {
  return (
    <div className="flex flex-col p-8 relative">
      <div className="text-2xl font-bold mb-4">SHOPPING BAG</div>
      <div className="md:flex md:justify-between">
        <div className="space-y-4 md:w-4/6 shrink-0">
          <OderItem />
          <OderItem />
          <OderItem />
        </div>
        <div className="sticky bottom-0 w-full right-0 px-4 bg-white/95 md:w-2/6 ">
          <div className="space-y-2">
            <div className="my-2 text-lg font-semibold">Summary</div>
            <div className="flex justify-between w-full">
              <div>SubTotal</div>
              <div className="before:content-['$'] before:mr-1">40000</div>
            </div>
            <div className="flex justify-between w-full">
              <div>Delivery Fee</div>
              <div className="before:content-['$'] before:mr-1">40</div>
            </div>
            <Separator />
            <div className="flex justify-between w-full">
              <div>Total</div>
              <div className="before:content-['NTD'] before:mr-1">40040</div>
            </div>
          </div>
          <Button className="w-full mt-4">Go to Checkout</Button>
        </div>
      </div>
    </div>
  );
}
