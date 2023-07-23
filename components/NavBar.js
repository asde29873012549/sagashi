import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
  

export default function NavBar() {
	return (
		<NavigationMenu>
			<div className="hidden md:w-full md:py-2 md:block">
				<NavigationMenuList className="md:w-full md:flex md:justify-around">
					<NavigationMenuItem>
						<NavigationMenuTrigger className="md:text-lg font-light">DESIGNERS</NavigationMenuTrigger>
						<NavigationMenuContent className="flex h-96 items-center py-7 px-9 w-screen">
							<div className="md:w-60 text-lg font-bold">Designers A-Z</div>
							<div className="flex flex-col flex-wrap mx-auto my-0 w-10/12 h-5/6 text-lg">
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="md:text-lg font-light">MENSWEAR</NavigationMenuTrigger>
						<NavigationMenuContent className="flex h-96 items-center py-7 px-9 w-screen">
							<div className="flex flex-col flex-wrap mx-auto my-0 w-10/12 h-5/6 text-lg">
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="md:text-lg font-light">WOMENSWEAR</NavigationMenuTrigger>
						<NavigationMenuContent className="flex h-96 items-center py-7 px-9 w-screen">
							<div className="flex flex-col flex-wrap mx-auto my-0 w-10/12 h-5/6 text-lg">
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
								<div className="w-fit mx-5 my-2">Kiko Kosdadinov</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink className="md:text-lg font-light">STAFF PICKS</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink className="md:text-lg font-light">ARTICLES</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</div>	
		</NavigationMenu>
	)
}
