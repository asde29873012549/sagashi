import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Separator } from "./ui/separator";
import { PiHeart, PiHeartFill } from "react-icons/pi";

import { useState } from "react";

export default function ListingCard({ src, className }) {
	const [liked, setLiked] = useState(false);
	const router = useRouter();

	const onLike = () => {
		setLiked((l) => !l);
	};
	return (
		<div className={`h-fit ${className}`}>
			<Link href={`/shop/${router.query.item}`}>
				<div className="relative aspect-[4/5] w-full">
					<Image src={src} fill={true} alt="pic" sizes="(max-width: 768px) 50vw, 33vw" />
				</div>
			</Link>
			<div className="text-sm text-gray-500">8 months</div>
			<Separator />
			<div className="flex items-center justify-between">
				<Link href={`/shop/${router.query.item}`}>
					<div className="truncate text-base font-semibold text-foreground">Long Sleeve Jacket</div>
				</Link>
				<div className="text-sm text-foreground">XL</div>
			</div>
			<div className="truncate text-xs text-foreground">Maison Margiela</div>
			<div className="flex items-center justify-between text-sm text-foreground">
				<div className="before:content-['$']">300</div>
				{liked ? (
					<PiHeartFill onClick={onLike} className="h-5 w-5 fill-red-700 hover:cursor-pointer" />
				) : (
					<PiHeart onClick={onLike} className="h-5 w-5 hover:cursor-pointer" />
				)}
			</div>
		</div>
	);
}
