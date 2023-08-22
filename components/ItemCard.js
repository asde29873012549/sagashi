import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ItemCard({ src, children, postTime }) {
	return (
		<Alert>
			<AlertDescription className="flex items-center justify-between">
				<div className="flex items-center">
					<Avatar className="h-10 w-10">
						<AvatarImage src={src} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="ml-1 w-4/5 truncate px-2">{children}</div>
				</div>
				<div className="shrink-0 text-xs text-info">{postTime}</div>
			</AlertDescription>
		</Alert>
	);
}
