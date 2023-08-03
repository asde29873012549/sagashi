import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Message from "./Message";
import { Input } from "@/components/ui/input";

import { useRef, useState } from "react";

export default function MessageBox({ className }) {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger className="text-background bg-primary rounded-md w-full md:w-4/5 h-12 hover:bg-background hover:border-foreground hover:border-2 hover:text-foreground md:hidden">
          MESSAGE SELLER
        </SheetTrigger>
        <SheetContent side="bottom" className="w-screen h-[85vh] rounded-t-xl">
          <div className="mt-5 relative h-full">
            <Message>Hi!!!There are bugs</Message>
            <Message>Hi!!!There are bugs</Message>
            <Message>Hi!!!There are bugs</Message>
            <Message>Hi!!!There are bugs</Message>
            <Input className="rounded-full absolute bottom-3 h-12 text-base" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
