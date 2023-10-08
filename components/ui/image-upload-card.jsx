import { BsCameraFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import PhotoCrop from "@/components/PhotoCrop";
import { Fragment, useState, useRef } from "react";
import { mobileFormInput } from "@/redux/sellSlice";
import { useDispatch } from "react-redux";

const cropAspet = 4 / 5;
const NEXT_PUBLIC_SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

export default function ImageUploadCard({ id, formInput, setFormInput, dispatchFormInput }) {
	const [imgSrc, setImgSrc] = useState();
	const [crop, setCrop] = useState();
	const [bufferImage, setBufferImage] = useState();
	const [croppedBackground, setCroppedBackground] = useState("");
	const imageCardRef = useRef();
	const cameraIconRef = useRef();
	const cancelIconRef = useRef();
	const dispatch = useDispatch();

	const onSelectFile = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			const bufferReader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			bufferReader.readAsArrayBuffer(e.target.files[0]);
			reader.addEventListener("load", () =>
				setImgSrc(reader.result ? reader.result.toString() : ""),
			);
			bufferReader.addEventListener("load", () =>
				setBufferImage(bufferReader.result ? bufferReader.result : ""),
			);
		}
	};

	const onFinishCrop = async () => {
		const imageCardNode = imageCardRef.current;
		const cameraIconNode = cameraIconRef.current;
		const cancelIconNode = cancelIconRef.current;

		const formData = new FormData();
		formData.append("originalImage", new Blob([bufferImage]));
		formData.append(
			"cropInfo",
			JSON.stringify({
				cropInfo: {
					left: crop.x,
					top: crop.y,
					width: crop.width,
					height: crop.height,
				},
			}),
		);

		const response = await fetch(`${NEXT_PUBLIC_SERVER_DOMAIN}/api/cropImage`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			const error = await response.json();
			console.log(error);
		} else {
			const data = await response.blob();
			const imageURL = URL.createObjectURL(data);
			setCroppedBackground(imageURL);
			if (dispatchFormInput) {
				dispatch(mobileFormInput({ key: "photos", value: { ...formInput.photos, [id]: data } }));
			} else {
				setFormInput({ ...formInput, photos: { ...formInput.photos, [id]: data } });
			}

			imageCardNode.style.backgroundImage = `url(${imageURL})`;
			imageCardNode.style.backgroundSize = "contain";
			cameraIconNode.style.display = "none";
			cancelIconNode.style.display = "block";
		}
		setImgSrc(null);
		setCrop(undefined);
	};

	const onCancelCrop = () => {
		croppedBackground && URL.revokeObjectURL(croppedBackground);
		setImgSrc(null);
		setCrop(undefined);
	};

	const onCancelIconClick = () => {
		const imageCardNode = imageCardRef.current;
		const cameraIconNode = cameraIconRef.current;
		const cancelIconNode = cancelIconRef.current;

		imageCardNode.style.backgroundImage = "";
		cancelIconNode.style.display = "none";
		cameraIconNode.style.display = "inline-block";
		const { [id]: _, ...restImages } = formInput.photos;
		if (dispatchFormInput) {
			dispatch(mobileFormInput({ key: "photos", value: restImages }));
		} else {
			setFormInput((prev) => ({ ...prev, photos: restImages }));
		}

		setImgSrc(null);
	};

	return (
		<Fragment>
			<PhotoCrop
				imgSrc={imgSrc}
				setCrop={setCrop}
				crop={crop}
				onFinishCrop={onFinishCrop}
				onCancelCrop={onCancelCrop}
				cropAspet={cropAspet}
			/>
			<div className="relative">
				<div
					ref={cancelIconRef}
					onClick={() => onCancelIconClick()}
					className="absolute right-2 top-2 z-1 hidden"
				>
					<MdCancel className="h-6 w-6 fill-foreground hover:cursor-pointer hover:fill-destructive " />
				</div>
				<label
					ref={imageCardRef}
					className={
						"relative flex aspect-[4/5] items-center justify-center rounded-md bg-gray-100 transition-transform duration-700 hover:scale-105 hover:cursor-pointer"
					}
				>
					<div ref={cameraIconRef}>
						<BsCameraFill className="h-6 w-6" />
					</div>
					<input
						type="file"
						accept="image/png, image/jpg, image/jpeg, image/webp"
						className="hidden"
						multiple={false}
						onChange={onSelectFile}
					/>
				</label>
			</div>
		</Fragment>
	);
}
