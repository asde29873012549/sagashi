import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MenuBar() {
  return (
    <Sheet>
      <SheetTrigger className="absolute left-2 w-6 h-6 flex flex-col justify-between md:hidden">
        <hr className="h-0.5 w-full bg-foreground border-0" />
        <hr className="h-0.5 w-full bg-foreground border-0" />
        <hr className="h-0.5 w-full bg-foreground border-0" />
        <hr className="h-0.5 w-full bg-foreground border-0" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex justify-center items-center">
            <Button variant="ghost">Men</Button>
            <Button variant="ghost">Men</Button>
            <Button variant="ghost">Men</Button>
            <Button variant="ghost">Men</Button>
          </div>
        </SheetHeader>
        <Separator />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>HOME</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>NEW ARRIVALS</AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>DESIGNERS</AccordionTrigger>
            <AccordionContent>Acne Studios</AccordionContent>
            <AccordionContent>Maison Margiela</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>CLOTHING</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Jackets</AccordionTrigger>
                  <AccordionContent>Blazers</AccordionContent>
                  <AccordionContent>Leather Jackets</AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Blazers</AccordionTrigger>
                  <AccordionContent>Short Blazers</AccordionContent>
                  <AccordionContent>Long Jackets</AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-7">
                  <AccordionTrigger>Knitwear</AccordionTrigger>
                  <AccordionContent>Blue Knitwear</AccordionContent>
                  <AccordionContent>goe Jackets</AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
