import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MyItem from "../../components/Sheets/MyItemSheet";
import MyProfile from "../../components/Sheets/EditProfileSheet";
import MyAddress from "../../components/Sheets/EditAddressSheet";
import MyLanguage from "../../components/Sheets/EditLanguageSheet";
import MyCountry from "../../components/Sheets/EditCountrySheet";
import ContactUs from "../../components/Sheets/ContactUsForm";
import ChangePassword from "../../components/Sheets/ChangePasswordSheet";

export default function MobileSheetWrapper({ trigger, feature, sheet }) {
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
      <SheetContent side="bottom" className="h-[88%] overflow-scroll">
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
