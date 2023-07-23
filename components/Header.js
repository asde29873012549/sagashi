import { Input as SearchInput } from "./ui/input";
import Image from "next/image";
import { Fragment } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import MenuBar from "./MenuBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {toggleRegisterForm} from '../redux/userSlice'
import {useDispatch} from 'react-redux'

export default function Header() {
  const dispatch = useDispatch()

  const onToggleRegisterForm = () => dispatch(toggleRegisterForm())

  return (
    <Fragment>
      <div className="relative flex h-1/4 w-full items-center justify-center md:px-9 md:justify-between md:py-6 sm:px-6 sm:py-4 px-3 py-2">
        <MenuBar />
		<Image
          src="/cactusLogo.png"
          alt="logo"
          width="500"
          height="250"
          className="hover:cursor-pointer w-40 h-auto md:w-60"
        />
        <div className="hidden md:flex md:w-1/2 md:h-12 md:justify-end md:items-center md:px-14">
          <SearchInput
            placeholder="Search"
            className="w-full h-10"
          ></SearchInput>
          <MagnifyingGlassIcon className="absolute w-6 h-6" />
        </div>
        <div className="fixed z-8 bg-background bottom-0 w-full flex justify-around items-center px-5 py-3 md:relative md:w-1/4 md:flex md:justify-end md:text-md">
          <div className="w-full flex justify-between">
            <div className="hover:cursor-pointer inline-block" onClick={onToggleRegisterForm}>LOGIN</div>
            <div className="md:hidden inline-block hover:cursor-pointer">
              SEARCH
            </div>
            <div className=" inline-block hover:cursor-pointer">SELL</div>
            <div className=" inline-block hover:cursor-pointerk">SHOP</div>
            <ShoppingCartIcon className="w-6 h-6 hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
