import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
				window.visualViewport.height < 400 ? `${window.visualViewport.height}px` : "85vh";
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
					className="h-12 w-full rounded-md bg-primary text-background transition-all duration-500 hover:border-2 hover:border-foreground hover:bg-background hover:text-foreground md:hidden md:w-4/5"
				>
					MESSAGE SELLER
				</SheetTrigger>
				<SheetContent
					onClick={onCloseSheet}
					ref={messageBoxRef}
					side="bottom"
					className="h-[85vh] w-screen rounded-t-xl p-0"
				>
					<header className="sticky top-0 flex h-14 w-full items-center rounded-t-xl border-b border-slate-200 bg-gray-50 px-2">
						<div className="ml-3 flex w-full items-center">
							<Avatar className="h-10 w-10">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className="ml-2 w-9/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
								Yellow Le Bob Artichaut Bucket Hat Bucket Hat Bucket Hat
							</div>
						</div>
					</header>

					<main
						className={`relative flex h-[calc(100%-6.5rem)] w-full flex-col px-3 ${
							message.length > 0 ? "items-end justify-start" : "items-center justify-center"
						}`}
					>
						{message.length > 0 ? (
							message.map((message) => <Message key={message}>{message}</Message>)
						) : (
							<div className="flex flex-col">
								<Avatar className="mx-auto h-24 w-24">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div className="mt-2 flex flex-col items-center justify-center text-xs text-slate-400">
									<div>Margiela</div>
									<div>Yellow Le Bob Artichaut Bucket Hat</div>
									<div>Listed 3 months ago</div>
								</div>
							</div>
						)}
					</main>

					<footer className="sticky bottom-0 w-full bg-background p-2">
						<Input
							className="h-12 w-full rounded-full text-base placeholder:text-slate-400"
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
