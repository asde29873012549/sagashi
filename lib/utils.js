import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { centerCrop, makeAspectCrop } from "react-image-crop";

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
