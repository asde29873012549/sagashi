import * as dotenv from "dotenv";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { centerCrop, makeAspectCrop } from "react-image-crop";
import { useEffect } from "react";
import { LuShirt, LuWallet } from "react-icons/lu";
import { PiPants, PiShirtFoldedBold, PiDress, PiHandbagSimpleBold } from "react-icons/pi";
import { TbJacket, TbShoe } from "react-icons/tb";

dotenv.config();

const backend_server = process.env.BACKEND_SERVER;

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
	console.log(
		image.naturalWidth,
		image.width,
		image.naturalHeight,
		image.height,
		scaleX,
		scaleY,
		crop.x,
		crop.y,
		crop.width,
		crop.height,
	);
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

export async function refreshAccessToken(token) {
	const response = await fetch(`${backend_server}/user/refreshToken`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ token }),
	});

	const res = await response.json();
	const newToken = res.data;

	return newToken;
}

export function generateCategoryIcon(category) {
	let icon = null;

	switch (category) {
		case "Tops":
			icon = <LuShirt className="pointer-events-none" />;
			break;
		case "Bottoms":
			icon = <PiPants className="pointer-events-none" />;
			break;
		case "Outerwear":
			icon = <TbJacket className="pointer-events-none" />;
			break;
		case "Footwear":
			icon = <TbShoe className="pointer-events-none" />;
			break;
		case "Tailoring":
			icon = <PiShirtFoldedBold className="pointer-events-none" />;
			break;
		case "Accessories":
			icon = <LuWallet className="pointer-events-none" />;
			break;
		case "Dresses":
			icon = <PiDress className="pointer-events-none" />;
			break;
		case "Bags & Lugguage":
			icon = <PiHandbagSimpleBold className="pointer-events-none" />;
			break;
	}

	return icon;
}

export default function debounce(fn, duration) {
	let timer = null;
	return function () {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn();
		}, duration);
	};
}
