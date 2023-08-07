import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, Fragment } from "react";

export default function EditLanguageSheet() {
  const [radio, setRadio] = useState("TraditionalChinese");

  const onRadioSelect = (e) => {
    setRadio(e);
  };

  return (
    <Fragment>
      <RadioGroup
        defaultValue="TraditionalChinese"
        className="flex-col"
        value={radio}
        onValueChange={onRadioSelect}
      >
        <div className="flex items-center space-x-1 mb-3">
          <RadioGroupItem value="TraditionalChinese" id="TraditionalChinese" />
          <Label htmlFor="TraditionalChinese">Traditional Chinese</Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="English" id="English" />
          <Label htmlFor="English">English</Label>
        </div>
      </RadioGroup>
    </Fragment>
  );
}
