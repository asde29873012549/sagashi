import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { MapPin } from "lucide-react";
import { useRouter } from "next/router";

import { dehydrate, QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import getUser from "@/lib/queries/fetchQuery";
import { getDateDistance } from "@/lib/utils";
import Shop from "@/pages/shop/index";
import getTree from "@/lib/queries/fetchQuery";
import followUser from "@/lib/queries/fetchQuery";
import createNotification from "@/lib/queries/fetchQuery";
import getIsFollow from "@/lib/queries/fetchQuery";
import { getToken } from "next-auth/jwt";
import { activate } from "@/redux/loadingSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { genericError } from "@/lib/userMessage";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

export default function PublicUserProfile({ user, avatar }) {
	const dispatch = useDispatch();
	const router = useRouter();
	const username = router.query.username;
	const { toast } = useToast();

	const { data: isFollowData } = useQuery({
		queryKey: ["isFollow", username],
		queryFn: () =>
			getIsFollow({ uri: "/user/follow/check", method: "POST", body: { user: username } }),
		refetchOnWindowFocus: false,
	});

	const [isFollow, setIsFollow] = useState(isFollowData?.data ? true : false);

	const { data: publicUserData } = useQuery({
		queryKey: ["userPublic", username],
		queryFn: () => getUser({ uri: `/user/public/${username}/info` }),
		refetchOnWindowFocus: false,
	});

	const { data: OriginTreeData } = useQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree" }),
		refetchOnWindowFocus: false,
	});

	const { mutateAsync: followMutate } = useMutation({
		mutationFn: (follow) => followUser({ uri: "/user/follow", method: "POST", body: follow }),
		onError: (error) => {
			dispatch(activate());
			setIsFollow((prev) => !prev);
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	const onFollow = async () => {
		await followMutate({ follow_user: username, user_image: avatar });
		setIsFollow((prev) => !prev);
	};

	return (
		<div className="w-screen px-20 py-5">
			<header className="flex items-center justify-between pb-8">
				<div className="flex items-center space-x-4 ">
					<Avatar className="mr-8 h-28 w-28 text-base">
						<AvatarImage src={publicUserData?.data.avatar} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="text-xl font-semibold">
						<div>{username}</div>
						<div className="mt-2 text-sm font-normal text-gray-600">
							Joined {publicUserData ? getDateDistance(publicUserData.data.created_at) : ""}
						</div>
						<div className="flex items-center space-x-1 text-sm font-normal text-gray-400">
							<MapPin size={16} />
							<span>
								{publicUserData?.data.country ? publicUserData?.data.country : "Unspecified"}
							</span>
						</div>
					</div>
					<div className="h-14 ">
						<Separator orientation="vertical" />
					</div>
					<div>0 Transactions</div>
					<div className="h-14">
						<Separator orientation="vertical" />
					</div>
					<div>{publicUserData?.data.follower_count ?? 0} Followers</div>
				</div>

				{user !== username && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className={
										isFollow
											? "border-2 border-sky-900 bg-background text-sky-900 hover:bg-gray-100"
											: "bg-sky-900 hover:bg-sky-950"
									}
									onClick={onFollow}
								>
									{isFollow ? "Following" : "Follow"}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Get first-hand notification on the user&rsquo;s new listing!</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</header>
			<Separator />
			<Shop isUserListing={true} treeData={OriginTreeData?.data} user={username} />
		</div>
	);
}

export async function getServerSideProps({ req, query }) {
	const username = query.username;
	const queryClient = new QueryClient();
	const token = await getToken({ req, secret: JWT_TOKEN_SECRET });

	await queryClient.prefetchQuery({
		queryKey: ["userPublic", username],
		queryFn: () => getUser({ uri: `/user/public/${username}/info`, server: true }),
	});

	await queryClient.prefetchQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree", server: true }),
	});

	await queryClient.prefetchQuery({
		queryKey: ["isFollow", username],
		queryFn: () =>
			getIsFollow({
				uri: "/user/follow/check",
				method: "POST",
				body: { user: username },
				server: true,
				token: token?.accessToken,
			}),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			user: token?.username ?? null,
			avatar: token?.avatar ?? null,
		},
		//revalidate: 60 * 10,
	};
}
