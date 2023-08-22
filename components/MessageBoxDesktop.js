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
				className="fixed bottom-0 right-[8%] z-20 h-3/5 w-80 overflow-scroll rounded-t-lg bg-background shadow-lg"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<header className="sticky top-0 flex h-14 w-full items-center border-b border-slate-200 bg-gray-50 px-2">
					<div className="flex w-full items-center justify-between">
						<Avatar className="h-10 w-10">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="ml-2 w-9/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
							Yellow 'Le Bob Artichaut' Bucket Hat Bucket Hat Bucket Hat
						</div>
						<RxCross2 className="h-5 w-5 hover:cursor-pointer " onClick={onCloseMessageBox} />
					</div>
				</header>
				<main
					className={`relative flex h-[calc(100%-6.5rem)] w-full flex-col px-3 ${
						message.length > 0 ? "items-end justify-start" : "items-center justify-center"
					}`}
				>
					{message.length > 0 ? (
						message.map((message) => <Message>{message}</Message>)
					) : (
						<div className="flex flex-col">
							<Avatar className="mx-auto h-24 w-24">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className="mt-2 flex flex-col items-center justify-center text-xs text-slate-400">
								<div>Margiela</div>
								<div>Yellow 'Le Bob Artichaut' Bucket Hat</div>
								<div>Listed 3 months ago</div>
							</div>
						</div>
					)}
				</main>
				<footer className="sticky bottom-0 bg-background p-2">
					<Input
						className="h-8 w-full rounded-full text-base placeholder:text-slate-400"
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
