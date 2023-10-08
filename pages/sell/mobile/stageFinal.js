import { Button } from "@/components/ui/button";
import ComboBox from "@/components/ui/comboBox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GiCancel } from "react-icons/gi";
import { Progress } from "@/components/ui/progress";

import { useRef, Fragment } from "react";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import ImageUploadCard from "@/components/ui/image-upload-card";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import {
	makeProgress,
	mobileFormInput,
	mobileInputTags,
	mobileRemoveTags,
	sellSelector,
} from "@/redux/sellSlice";
import { activate } from "@/redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import getAllDesigners from "@/lib/queries/fetchQuery";
import SaveDraftBtn from "@/components/SaveDraftBtn";
import { uploadSuccess } from "@/lib/userMessage";

import Link from "next/link";

export default function MobileLastInfo() {
	const dispatch = useDispatch();
	const router = useRouter();
	const formInput = useSelector(sellSelector).formInput;
	const tags = useSelector(sellSelector).tags;
	const childStateRef = useRef();
	const dataRef = useRef({
		designer: null,
		designer_id: null,
		item_name: null,
		desc: null,
		tags: [],
		Photos: {},
	});

	const {
		data: designerData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["designer", "infinite"],
		queryFn: ({ pageParam = "" }) =>
			getAllDesigners({
				uri: `/designer?cursor=${pageParam && encodeURI(JSON.stringify(pageParam))}`,
			}),
		getNextPageParam: (lastPage, pages) => lastPage?.data[lastPage.data.length - 1]?.sort,
		refetchOnWindowFocus: false,
	});

	const onFormInput = (e, form) => {
		dispatch(mobileFormInput({ key: form, value: e.target.value }));
		dataRef.current[form] = e.target.value;
		dataRef.current.designer = childStateRef.current.val.value;
	};

	const onTagInputKeyDown = (e, id) => {
		if (e.keyCode === 32 || e.keyCode === 13) {
			dispatch(mobileInputTags({ id, value: e.target.value }));
			dispatch(mobileFormInput({ key: "tags", value: "" }));
			dataRef.current.tags.push(e.target.value);
		}
	};

	const onTagInput = (e) => {
		dispatch(mobileFormInput({ key: "tags", value: e.target.value }));
	};

	const onCancelTag = (tagId) => {
		dispatch(mobileRemoveTags(tagId));
	};

	const { mutateAsync: saveMutate } = useMutation({
		mutationFn: (product) =>
			createDraft({ uri: "/listing/create", method: "POST", body: product, isFormData: true }),
		onSuccess: () => {
			dispatch(activate());
			toast({
				title: uploadSuccess.title,
				description: uploadSuccess.desc,
				status: uploadSuccess.status,
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

	const onSubmit = async () => {
		dispatch(activate());

		const formData = new FormData();

		Object.keys(formInput).forEach((key) => {
			if (key === "photos") {
				Object.values(formInput[key]).forEach((photo) => formData.append("photo", photo));
			} else if (key === "tags" && tags.length > 0) {
				formData.append("tags", tags.map((obj) => obj.value).join("&"));
			} else {
				formData.append(key, formInput[key]);
			}
		});

		try {
			await saveMutate(formData);
		} catch (err) {
			console.log(err);
		}
	};

	const progressStatus = useSelector(sellSelector).progress;
	const onMakeProgress = (progress) => dispatch(makeProgress(progress));

	return (
		<Fragment>
			<Progress
				value={progressStatus}
				className="fixed z-10 h-1 rounded-none shadow-sm md:hidden"
			/>
			<main className="relative h-full p-4">
				<SaveDraftBtn className="h-fit w-fit p-0 text-sky-900 hover:underline" tags={tags} />
				<div className="font-semibold">Designers</div>
				<ComboBox
					ref={childStateRef}
					data={designerData?.pages ?? []}
					fetchNextPage={fetchNextPage}
					isFetchingNextPage={isFetchingNextPage}
					hasNextPage={hasNextPage}
					dispatchFormInput={true}
					onMakeProgress={onMakeProgress}
					cacheValue={formInput.designer}
				/>
				<div className="mt-6 font-semibold">Item Name</div>
				<Input
					placeholder="Item Name"
					className="mt-6 h-10 w-full text-base font-light placeholder:text-gray-400"
					value={formInput.item_name}
					onChange={(e) => onFormInput(e, "item_name")}
				/>
				<div className="mt-6 font-semibold">Description</div>
				<Textarea
					placeholder="Add details about condition, how the garments fits, additional measurements, etc."
					className="mt-6 h-36 w-full text-base font-light placeholder:text-gray-400"
					value={formInput.desc}
					onChange={(e) => onFormInput(e, "desc")}
					onFocus={() => onMakeProgress(95)}
				/>
				<div>
					<div className="mt-6 font-semibold">Tags</div>
					<div>
						{tags.map((tag) => (
							<Button
								key={tag.id}
								variant="secondary"
								className="mb-2 mr-2 mt-6 hover:bg-destructive"
								onClick={() => onCancelTag(tag.id)}
							>
								#{tag.value}
								<GiCancel className="ml-1" />
							</Button>
						))}
					</div>
					<Input
						placeholder="Use whitespace or enter to separate #tags"
						className="mt-6 h-12 w-full text-base placeholder:font-light placeholder:text-gray-400"
						onKeyDown={(e) => onTagInputKeyDown(e, uuid())}
						onChange={onTagInput}
						value={formInput.tags || ""}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-2 mt-6 font-semibold">Photos</div>
					{["1", "2", "3", "4", "5", "6"].map((id) => (
						<ImageUploadCard key={id} id={id} formInput={formInput} dispatchFormInput={true} />
					))}
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Button className="justify-content bottom-0 mt-10 flex items-center bg-sky-900" asChild>
						<Link href="/sell/mobile/stageSecond">PREVIOUS</Link>
					</Button>
					<Button
						className="justify-content bottom-0 mt-10 flex items-center bg-sky-900"
						type="submit"
						onClick={onSubmit}
					>
						SUBMIT
					</Button>
				</div>
			</main>
		</Fragment>
	);
}
