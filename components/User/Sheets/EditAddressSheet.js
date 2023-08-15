/* eslint-disable*/
import { Textarea } from "@/components/ui/textarea";
import { useState, Fragment } from "react";

export default function EditAddressSheet() {
  const [textVal, setTextVal] = useState("");

  const onTextChange = (e) => {
    setTextVal(e.target.value);
  };

  return (
    <Fragment>
      <div className="flex flex-col">
        <Textarea
          value={textVal}
          className="text-base h-1/3"
          onChange={onTextChange}
        />
      </div>
    </Fragment>
  );
}
