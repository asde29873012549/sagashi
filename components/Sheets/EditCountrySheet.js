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
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { useEffect, useState } from "react";
import region from "../../lib/countries";

export default function EditCountrySheet() {
  const [countries, setCountries] = useState();
  const [open, setOpen] = useState(false);

  useEffect((lang = "en") => {
    const A = 65;
    const Z = 90;
    const countryName = new Intl.DisplayNames([lang], { type: "region" });
    const country = {};
    region.forEach((r) => {
      let name = countryName.of(r);
      country[r] = name;
    });
    setCountries(country);
  }, []);

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} setOpen={setOpen}>
      <SheetTrigger>
        <BsFillPencilFill />
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90%]">
        <SheetHeader>
          <SheetTitle>Edit Country</SheetTitle>
          <Command>
            <CommandInput placeholder="Search for country..." className="text-base"/>
            <CommandList className="max-h-[350px]">
              <CommandEmpty>No results found.</CommandEmpty>
              {countries &&
                Object.values(countries).map((c) => (
                  <CommandItem key={c}>{c}</CommandItem>
                ))}
            </CommandList>
          </Command>
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
