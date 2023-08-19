/*eslint-disable*/
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import SheetWrapper from "@/components/User/Sheets/SheetWrapper";

export default function Info() {
  const router = useRouter();
  const [routes, setRoutes] = useState(router.query.slug);

  useEffect(() => {
    setRoutes(router.query.slug);
  }, [router.query.slug]);

  return (
    <main className="w-screen p-2 md:py-8 md:px-14 flex flex-col space-y-9">
      <section className="w-full md:w-4/6 m-auto">
        <h1 className="text-2xl font-semibold my-2 md:my-4">
          Customer Service
        </h1>
        <Accordion
          type="single"
          value={routes}
          onValueChange={setRoutes}
          collapsible
        >
          <AccordionItem value="order&delivery">
            <AccordionTrigger>Order & Delivery</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="return&refund">
            <AccordionTrigger>Return & Refund</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contactus">
            <AccordionTrigger>Contact Us</AccordionTrigger>
            <AccordionContent>
              <SheetWrapper
                trigger={
                  <div className="text-sm hover:underline">
                    Contact us through email
                  </div>
                }
                feature="Contact Us"
                sheet="ContactUs"
                side="right"
                className="h-full w-[90%] md:w-1/4"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="w-full md:w-4/6 m-auto">
        <h1 className="text-2xl font-semibold my-2 md:my-4">Information</h1>
        <Accordion
          type="single"
          value={routes}
          onValueChange={setRoutes}
          collapsible
        >
          <AccordionItem value="about">
            <AccordionTrigger>ABOUT</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faqs">
            <AccordionTrigger>FAQs</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="terms&conditions">
            <AccordionTrigger>TERMS & CONDITIONS</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="privacypolicy">
            <AccordionTrigger>PRIVACY POLICY</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="my-10 m-auto w-full md:w-4/6 flex flex-col">
        <h1 className="text-lg">Do you find these information helpful?</h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-5">
          <Button className="w-full md:w-24">Yes</Button>
          <Button className="w-full md:w-24">No</Button>
        </div>
      </section>
    </main>
  );
}
