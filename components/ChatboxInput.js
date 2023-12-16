import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { genericError } from "@/lib/userMessage";

export default function ChatboxInput({
	updateMessageInput,
	currentActiveChatroom,
	messageMutate,
	isSmallMsgBox,
}) {
	const [val, setVal] = useState("");
	const { toast } = useToast();

	const onInput = (e) => {
		setVal(e.target.value);
	};

	const onPressEnter = async (e) => {
		if (e.keyCode === 13) {
			updateMessageInput({ val, setVal });
			// check who should be the recipient
			const [product_id, listingOwner, recipient] = currentActiveChatroom?.split("-");

			if (!recipient)
				return toast({
					title: "Failed !",
					description: genericError,
					status: "fail",
				});

			messageMutate({ val, product_id, listingOwner, recipient });
		}
	};

	return (
		<Input
			className={`${
				isSmallMsgBox ? "h-8 rounded-full" : "h-10 rounded-lg border-slate-800"
			} w-full text-base placeholder:text-slate-400`}
			placeholder="Aa"
			onChange={onInput}
			onKeyDown={onPressEnter}
			value={val}
		/>
	);
}
