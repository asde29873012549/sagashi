import { LuMessageCircle } from "react-icons/lu";
import { Fragment } from "react";
export default function MessageIcon() {
  return (
    <Fragment>
      <div className="rounded w-2.5 h-2.5 bg-red-700 absolute right-2 mb-3 z-50  md:hidden"></div>
      <LuMessageCircle className="absolute right-2 w-7 h-7 md:hidden" />
    </Fragment>
  );
}
