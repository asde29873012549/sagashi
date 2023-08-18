/*eslint-disable*/
import Message from "./Message";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";

import { useState } from "react";

export default function MessageBoxDesktop({ isOpen, onCloseMessageBox }) {
  const [val, setVal] = useState("");
  const [message, setMessages] = useState([]);

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
    isOpen && (
      <motion.div
        className="fixed bottom-0 right-[8%] w-80 h-3/5 bg-background z-20 rounded-t-lg overflow-scroll shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <header className="sticky top-0 w-full h-14 flex items-center border-b border-slate-200 px-2 bg-gray-50">
          <div className="flex items-center justify-between w-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2 text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-9/12">
              Yellow 'Le Bob Artichaut' Bucket Hat Bucket Hat Bucket Hat
            </div>
            <RxCross2
              className="w-5 h-5 hover:cursor-pointer "
              onClick={onCloseMessageBox}
            />
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
        <footer className="sticky bottom-0 p-2 bg-background">
          <Input
            className="rounded-full h-8 text-base w-full placeholder:text-slate-400"
            placeholder="Aa"
            onChange={onInput}
            onKeyDown={onPressEnter}
            value={val}
          />
        </footer>
      </motion.div>
    )
  );
}
