import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ItemCard({ src, children, postTime }) {
  return (
    <Alert>
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-1 truncate px-2 w-4/5">{children}</div>
        </div>
        <div className="text-info text-xs shrink-0">{postTime}</div>
      </AlertDescription>
    </Alert>
  );
}
