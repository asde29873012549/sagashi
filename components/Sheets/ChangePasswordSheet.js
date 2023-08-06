import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ChangePasswordSheet() {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChangeOld = (e) => {
    setOldPassword(e.target.value);
  };

  const onChangeNew = (e) => {
    setNewPassword(e.target.value);
  };

  const onCancel = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} setOpen={setOpen}>
      <SheetTrigger className="underline text-xs">Change Password</SheetTrigger>
      <SheetContent side="bottom" className="h-5/6">
        <SheetHeader>
          <SheetTitle>Change Password</SheetTitle>
          <div className="flex flex-col w-full space-y-4 items-start">
            <div>Old Password</div>
            <Input
              className="w-full"
              type="password"
              value={oldPassword}
              onChange={onChangeOld}
            />
            <div>New Password</div>
            <Input
              className="w-full"
              type="password"
              value={newPassword}
              onChange={onChangeNew}
            />
          </div>
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
