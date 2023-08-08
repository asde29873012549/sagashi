import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input as SearchInput } from "./ui/input";

export default function SearchWord({ children }) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex">
          <div>SEARCH</div>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="md:flex md:w-full md:h-12 md:justify-end md:items-center">
              <SearchInput
                placeholder="Search"
                className="md:w-full md:h-10 h-[45px] w-10/12 placeholder:text-info font-normal"
                style={{ border: "none" }}
              ></SearchInput>
            </div>
          </DialogTitle>
          <DialogDescription style={{ margin: "0px" }}></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
