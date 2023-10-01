import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function DesignerCard({ src, className, name, designer_id }) {
	const [isFollow, setIsFollow] = useState(false);
	const router = useRouter();

	const onFollow = (e) => {
		e.preventDefault();
		setIsFollow((f) => !f);
	};
	return (
		<div
			className={`flex h-fit flex-col justify-center rounded-md border pb-4 drop-shadow-lg ${className}`}
		>
			<Link href={`/shop/${designer_id}`}>
				<div className="relative aspect-[4/5] w-full rounded-md ">
					<Image src={src} fill={true} alt="pic" />
				</div>
			</Link>
			<div className="flex flex-col items-center justify-center">
				<Link href={`/shop/${designer_id}`}>
					<div className="mb-1 mt-2 text-xl font-bold text-foreground">{name}</div>
				</Link>
			</div>
			<span className="m-auto mb-2 text-sm underline">1.3k listings</span>
			<Button
				onClick={onFollow}
				variant={isFollow ? "outline" : "default"}
				className="m-auto w-1/2"
			>
				{isFollow ? "Following" : "Follow"}
			</Button>
		</div>
	);
}
