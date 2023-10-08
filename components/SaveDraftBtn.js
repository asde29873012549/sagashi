import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { genericError, saveDraftSuccess, submitEmptyDraft } from "@/lib/userMessage";
import { sellSelector } from "@/redux/sellSlice";
import { useDispatch, useSelector } from "react-redux";
import { activate } from "@/redux/loadingSlice";
import { useToast } from "@/components/ui/use-toast";
import createDraft from "@/lib/queries/fetchQuery";
import { useRouter } from "next/router";

export default function SaveDraft({ className, tags }) {
	const dispatch = useDispatch();
	const formInput = useSelector(sellSelector).formInput;
	const { toast } = useToast();
	const router = useRouter();

	const { mutateAsync: draftMutate } = useMutation({
		mutationFn: (draft) =>
			createDraft({ uri: "/listing/draft", method: "POST", body: draft, isFormData: true }),
		onSuccess: () => {
			dispatch(activate());
			toast({
				title: saveDraftSuccess.title,
				description: saveDraftSuccess.desc,
				status: saveDraftSuccess.status,
			});

			setTimeout(() => {
				router.push("/");
			}, 1500);
		},
		onError: (error) => {
			dispatch(activate());
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	const onSaveDraft = async () => {
		if (Object.keys(formInput).length === 0) {
			toast({
				title: submitEmptyDraft.title,
				description: submitEmptyDraft.desc,
				status: submitEmptyDraft.status,
			});

			return;
		}

		dispatch(activate());

		const formData = new FormData();

		Object.keys(formInput).forEach((key) => {
			if (key === "photos") {
				Object.values(formInput[key]).forEach((photo) => formData.append("photo", photo));
			} else if (key === "tags" && tags && tags.length > 0) {
				formData.append("tags", tags.map((obj) => obj.value).join("&"));
			} else {
				formData.append(key, formInput[key]);
			}
		});

		try {
			await draftMutate(formData);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="col-span-2 flex justify-end p-0">
			<Button variant="link" className={className} onClick={onSaveDraft}>
				Save Draft
			</Button>
		</div>
	);
}
