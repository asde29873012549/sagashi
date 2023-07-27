import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Fragment } from "react";
import BlackCanvas from "./ui/blackCanvas";
import { Button } from "@/components/ui/button";

export default function PhotoCrop({
  imgSrc,
  onImageLoad,
  crop,
  setCrop,
  imageInputRef,
  onFinishCrop,
  onCancelCrop,
  setCompletedCrop,
  cropAspet
}) {
  return (
    <Fragment>
      {imgSrc && (
        <Fragment>
          <div className="fixed flex-col inset-0 flex justify-center items-center z-[30]">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={cropAspet}
            >
              <img
                ref={imageInputRef}
                alt="Crop me"
                src={imgSrc}
                onLoad={onImageLoad}
                className="h-[70vh]"
              />
            </ReactCrop>
			<div>
				<Button
				className="mt-10 hover:bg-slate-600"
				onClick={onFinishCrop}
				>
				CROP
				</Button>
				<Button
				className="bg-destructive ml-5 hover:bg-slate-600"
				onClick={onCancelCrop}
				>
				CANCEL
				</Button>
			</div>
          </div>
          <BlackCanvas />
        </Fragment>
      )}
    </Fragment>
  );
}
