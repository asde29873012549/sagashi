import { GiCancel } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function OderItem() {
  return (
    <div className="flex flex-col">
      <Separator />
      <div className="flex justify-between items-center">
        <div className="mt-2">
          <span>Sending From</span>
          <span className="font-bold ml-2">@Noah</span>
        </div>
      </div>
      <div className="flex justify-between space-x-1 mt-2 w-full">
        <div className="flex w-11/12">
          <div className="relative w-2/5 max-w-[160px] aspect-[4/5] shrink-0">
            <Image src="/banner.jpg" fill={true} alt="test" />
          </div>
          <div className="flex flex-col ml-4 justify-between w-3/5">
            <div>
              <div className="text-lg font-semibold w-full ">
                Yellow HatYtYel
              </div>
              <div className="text-sm w-full truncate underline">
                Maison Margiela
              </div>
              <div className="text-xs w-full text-info">
                <span>ID</span>
                <span className="ml-2">453454269</span>
              </div>
            </div>

            <Button variant="outline" className="text-base p-4 h-8 w-fit">
              Size M
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end w-1/12 text-sm">
          <GiCancel />
          <div className="flex flex-col items-end">
            <div className="before:content-['$'] ml-1 line-through">48000</div>
            <div className="flex items-center">
              <div className="text-xs">(OFFER)</div>
              <div className="before:content-['$'] ml-1 text-red-800">
                40000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
