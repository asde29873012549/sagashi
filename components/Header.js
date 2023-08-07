import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import MessageIcon from "./MessageIcon";
import MenuBar from "./MenuBar";
import { LuSearch } from "react-icons/lu";
import SearchWord from "./SearchWord";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { toggleRegisterForm } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

  const onToggleRegisterForm = () => dispatch(toggleRegisterForm());

  return (
    <Fragment>
      <div
        className="top-0 z-[19] bg-background flex h-12 shadow-md md:shadow-none md:h-20 w-full items-center justify-between md:px-9 md:justify-between md:py-6 sm:px-6 sm:py-4 px-3 py-2"
        style={{ position: "sticky" }}
      >
        <MenuBar />
        <div className="md:w-1/6 md:flex md:justify-between">
          <Link
            className="hidden md:inline-block hover:cursor-pointer md:mr-2"
            href="/sell/mobile/stageFirst"
          >
            SELL
          </Link>
          <Link
            className="hidden md:inline-block hover:cursor-pointer"
            href="/shop"
          >
            SHOP
          </Link>
          <div className="hidden md:inline-block">
            <SearchWord>
              <LuSearch className="w-6 h-6 mx-1 md:flex " />
            </SearchWord>
          </div>
        </div>

        <Link
          href="/"
          className="absolute w-40 h-12 md:w-60 md:h-16 m-auto inset-0"
        >
          <Image
            src="/cactusLogo.png"
            alt="logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="hover:cursor-pointer w-40 h-auto md:w-60"
            priority
          />
        </Link>
        <MessageIcon />

        <div className="fixed right-0 z-8 bg-background bottom-0 w-full flex justify-around items-center px-5 py-3 md:relative md:w-1/4 md:flex md:justify-end md:text-md">
          <div className="w-full flex justify-between">
            <div
              className="hover:cursor-pointer inline-block"
              onClick={onToggleRegisterForm}
            >
              LOGIN
            </div>
            <div className="md:hidden inline-block hover:cursor-pointer">
              <SearchWord />
            </div>
            <Link
              className="inline-block hover:cursor-pointer md:hidden"
              href="/sell/mobilepreinfo"
            >
              SELL
            </Link>
            <Link
              className="inline-block md:hidden hover:cursor-pointer"
              href="/shop"
            >
              SHOP
            </Link>
            <Popover>
              <PopoverTrigger>
                <div className="md:flex hidden md:relative ">
                  <div>MESSAGE</div>
                  <div className="w-2 h-2 text-red-700 absolute right-[-3px] top-[-4px] text-[10px] mb-3 z-50">
                    NEW
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="max-h-[80%]">
                <Alert>
                  <AlertDescription className="flex items-center justify-between">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="ml-1 truncate px-2">
                      123345677ssssssssssss86
                    </div>
                    <div className="text-info text-xs shrink-0">3 min</div>
                  </AlertDescription>
                </Alert>
              </PopoverContent>
            </Popover>

            <LuShoppingCart className="w-6 h-6 hover:cursor-pointer" />
            <Link
              className="hidden md:inline-block hover:cursor-pointer"
              href="/user"
            >
              <LuUser className="w-6 h-6" />
            </Link>
            <Link
              className="inline-block hover:cursor-pointer md:hidden"
              href="/user/mobile"
            >
              <LuUser className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
