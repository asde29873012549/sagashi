import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Message from "./Message";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import socketInitializer from "@/lib/socketio/socketInitializer";
import socketEventCleaner from "@/lib/socketio/socketEventCleaner";
import socket from "@/lib/socketio/client";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { genericError } from "@/lib/userMessage";
import { useDispatch } from "react-redux";
import { setLastMessage } from "@/redux/messageSlice";
import useInterSectionObserver from "@/lib/hooks/useIntersectionObserver";

import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import getMessages from "@/lib/queries/fetchQuery";
import readMessage from "@/lib/queries/fetchQuery";
import createMessage from "@/lib/queries/fetchQuery";
import DOMPurify from "dompurify";

import { getDateDistance, parseISODate, timeDifference } from "@/lib/utils";

export default function MessageBoxMobile({
	className,
	wsData,
	image,
	listing_name,
	listing_designer,
	date,
}) {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [val, setVal] = useState("");
	const { toast } = useToast();
	const [id, setId] = useState([]);
	const messageBoxContainer = useRef();
	const messageBoxRef = useRef();

	const chatroom_id = `${wsData.product_id}-${wsData.listingOwner}-${wsData.username}`;

	const {
		data: messageData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["messages", chatroom_id],
		queryFn: ({ pageParam = "" }) => {
			const uri = `/message/${chatroom_id}` + (pageParam ? `?cursor=${pageParam}` : "");
			return getMessages({ uri });
		},
		getNextPageParam: (lastPage, pages) => lastPage.data?.[lastPage.data.length - 1]?.id,
		refetchOnWindowFocus: false,
	});

	const flattenMessageData = messageData?.pages?.map((pageObj) => pageObj.data).flat();

	const lastMessageElement = useInterSectionObserver({
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	});

	const { mutate: messageMutate } = useMutation({
		mutationFn: (inputValue) =>
			createMessage({
				uri: "/message",
				method: "POST",
				body: {
					product_id: wsData.product_id,
					seller_name: wsData.listingOwner,
					buyer_name: wsData.username,
					image,
					text: DOMPurify.sanitize(inputValue),
					isRead: false,
				},
			}),
		onMutate: async () => {
			// Snapshot the previous value
			const previousMessage = queryClient.getQueryData(["messages", chatroom_id]);

			// clear input
			setVal("");

			// Optimistically update to the new value
			queryClient.setQueryData(["messages", chatroom_id], (oldData) => {
				const newData = oldData;
				newData.pages[0].data.unshift({
					created_at: new Date().toISOString(),
					text: val,
					sender_name: wsData.username,
				});
				return newData;
			});
			// Return a context object with the snapshotted value
			return { previousMessage };
		},
		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (err, newTodo, context) => {
			queryClient.setQueryData(["messages", chatroom_id], context.previousMessage);
		},
		onSuccess: () => {
			const client = id[0]?.split("-")[2];
			// if the mutation succeeds, emit message to ws server and proceed
			socket.emit("message", {
				message: {
					created_at: new Date().toISOString(),
					text: val,
					sender_name: wsData.username,
					message_id: Message.data?.id,
				},
				client,
			});

			// set local user's last message state
			dispatch(setLastMessage({ chatroom_id, text: val }));
		},
	});

	const onCloseSheet = () => {
		setOpen(false);
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

	const onPressEnter = async (e) => {
		if (e.keyCode === 13) {
			// check who should be the client
			let client = null;

			client = id[0]?.split("-")[2];

			if (!client)
				return toast({
					title: "Failed !",
					description: genericError,
					status: "fail",
				});

			messageMutate(val);
		}
	};

	useEffect(() => {
		socketInitializer({
			queryClient,
			chatroom_id,
			setId,
			fetchQuery: async (message_id) =>
				await readMessage({
					uri: "/message",
					method: "PUT",
					body: {
						message_id,
					},
				}),
		});

		socket.io.opts.query.user = wsData.username;
		socket.io.opts.query.listingOwner = wsData.listingOwner;
		socket.io.opts.query.productId = wsData.product_id;

		return () => {
			console.log("socket disconnectd");
			socketEventCleaner(socket);
			socket.disconnect();
		};
	}, [wsData.username, wsData.listingOwner, wsData.product_id]);

	useEffect(() => {
		if (open) {
			socket.connect();
		}
	}, [open]);

	return (
		<div className={className}>
			<Sheet open={open} setOpen={setOpen}>
				<SheetTrigger
					onClick={onResizeMessageBox}
					className="h-12 w-full rounded-md bg-primary text-background transition-all duration-500 hover:border-2 hover:border-foreground hover:bg-background hover:text-foreground md:hidden md:w-4/5"
				>
					MESSAGE SELLER
				</SheetTrigger>
				<SheetContent
					//onClick={onCloseSheet}
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
								{listing_name}
							</div>
						</div>
					</header>

					<main
						className={`relative flex h-[calc(100%-6.5rem)] w-full flex-col px-3 ${
							flattenMessageData?.length ? "items-end justify-start" : "items-center justify-center"
						}`}
					>
						<div
							className="flex h-fit w-full flex-col-reverse overflow-scroll px-3"
							ref={messageBoxContainer}
						>
							{flattenMessageData?.length > 0 ? (
								flattenMessageData.map((msg, index) => {
									const ISOdate = msg.created_at;
									const prevDate = flattenMessageData[index + 1]?.created_at;
									const currDate = parseISODate(ISOdate || null);
									return (
										<div key={`${msg.text}-${index}`} className="w-full">
											{(timeDifference(ISOdate, prevDate) > 5 ||
												index === flattenMessageData.length - 1) && (
												<div className="mb-1 mt-4 flex w-full justify-center text-xs text-info">
													{currDate}
												</div>
											)}
											<Message
												lastMessageElement={
													index === flattenMessageData?.length - 1 ? lastMessageElement : null
												}
												selfMessage={msg.sender_name === wsData.username}
											>
												{msg.text}
											</Message>
										</div>
									);
								})
							) : (
								<div className="flex flex-col">
									<Avatar className="mx-auto h-24 w-24">
										<AvatarImage src={image} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className="mt-2 flex flex-col items-center justify-center text-xs text-slate-400">
										<div>{listing_designer}</div>
										<div>{listing_name}</div>
										<div>Listed {getDateDistance(date)}</div>
									</div>
								</div>
							)}
						</div>
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
