import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
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
								<Link href="/designers/data" className="mx-5 my-2 w-fit hover:font-semibold">
									Kiko Kosdadinov
								</Link>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="font-light md:text-lg">
							MENSWEAR
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex h-96 w-screen items-center px-9 py-7">
							<div className="mx-auto my-0 flex h-5/6 w-10/12 flex-col flex-wrap text-lg">
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="font-light md:text-lg">
							WOMENSWEAR
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex h-96 w-screen items-center px-9 py-7">
							<div className="mx-auto my-0 flex h-5/6 w-10/12 flex-col flex-wrap text-lg">
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
								<div className="mx-5 my-2 w-fit">Kiko Kosdadinov</div>
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
