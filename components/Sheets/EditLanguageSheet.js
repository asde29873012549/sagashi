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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function EditLanguageSheet() {
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState("TraditionalChinese");

  const onRadioSelect = (e) => {
    setRadio(e);
  };

  const onCancel = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} setOpen={setOpen}>
      <SheetTrigger>
        <BsFillPencilFill />
      </SheetTrigger>
      <SheetContent side="bottom" className="h-5/6">
        <SheetHeader>
          <SheetTitle>Edit Language</SheetTitle>
          <RadioGroup
            defaultValue="TraditionalChinese"
            className="flex-col"
            value={radio}
            onValueChange={onRadioSelect}
          >
            <div className="flex items-center space-x-1 mb-3">
              <RadioGroupItem
                value="TraditionalChinese"
                id="TraditionalChinese"
              />
              <Label htmlFor="TraditionalChinese">Traditional Chinese</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="English" id="English" />
              <Label htmlFor="English">English</Label>
            </div>
          </RadioGroup>
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
