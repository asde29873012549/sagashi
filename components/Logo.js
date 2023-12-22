import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }) {
	return (
		<Link href="/" className={`relative aspect-[3/2] hover:cursor-pointer ${className}`}>
			<Image
				src="/sagashi_logo.webp"
				alt="Sagashi_logo"
				fill={true}
				sizes="(max-width: 768px) 35vw, (max-width: 1200px) 15vw, 15vw"
				priority={true}
			/>
		</Link>
	);
}
