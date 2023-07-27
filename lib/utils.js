import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { centerCrop, makeAspectCrop } from "react-image-crop";
import { useEffect } from 'react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fn();
    }, waitTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, deps);
}

export function getCroppedImage(image, crop, fileName, croppedImageUrlRef) {
    const imageCanvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    imageCanvas.width = crop.width;
    imageCanvas.height = crop.height;
    const imgCx = imageCanvas.getContext("2d");
	console.log(image.naturalWidth , image.width, image.naturalHeight , image.height, scaleX, scaleY, crop.x, crop.y, crop.width, crop.height)
    imgCx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      imageCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("the image canvas is empty"));
          return;
        }
        blob.name = fileName;
		if (croppedImageUrlRef.current) {
			URL.revokeObjectURL(croppedImageUrlRef.current);
		}
        resolve(URL.createObjectURL(blob));
      });
    });
  }
