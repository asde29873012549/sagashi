import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Fragment } from "react";
import BlackCanvas from "./ui/blackCanvas";
import { Button } from "@/components/ui/button";

export default function PhotoCrop({ imgSrc, onImageLoad, crop, setCrop, imageCropComplete, imageInputRef, onFinishCrop }) {

  return (
    <Fragment>
      {imgSrc && (
        <Fragment>
          <div className="fixed flex-col inset-0 flex justify-center items-center z-[30]">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
			  onComplete={imageCropComplete}
              aspect={4 / 5}
            >
              <img
                ref={imageInputRef}
                alt="Crop me"
                src={imgSrc}
                onLoad={onImageLoad}
                className="h-[70vh]"
              />
            </ReactCrop>
			<Button className="mt-10 hover:bg-destructive" onClick={onFinishCrop}>CROP</Button>
          </div>
          <BlackCanvas />
        </Fragment>
      )}
    </Fragment>
  );
}