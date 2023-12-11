import * as dotenv from "dotenv";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DesignerCard from "@/components/DesignerCard";
import Shop from "../shop/index";
import {
	dehydrate,
	QueryClient,
	useQuery,
	useInfiniteQuery,
	useMutation,
} from "@tanstack/react-query";
import getSingleDesigner from "@/lib/queries/fetchQuery";
import getRelatedDesigner from "@/lib/queries/fetchQuery";
import { ChevronLeft, ChevronRight } from "lucide-react";
import getTree from "@/lib/queries/fetchQuery";
import followDesigner from "@/lib/queries/fetchQuery";
import getIsFollowDesigner from "@/lib/queries/fetchQuery";
import { useToast } from "@/components/ui/use-toast";
import { genericError } from "@/lib/userMessage";
import { getToken } from "next-auth/jwt";

import { useRouter } from "next/router";

dotenv.config();

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

export default function SingleDesignerPage() {
	const [designerIntroSecExpand, setDesignerIntroSecExpand] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const { data: OriginTreeData } = useQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree" }),
		refetchOnWindowFocus: false,
	});

	const { data: designerData } = useQuery({
		queryKey: ["designer", { id: router.query.designers }],
		queryFn: ({ queryKey }) => getSingleDesigner({ uri: `/designer/${queryKey[1].id}` }),
		refetchOnWindowFocus: false,
	});

	const { data: isFollowDesigner } = useQuery({
		queryKey: ["designer", "follow", { id: router.query.designers }],
		queryFn: ({ queryKey }) => getIsFollowDesigner({ uri: `/designer/isFollow/${queryKey[2].id}` }),
		refetchOnWindowFocus: false,
		onError: (err) => {
			console.log(err);
		},
	});

	const [isFollow, setIsFollow] = useState(isFollowDesigner?.data ? true : false);

	const createTagsStr = (arr) => {
		if (!arr || arr.length === 0) return "";
		const str = encodeURI(JSON.stringify(arr));
		return `?tags=${str}`;
	};

	const { data: relatedDesignerData } = useQuery({
		queryKey: ["designer", { tags: designerData?.data[0].tags }],
		queryFn: ({ queryKey }) =>
			getRelatedDesigner({ uri: `/designer/relatedDesigners${createTagsStr(queryKey[1].tags)}` }),
		refetchOnWindowFocus: false,
	});

	const { mutateAsync: followMutate } = useMutation({
		mutationFn: () =>
			followDesigner({
				uri: "/designer",
				method: "POST",
				body: {
					designer_id: router.query.designers,
				},
			}),
		onError: () => {
			setIsFollow((prev) => !prev);
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	const onFollowDesigner = () => {
		setIsFollow((prev) => !prev);
		followMutate();
	};

	const onReadmore = (e) => {
		e.preventDefault();
		setDesignerIntroSecExpand((ex) => !ex);
	};

	return (
		<main className="box-border w-full md:px-14 md:py-8">
			<Image
				src="/abstract.webp"
				alt="abstract"
				width={800}
				height={250}
				className="h-52 w-full object-cover"
			/>
			<section
				className={`relative flex w-full flex-col justify-between py-3 md:flex-row md:py-7 ${
					designerIntroSecExpand ? "h-fit" : "h-96 md:h-56"
				}`}
			>
				<div className="h-fit w-full md:h-40 md:w-3/12 md:py-0">
					<div className="relative flex h-full w-full flex-col items-center md:h-fit md:flex-row">
						<Avatar className="inset-0 mx-auto aspect-square w-2/5 -translate-y-1/2 border border-gray-300 md:m-0 md:mr-6 md:w-1/3 md:translate-y-0">
							<AvatarImage src={designerData?.data[0].logo} />
							<AvatarFallback>{designerData?.data[0].name}</AvatarFallback>
						</Avatar>
						<div className="flex -translate-y-full flex-col items-center md:translate-y-0 md:items-start">
							<span className="text-2xl font-bold">{designerData?.data[0].name}</span>
						</div>
					</div>
				</div>
				<div className="relative h-fit w-full px-8 py-4 md:w-6/12 md:px-0">
					<p className={`${designerIntroSecExpand ? "h-fit" : "h-40"} overflow-hidden `}>
						{designerData?.data[0].story}
					</p>
					<Button
						variant="ghost"
						className="absolute bottom-0 z-5 h-fit translate-y-6 p-0 underline hover:bg-transparent focus:bg-transparent active:bg-transparent"
						onClick={onReadmore}
					>
						{designerIntroSecExpand ? "Collapse..." : "Read More..."}
					</Button>
					<div
						className={`${
							designerIntroSecExpand ? "hidden" : "absolute"
						} bottom-0 h-24 w-full bg-gradient-to-t from-white`}
					></div>
				</div>
				<div className="flex w-full translate-y-14 justify-end px-8 md:w-3/12 md:translate-y-0 md:justify-end md:px-0">
					<Button
						variant={isFollow ? "outline" : ""}
						className="h-fit w-24  py-2"
						onClick={onFollowDesigner}
					>
						{isFollow ? "Following" : "Follow"}
					</Button>
				</div>
			</section>

			<section className="relative mt-32 flex h-fit w-full flex-col px-4 md:px-0">
				<h1 className="mb-8 text-base md:text-2xl">Related Designers</h1>
				<section className="no-scrollbar relative flex overflow-scroll">
					{/* Left Arrow */}
					<div className="left-1 top-[50%] z-2 hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white md:absolute md:left-5">
						<ChevronLeft size={30} />
					</div>
					{/* Right Arrow */}
					<div className="right-1 top-[50%] z-2 hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white md:absolute  md:right-5">
						<ChevronRight size={30} />
					</div>
					{relatedDesignerData?.data.map((obj, index) => (
						<DesignerCard
							key={`${obj.name}-${index}`}
							src={obj.logo}
							name={obj.name}
							designer_id={obj.designer_id}
							className="mr-4 w-[65%] shrink-0 md:w-1/5"
						/>
					))}
				</section>
				<section className="mt-16 md:mt-28">
					<Shop designer={designerData?.data[0].name} treeData={OriginTreeData?.data} />
				</section>
			</section>
		</main>
	);
}

export async function getServerSideProps({ req, query }) {
	const designer_id = query.designers;
	const queryClient = new QueryClient();
	const token = await getToken({ req, secret: JWT_TOKEN_SECRET });
	const accessToken = token?.accessToken;

	const fetchTree = async () =>
		await queryClient.prefetchQuery({
			queryKey: ["tree"],
			queryFn: () => getTree({ uri: "/tree", server: true }),
		});

	const fetchDesigner = async () =>
		await queryClient.prefetchQuery({
			queryKey: ["designer", { id: designer_id }],
			queryFn: ({ queryKey }) =>
				getSingleDesigner({ uri: `/designer/${queryKey[1].id}`, server: true }),
		});

	const fetchIsFollowDesigner = async () =>
		await queryClient.prefetchQuery({
			queryKey: ["designer", "follow", { id: designer_id }],
			queryFn: ({ queryKey }) =>
				getIsFollowDesigner({
					uri: `/designer/isFollow/${queryKey[2].id}`,
					server: true,
					token: accessToken,
				}),
		});

	await Promise.allSettled([fetchTree(), fetchDesigner(), fetchIsFollowDesigner()]);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		//revalidate: 60 * 10,
	};
}
