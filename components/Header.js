import {Input as SearchInput} from './ui/input'
import Image from 'next/image'
import {Fragment} from 'react'
import {ShoppingCartIcon} from '@heroicons/react/24/outline'


export default function Header() {
	return (
		<Fragment>
			<div className="flex h-1/4 w-full items-center justify-center md:px-9 md:justify-between md:py-6 sm:px-6 sm:py-4 px-3 py-2">
				<div className="md:w-1/4 md:h-12 text-2xl inline-block md:text-5xl sm:text-3xl hover:cursor-pointer font-normal">CACTUS</div>
				<div className="hidden md:flex md:w-1/2 md:h-12 md:justify-end md:items-center md:px-14">
					<SearchInput placeholder="Search" className="w-full h-10"></SearchInput>
				</div>
				<div className="fixed bottom-0 w-full flex justify-around items-center px-5 py-3 md:relative md:w-1/4 md:flex md:justify-end md:text-md">
					<div className="w-full flex justify-between">
						<div className="hover:cursor-pointer inline-block">LOGIN</div>
						<div className="md:hidden inline-block hover:cursor-pointer">SEARCH</div>
						<div className=" inline-block hover:cursor-pointer">SELL</div>
						<div className=" inline-block hover:cursor-pointerk">SHOP</div>
						<ShoppingCartIcon  className="w-6 h-6 hover:cursor-pointer"/>
					</div>
				</div>
			</div>
		</Fragment>
	)
}