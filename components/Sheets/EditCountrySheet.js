import { Fragment } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useEffect, useState } from "react";
import region from "../../lib/countries";

export default function EditCountrySheet() {
  const [countries, setCountries] = useState();

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

  return (
    <Fragment>
      <Command>
        <CommandInput
          placeholder="Search for country..."
          className="text-base"
        />
        <CommandList className="max-h-[350px]">
          <CommandEmpty>No results found.</CommandEmpty>
          {countries &&
            Object.values(countries).map((c) => (
              <CommandItem key={c}>{c}</CommandItem>
            ))}
        </CommandList>
      </Command>
    </Fragment>
  );
}
