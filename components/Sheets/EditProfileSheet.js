import { Input } from "@/components/ui/input";
import DatePicker from "../DatePicker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState, Fragment } from "react";

export default function EditProfileSheet() {
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    birth: "",
    gender: "PreferNotToTell",
  });

  const onNameChange = (e) => {
    setFormVal({ ...formVal, name: e.target.value });
  };

  const onEmailChange = (e) => {
    setFormVal({ ...formVal, email: e.target.value });
  };

  const onRadioGroupSelect = (e) => {
    setFormVal({ ...formVal, gender: e });
  };

  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-2">
          <div>NAME</div>
          <Input
            className="w-2/3 h-fit"
            value={formVal.name}
            onChange={onNameChange}
          />
        </div>
        <div className="flex justify-between items-center py-2">
          <div>EMAIL</div>
          <Input
            className="w-2/3 h-fit"
            value={formVal.email}
            onChange={onEmailChange}
          />
        </div>
        <div className="flex justify-between items-center py-2">
          <div>BIRTH DATE</div>
          <DatePicker
            className="w-2/3 h-fit"
            formVal={formVal}
            setFormVal={setFormVal}
          />
        </div>
        <div className="flex justify-between items-center py-2">
          <div>GENDER</div>
          <RadioGroup
            className="flex-col w-2/3"
            value={formVal.gender}
            onValueChange={onRadioGroupSelect}
          >
            <div className="flex items-center space-x-1 mr-2 mb-2">
              <RadioGroupItem value="Male" id="Male" />
              <Label htmlFor="Male">Male</Label>
            </div>
            <div className="flex items-center space-x-1 mr-2 mb-2">
              <RadioGroupItem value="Female" id="Female" />
              <Label htmlFor="Female">Female</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="PreferNotToTell" id="PreferNotToTell" />
              <Label htmlFor="PreferNotToTell">Prefer Not To Tell</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Fragment>
  );
}
