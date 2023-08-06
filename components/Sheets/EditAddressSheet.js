import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BsFillPencilFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function EditAddressSheet() {
  const [open, setOpen] = useState(false);
  const [textVal, setTextVal] = useState("");

  const onTextChange = (e) => {
    setTextVal(e.target.value);
  };
  const onCancel = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} setOpen={setOpen}>
      <SheetTrigger>
        <BsFillPencilFill />
      </SheetTrigger>
      <SheetContent side="bottom" className="h-5/6 overflow-scroll">
        <SheetHeader>
          <SheetTitle>Edit Address</SheetTitle>
          <div className="flex flex-col">
            <Textarea
              value={textVal}
              className="text-base h-1/3"
              onChange={onTextChange}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-full px-6">
            <Button className="w-full mb-4">SAVE</Button>
            <Button
              variant="destructive"
              className="w-full mb-4"
              onClick={onCancel}
            >
              CANCEL
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
