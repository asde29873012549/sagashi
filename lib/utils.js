import * as dotenv from "dotenv";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { centerCrop, makeAspectCrop } from "react-image-crop";
import { Shirt, Wallet } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

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
			icon = <Shirt className="pointer-events-none" />;
			break;
		case "Bottoms":
			icon = <Pants className="pointer-events-none" />;
			break;
		case "Outerwear":
			icon = <Hoodie className="pointer-events-none" />;
			break;
		case "Footwear":
			icon = <Shoes className="pointer-events-none" />;
			break;
		case "Tailoring":
			icon = <ShirtFolded className="pointer-events-none" />;
			break;
		case "Accessories":
			icon = <Wallet className="pointer-events-none" />;
			break;
		case "Dresses":
			icon = <Dress className="pointer-events-none" />;
			break;
		case "Bags & Lugguage":
			icon = <HandBag className="pointer-events-none" />;
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

export const getDateDistance = (isoDate) => {
	try {
		const date = parseISO(isoDate);
		const distance = formatDistanceToNow(date, { addSuffix: true });

		return distance;
	} catch (err) {
		console.log(err);
		return "Invalid Date";
	}
};

function Shoes() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="#000000"
			viewBox="0 0 256 256"
		>
			<path d="M228.65,129.11l-60.73-20.24a24,24,0,0,1-14.32-13L130.39,41.6s0-.07,0-.1A16,16,0,0,0,110.25,33L34.53,60.49A16.05,16.05,0,0,0,24,75.53V192a16,16,0,0,0,16,16H240a16,16,0,0,0,16-16V167.06A40,40,0,0,0,228.65,129.11ZM115.72,48l7.11,16.63-21.56,7.85A8,8,0,0,0,104,88a7.91,7.91,0,0,0,2.73-.49l22.4-8.14,4.74,11.07-16.6,6A8,8,0,0,0,120,112a7.91,7.91,0,0,0,2.73-.49l17.6-6.4a40.24,40.24,0,0,0,7.68,10l-14.74,5.36A8,8,0,0,0,136,136a8.14,8.14,0,0,0,2.73-.48l28-10.18,56.87,18.95A24,24,0,0,1,238.93,160H40V75.53ZM40,192h0V176H240v16Z"></path>
		</svg>
	);
}

function ShirtFolded() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="#000000"
			viewBox="0 0 256 256"
		>
			<path d="M200,48H179.31L165.66,34.34A8.07,8.07,0,0,0,160.05,32H96a8,8,0,0,0-5.66,2.34L76.69,48H56A16,16,0,0,0,40,64V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V64A16,16,0,0,0,200,48Zm-38.76,4.56L168,59.31V112L138.57,86.56ZM88,59.31l6.76-6.75,22.67,34L88,112ZM120,216H56V64H72v48a15.85,15.85,0,0,0,9.21,14.49A16.1,16.1,0,0,0,88,128a15.89,15.89,0,0,0,10.2-3.73.52.52,0,0,0,.11-.1L120,105.48ZM111,48h34.1L128,73.58ZM200,216H136V105.48l21.65,18.7a.52.52,0,0,0,.11.1A15.89,15.89,0,0,0,168,128a16.1,16.1,0,0,0,6.83-1.54A15.85,15.85,0,0,0,184,112V64h16Z"></path>
		</svg>
	);
}

function Pants() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="#000000"
			viewBox="0 0 256 256"
		>
			<path d="M223.88,214l-22-176A16,16,0,0,0,186,24H70A16,16,0,0,0,54.12,38l-22,176A16,16,0,0,0,48,232H88.69a16,16,0,0,0,15.51-12.06l23.8-92,23.79,91.94A16,16,0,0,0,167.31,232H208a16,16,0,0,0,15.88-18ZM192.9,95.2A32.13,32.13,0,0,1,169,72h21ZM186,40l2,16H68l2-16ZM66,72H87A32.13,32.13,0,0,1,63.1,95.2ZM88.69,216H48L61,111.73A48.08,48.08,0,0,0,103.32,72H120V95Zm78.6-.06L136,95V72h16.68A48.08,48.08,0,0,0,195,111.73L208,216Z"></path>
		</svg>
	);
}

function Dress() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="#000000"
			viewBox="0 0 256 256"
		>
			<path d="M214.7,209.7a1.89,1.89,0,0,0-.11-.25l-45.48-96.86,20.5-32.18a1.74,1.74,0,0,0,.11-.18,16,16,0,0,0,0-16.46c-.09-.16-.2-.32-.3-.47L168,32.7V8a8,8,0,0,0-16,0V32.42L146.74,39a24,24,0,0,1-37.48,0L104,32.42V8A8,8,0,0,0,88,8V32.7L66.58,63.3c-.1.15-.21.31-.3.47a16,16,0,0,0,0,16.46,1.74,1.74,0,0,0,.11.18l20.5,32.18L41.41,209.45a1.89,1.89,0,0,0-.11.25A16,16,0,0,0,56,232H200a16,16,0,0,0,14.71-22.3ZM80,72,96.43,48.57l.33.42a40,40,0,0,0,62.48,0l.33-.42L176,72l-20.38,32H100.39ZM56,216l45.07-96h53.84L200,216Z"></path>
		</svg>
	);
}

function HandBag() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="#000000"
			viewBox="0 0 256 256"
		>
			<path d="M239.89,198.12l-14.26-120a16,16,0,0,0-16-14.12H176a48,48,0,0,0-96,0H46.33a16,16,0,0,0-16,14.12l-14.26,120A16,16,0,0,0,20,210.6a16.13,16.13,0,0,0,12,5.4H223.92A16.13,16.13,0,0,0,236,210.6,16,16,0,0,0,239.89,198.12ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32ZM32,200,46.33,80H80v24a8,8,0,0,0,16,0V80h64v24a8,8,0,0,0,16,0V80h33.75l14.17,120Z"></path>
		</svg>
	);
}

function Hoodie() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="#000000"
			viewBox="0 0 256 256"
		>
			<path d="M238.66,123.56l-56.3-84.44A16,16,0,0,0,169.05,32H87a16,16,0,0,0-13.31,7.12l-56.3,84.44a8,8,0,0,0-1.06,6.54l22.39,82.11A16.05,16.05,0,0,0,54.11,224H80a16,16,0,0,0,16-16V192h64v16a16,16,0,0,0,16,16h25.89a16.05,16.05,0,0,0,15.44-11.79l22.39-82.11A8,8,0,0,0,238.66,123.56ZM80,176V69.79L104,83.5V136a8,8,0,0,0,16,0V92.64L124,95A8,8,0,0,0,132,95l4-2.31V128a8,8,0,0,0,16,0V83.5l24-13.71V176ZM169.05,48l3.54,5.31L128,78.79,83.41,53.31,87,48ZM80,208H54.11L32.68,129.41,64,82.42V176a16,16,0,0,0,16,16Zm121.89,0H176V192a16,16,0,0,0,16-16V82.42l31.32,47Z"></path>
		</svg>
	);
}
