import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getDateDistance } from "@/lib/utils";

import Link from "next/link";

export default function ItemCard({ src, children, timing, link, setIsOpen }) {
	return link ? (
		<Link href={link} onClick={setIsOpen}>
			<Alert>
				<AlertDescription className="flex w-[400px] cursor-pointer items-center rounded-md p-4 hover:bg-slate-100">
					<>
						<div className="mr-2 flex shrink-0 items-center">
							<Avatar className="h-10 w-10">
								<AvatarImage src={src} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</div>
						<div>
							<p className="ml-1 line-clamp-2 w-full whitespace-break-spaces px-2">{children}</p>
							<div className="ml-1 shrink-0 px-2 text-xs text-info">{getDateDistance(timing)}</div>
						</div>
					</>
				</AlertDescription>
			</Alert>
		</Link>
	) : (
		<Alert>
			<AlertDescription className="flex w-[400px] cursor-pointer items-center rounded-md p-4 hover:bg-slate-100">
				<>
					<div className="mr-2 flex shrink-0 items-center">
						<Avatar className="h-10 w-10">
							<AvatarImage src={src} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
					<div>
						<p className="ml-1 line-clamp-2 w-full whitespace-break-spaces px-2">{children}</p>
						<div className="ml-1 shrink-0 px-2 text-xs text-info">{getDateDistance(timing)}</div>
					</div>
				</>
			</AlertDescription>
		</Alert>
	);
}
