//ui
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dot } from "lucide-react";

//libs
import getFeaturedDesigners from "@/lib/queries/fetchQuery";
import getAllCategories from "@/lib/queries/fetchQuery";
import { genericError } from "@/lib/userMessage";

//frameworks
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function NavBar() {
	const designersQuery = useQuery({
		queryKey: ["featuredDesingers"],
		queryFn: () => getFeaturedDesigners({ uri: "/designer/featured" }),
	});

	const {data: categoryQuery, isError: categoryError, isLoading: categoryLoading } = useQuery({
		queryKey: ["category"],
		queryFn: () => getAllCategories({ uri: "/category" }),
	});



	return (
		<NavigationMenu>
			<div className="hidden md:block md:w-full md:py-2">
				<NavigationMenuList className="md:flex md:w-full md:justify-around">
					<NavigationMenuItem>
						<NavigationMenuTrigger className="font-light md:text-lg">
							DESIGNERS
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex h-96 w-screen items-center px-9 py-7">
							<Button variant="ghost hover:bg-white" className="text-lg font-bold md:w-60" asChild>
								<Link href="/designers" className="hover:underline">
									Designers A-Z
								</Link>
							</Button>
							<div className="mx-auto my-0 flex h-5/6 w-10/12 flex-col flex-wrap text-lg">
								{designersQuery.isError && <span className="m-auto">{genericError}</span>}
								{designersQuery.isLoading
									? Array(25)
											.fill(1)
											.map((id, index) => (
												<Skeleton key={`${index}-${id}`} className="mx-5 my-2 h-8 w-44" />
											))
									: designersQuery.data?.data.map((obj) => (
											<Link
												key={obj.designer_id}
												href={`/designers/${obj.designer_id}`}
												className="group mx-5 my-2 flex w-60 items-center text-gray-600 hover:font-medium"
											>
												<span>{obj.Designer.name}</span>
												<span className="hidden group-hover:block group-hover:text-cyan-700">
													<Dot />
												</span>
											</Link>
									  ))}
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="font-light md:text-lg">
							MENSWEAR
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex h-96 w-screen items-center px-9 py-7">
							<div className="mx-auto my-0 flex h-full w-11/12 flex-col flex-wrap text-lg">
								{categoryError && <span className="m-auto">{genericError}</span>}
								{categoryLoading
									? Array(30)
											.fill(1)
											.map((id, index) => (
												<Skeleton key={`${index}-${id}`} className="mx-5 my-2 h-8 w-48" />
											))
									: Object.keys(categoryQuery.data.Menswear).map((cat, index) => (
											<div className="flex flex-col" key={`${index}-${cat}`}>
												<div className="my-2 w-56 font-semibold">{cat}</div>
												<div className="flex flex-col">
													{categoryQuery.data.Menswear[cat].sub.map((subCat, index) => (
														<div
															className="group my-1 flex text-base hover:cursor-pointer"
															key={`${index}-${subCat}`}
														>
															<span>{subCat}</span>
															<span className="hidden group-hover:block group-hover:text-cyan-700">
																<Dot />
															</span>
														</div>
													))}
												</div>
											</div>
									  ))}
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="font-light md:text-lg">
							WOMENSWEAR
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex h-96 w-screen items-center px-9 py-7">
							<div className="mx-auto my-0 flex h-full w-11/12 flex-col flex-wrap text-lg">
								{categoryError && <span className="m-auto">{genericError}</span>}
								{categoryLoading
									? Array(30)
											.fill(1)
											.map((id, index) => (
												<Skeleton key={`${index}-${id}`} className="mx-5 my-2 h-8 w-48" />
											))
									: Object.keys(categoryQuery.data.Womenswear).map((cat, index) => (
											<div className="flex flex-col" key={`${index}-${cat}`}>
												<div className="my-2 w-56 font-semibold">{cat}</div>
												<div className="flex flex-col">
													{categoryQuery.data.Womenswear[cat].sub.map((subCat, index) => (
														<div
															className="group my-1 flex text-base hover:cursor-pointer"
															key={`${index}-${subCat}`}
														>
															<span>{subCat}</span>
															<span className="hidden group-hover:block group-hover:text-cyan-700">
																<Dot />
															</span>
														</div>
													))}
												</div>
											</div>
									  ))}
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink className="font-light md:text-lg">STAFF PICKS</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink className="font-light md:text-lg">ARTICLES</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</div>
		</NavigationMenu>
	);
}
