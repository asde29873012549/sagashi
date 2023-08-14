import Logo from "./Logo";
import Link from "next/link";
import { Fragment } from "react";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import MessageIcon from "./MessageIcon";
import { LuMessageCircle } from "react-icons/lu";
import MenuBar from "./MenuBar";
import { LuSearch } from "react-icons/lu";
import Search from "./Search";
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
        className="relative top-0 z-[19] bg-background flex h-14 shadow-md md:shadow-none md:h-20 w-full items-center justify-between md:px-9 md:justify-between md:py-2 sm:px-6 sm:py-4 px-3 py-2"
        style={{ position: "sticky" }}
      >
        <MenuBar />
        <div className="md:w-1/6 md:flex md:justify-between">
          <Link
            className="hidden md:inline-block hover:cursor-pointer md:mr-2"
            href="/sell"
          >
            SELL
          </Link>
          <Link
            className="hidden md:inline-block hover:cursor-pointer"
            href="/shop"
          >
            SHOP
          </Link>
          <div
            className="hover:cursor-pointer md:inline-block hidden"
            onClick={onToggleRegisterForm}
          >
            LOGIN
          </div>
        </div>
        <Logo />
        <MessageIcon />

        <div className="fixed right-0 z-8 bg-background bottom-0 w-full flex justify-around items-center px-5 py-3 md:relative md:w-1/6 md:flex md:justify-end md:text-md">
          <div className="w-full flex justify-between items-center">
            <div className="hidden md:inline-block" style={{ height: "28px" }}>
              <Search>
                <LuSearch className="w-7 h-7 mx-1 md:flex " />
              </Search>
            </div>

            <Link
              className="inline-block hover:cursor-pointer md:hidden"
              href="/sell/mobile/stageFirst"
            >
              SELL
            </Link>
            <Link
              className="inline-block md:hidden hover:cursor-pointer"
              href="/shop"
            >
              SHOP
            </Link>
            <div
              className="hover:cursor-pointer inline-block md:hidden"
              onClick={onToggleRegisterForm}
            >
              LOGIN
            </div>
            <div
              className="md:hidden inline-block hover:cursor-pointer"
              style={{ height: "28px" }}
            >
              <Search>
                <LuSearch className="w-7 h-7 mx-1 md:flex " />
              </Search>
            </div>
            <Popover>
              <PopoverTrigger className="hidden md:inline-block">
                <div className="md:flex hidden md:relative ">
                  <LuMessageCircle className="w-7 h-7" />
                  <div className="rounded-full w-2.5 h-2.5 bg-red-700 absolute right-[1px] mb-3 z-50"></div>
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
            <Link href="/shoppingBag">
              <LuShoppingCart className="w-7 h-7 hover:cursor-pointer" />
            </Link>
            <Link
              className="hidden md:inline-block hover:cursor-pointer"
              href="/user"
            >
              <LuUser className="w-7 h-7" />
            </Link>
            <Link
              className="inline-block hover:cursor-pointer md:hidden"
              href="/user/mobile"
            >
              <LuUser className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
