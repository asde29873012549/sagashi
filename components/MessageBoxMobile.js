import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Message from "./Message";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRef, useState } from "react";

export default function MessageBoxMobile({ className }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [message, setMessages] = useState([]);
  const messageBoxRef = useRef();

  const onCloseSheet = () => {
    setOpen(false);
    console.log("123");
    window.visualViewport.removeEventListener("resize", handleResize);
  };

  const onResizeMessageBox = () => {
    setOpen(true);
    window.visualViewport.addEventListener("resize", handleResize);
  };

  const handleResize = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.style.height =
        window.visualViewport.height < 400
          ? `${window.visualViewport.height}px`
          : "85vh";
    }
  };

  const onInput = (e) => {
    setVal(e.target.value);
  };

  const onPressEnter = (e) => {
    if (e.keyCode === 13) {
      setMessages((m) => [...m, val]);
      setVal("");
    }
  };

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger
          open={open}
          onOpenChange={setOpen}
          onClick={onResizeMessageBox}
          className="text-background bg-primary rounded-md w-full md:w-4/5 h-12 hover:bg-background hover:border-foreground hover:border-2 hover:text-foreground md:hidden transition-all duration-500"
        >
          MESSAGE SELLER
        </SheetTrigger>
        <SheetContent
          onClick={onCloseSheet}
          ref={messageBoxRef}
          side="bottom"
          className="w-screen h-[85vh] rounded-t-xl p-0"
        >
          <header className="sticky top-0 w-full h-14 flex items-center border-b border-slate-200 px-2 bg-gray-50 rounded-t-xl">
            <div className="flex items-center ml-3 w-full">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-2 text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-9/12">
                Yellow 'Le Bob Artichaut' Bucket Hat Bucket Hat Bucket Hat
              </div>
            </div>
          </header>

          <main
            className={`relative w-full flex h-[calc(100%-6.5rem)] px-3 flex-col ${
              message.length > 0
                ? "justify-start items-end"
                : "justify-center items-center"
            }`}
          >
            {message.length > 0 ? (
              message.map((message) => <Message>{message}</Message>)
            ) : (
              <div className="flex flex-col">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-xs text-slate-400 justify-center items-center mt-2">
                  <div>Margiela</div>
                  <div>Yellow 'Le Bob Artichaut' Bucket Hat</div>
                  <div>Listed 3 months ago</div>
                </div>
              </div>
            )}
          </main>

          <footer className="sticky bottom-0 p-2 bg-background w-full">
            <Input
              className="rounded-full h-12 text-base w-full placeholder:text-slate-400"
              placeholder="Aa"
              autoFocus={true}
              onChange={onInput}
              onKeyDown={onPressEnter}
              value={val}
            />
          </footer>
        </SheetContent>
      </Sheet>
    </div>
  );
}
