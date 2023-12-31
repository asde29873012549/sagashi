import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Fragment } from "react";
import BlackCanvas from "./ui/blackCanvas";
import { Button } from "@/components/ui/button";
import { centerAspectCrop } from "../lib/utils";

export default function PhotoCrop({
	imgSrc,
	setCrop,
	crop,
	onFinishCrop,
	onCancelCrop,
	cropAspet,
	noBackDrop,
}) {
	const onImageLoad = (e) => {
		const { width, height } = e.currentTarget;
		setCrop(centerAspectCrop(width, height, cropAspet));
	};

	return (
		<Fragment>
			{imgSrc && (
				<Fragment>
					<div className="fixed inset-0 z-[30] flex flex-col items-center justify-center">
						<ReactCrop
							crop={crop}
							onChange={(_, percentCrop) => setCrop(percentCrop)}
							aspect={cropAspet}
						>
							<img alt="Crop me" src={imgSrc} onLoad={onImageLoad} className="h-[70vh] w-auto" />
						</ReactCrop>
						<div>
							<Button className="mt-10 hover:bg-slate-600" onClick={onFinishCrop}>
								CROP
							</Button>
							<Button className="ml-5 bg-destructive hover:bg-slate-600" onClick={onCancelCrop}>
								CANCEL
							</Button>
						</div>
					</div>
					{!noBackDrop && <BlackCanvas />}
				</Fragment>
			)}
		</Fragment>
	);
}
