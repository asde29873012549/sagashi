import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Message from "./Message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import socketInitializer from "@/lib/socketio/socketInitializer";
import socketEventCleaner from "@/lib/socketio/socketEventCleaner";
import socket from "@/lib/socketio/client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLastMessage } from "@/redux/messageSlice";
import useInterSectionObserver from "@/lib/hooks/useIntersectionObserver";
import ChatboxInput from "./ChatboxInput";
import { setMobileMessageBoxOpen, messageSelector } from "@/redux/messageSlice";

import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import getMessages from "@/lib/queries/fetchQuery";
import readMessage from "@/lib/queries/fetchQuery";
import createMessage from "@/lib/queries/fetchQuery";
import DOMPurify from "dompurify";

import { getDateDistance, parseISODate, timeDifference } from "@/lib/utils";

export default function MessageBoxMobile({ className, user }) {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const isMobileMessageBoxOpen = useSelector(messageSelector).isMobileMessageBoxOpen;
	const messageBoxData = useSelector(messageSelector).mobileMessageBoxData;
	const [id, setId] = useState([]);
	const messageBoxContainer = useRef();
	const messageBoxRef = useRef();
	const childValStateRef = useRef("");

	const chatroom_id = `${messageBoxData?.product_id}-${messageBoxData?.listingOwner}-${messageBoxData?.username}`;

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
					product_id: messageBoxData?.product_id,
					seller_name: messageBoxData?.listingOwner,
					buyer_name: messageBoxData?.username,
					image: messageBoxData?.image,
					text: DOMPurify.sanitize(inputValue.val),
					isRead: false,
				},
			}),
		onMutate: async () => {
			// Snapshot the previous value
			const previousMessage = queryClient.getQueryData(["messages", chatroom_id]);

			// clear input
			childValStateRef.current.setVal("");

			// Optimistically update to the new value
			queryClient.setQueryData(["messages", chatroom_id], (oldData) => {
				const newData = oldData;
				newData.pages[0].data.unshift({
					created_at: new Date().toISOString(),
					text: childValStateRef.current.val,
					sender_name: user,
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
		onSuccess: (msgData) => {
			const client = id[0]?.split("-")[2];
			// if the mutation succeeds, emit message to ws server and proceed
			socket.emit("message", {
				message: {
					created_at: new Date().toISOString(),
					text: msgData?.data?.text,
					sender_name: messageBoxData?.username,
					message_id: msgData?.data?.id,
				},
				client,
			});

			// set local user's last message state
			dispatch(setLastMessage({ chatroom_id, text: msgData?.data?.text }));
		},
	});

	const onToggleSheet = (isOpen) => {
		dispatch(setMobileMessageBoxOpen(isOpen));
		if (isOpen) {
			window.visualViewport.addEventListener("resize", handleResize);
		} else {
			window.visualViewport.removeEventListener("resize", handleResize);
		}
	};

	const handleResize = () => {
		if (messageBoxRef.current) {
			messageBoxRef.current.style.height =
				window.visualViewport.height < 400 ? `${window.visualViewport.height}px` : "85vh";
		}
	};

	useEffect(() => {
		socketInitializer({
			queryClient,
			chatroom_id: `${messageBoxData?.product_id}-${messageBoxData?.listingOwner}-${messageBoxData?.username}`,
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

		socket.io.opts.query.user = messageBoxData?.username;
		socket.io.opts.query.listingOwner = messageBoxData?.listingOwner;
		socket.io.opts.query.productId = messageBoxData?.product_id;

		return () => {
			console.log("socket disconnectd");
			socketEventCleaner(socket);
			socket.disconnect();
		};
	}, [
		messageBoxData.username,
		messageBoxData.listingOwner,
		messageBoxData.product_id,
		queryClient,
	]);

	useEffect(() => {
		if (isMobileMessageBoxOpen) {
			socket.connect();
		}
	}, [isMobileMessageBoxOpen]);

	const updateMessageInput = (valStateFromChild) => {
		childValStateRef.current = valStateFromChild;
	};

	return (
		<>
			{isMobileMessageBoxOpen && (
				<div className={className}>
					<Sheet open={isMobileMessageBoxOpen} setOpen={onToggleSheet}>
						<SheetContent
							ref={messageBoxRef}
							side="bottom"
							className="h-[85vh] w-screen rounded-t-xl p-0"
						>
							<header className="sticky top-0 flex h-14 w-full items-center rounded-t-xl border-b border-slate-200 bg-gray-50 px-2">
								<div className="ml-3 flex w-full items-center">
									<Avatar className="h-10 w-10">
										<AvatarImage src={messageBoxData?.image} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className="ml-2 w-9/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
										{messageBoxData?.listing_name ||
											(user === messageBoxData?.username
												? messageBoxData?.listingOwner
												: messageBoxData?.username)}
									</div>
								</div>
							</header>

							<main
								className={`relative flex h-[calc(100%-6.5rem)] w-full flex-col px-3 ${
									flattenMessageData?.length
										? "items-end justify-start"
										: "items-center justify-center"
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
														selfMessage={msg.sender_name === user}
													>
														{msg.text}
													</Message>
												</div>
											);
										})
									) : (
										<div className="flex flex-col">
											<Avatar className="mx-auto h-24 w-24">
												<AvatarImage src={messageBoxData?.image} />
												<AvatarFallback>CN</AvatarFallback>
											</Avatar>
											<div className="mt-2 flex flex-col items-center justify-center text-xs text-slate-400">
												<div>{messageBoxData?.listing_designer}</div>
												<div>{messageBoxData?.listing_name}</div>
												{messageBoxData?.date && (
													<div>Listed {getDateDistance(messageBoxData.date)}</div>
												)}
											</div>
										</div>
									)}
								</div>
							</main>

							<footer className="sticky bottom-0 w-full bg-background p-2">
								<ChatboxInput
									updateMessageInput={updateMessageInput}
									currentActiveChatroom={chatroom_id}
									messageMutate={messageMutate}
									isSmallMsgBox={true}
								/>
							</footer>
						</SheetContent>
					</Sheet>
				</div>
			)}
		</>
	);
}
