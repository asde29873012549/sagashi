import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MyItem from "./MyItemSheet";
import MyProfile from "./EditProfileSheet";
import MyAddress from "./EditAddressSheet";
import MyLanguage from "./EditLanguageSheet";
import MyCountry from "./EditCountrySheet";
import ContactUs from "./ContactUsForm";
import ChangePassword from "./ChangePasswordSheet";

export default function SheetWrapper({
  trigger,
  feature,
  sheet,
  side = "bottom",
  className = "h-[88%] overflow-scroll",
}) {
  const [open, setOpen] = useState(false);

  const onCancel = () => {
    setOpen(false);
  };

  const sheets = {
    MyItem: <MyItem />,
    MyProfile: <MyProfile />,
    MyAddress: <MyAddress />,
    MyLanguage: <MyLanguage />,
    MyCountry: <MyCountry />,
    ContactUs: <ContactUs setOpen={setOpen} />,
    ChangePassword: <ChangePassword />,
  };

  return (
    <Sheet open={open} setOpen={setOpen}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{feature}</SheetTitle>
          {sheets[sheet]}
          {sheet !== "MyItem" && sheet !== "ContactUs" && (
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
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
