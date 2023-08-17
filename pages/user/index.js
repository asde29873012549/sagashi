/*eslint-disable*/
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import MyItem from "../../components/User/Sheets/MyItemSheet";
import ContactUs from "../../components/User/Sheets/ContactUsForm";

import ProfileInfo from "../../components/User/ProfileInfo";
import AddressInfo from "../../components/User/AddressInfo";
import LanguageInfo from "../../components/User/LanguageInfo";
import CountryInfo from "../../components/User/CountryInfo";
import About from "../../components/User/About";
import SheetWrapper from "@/components/User/Sheets/SheetWrapper";

import { useState } from "react";

export default function User() {
  const [displayFeature, setDisplayFeature] = useState(<ProfileInfo />);
  const [feature, setFeature] = useState("My Profile");

  const onProfileClick = () => {
    setDisplayFeature(<ProfileInfo />);
    setFeature("My Profile");
  };

  const onMyItemsClick = () => {
    setDisplayFeature(<MyItem />);
    setFeature("My Items");
  };

  const onMyAddressClick = () => {
    setDisplayFeature(<AddressInfo />);
    setFeature("My Address");
  };

  const onMyLanguageClick = () => {
    setDisplayFeature(<LanguageInfo />);
    setFeature("My Language");
  };

  const onMyCountryClick = () => {
    setDisplayFeature(<CountryInfo />);
    setFeature("My Country");
  };

  const onContactUsClick = () => {
    setDisplayFeature(<ContactUs rows="10" />);
    setFeature("Contact Us");
  };

  const onAboutClick = () => {
    setDisplayFeature(<About />);
  };

  return (
    <div className="w-screen px-20 py-5">
      <header className="flex pb-8 justify-between">
        <div className="flex items-center space-x-4 ">
          <Avatar className="w-40 h-40 mr-8 text-base">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-xl font-semibold">Noah</div>
          <div className="h-14 ">
            <Separator orientation="vertical" />
          </div>
          <div>0 Transactions</div>
          <div className="h-14">
            <Separator orientation="vertical" />
          </div>
          <div>0 Followers</div>
        </div>

        <SheetWrapper
          trigger={<div className="text-base underline">Change Password</div>}
          feature="Change Password"
          sheet="ChangePassword"
          side="right"
          className="w-5/12"
        />
      </header>
      <Separator />
      <div className="flex  mt-5">
        <div className="w-1/5  space-y-1 flex flex-col items-start">
          <Button
            variant="link"
            onClick={onProfileClick}
            className="group flex flex-col w-fit"
          >
            <p>Profile</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            variant="link"
            onClick={onMyItemsClick}
            className="group flex flex-col w-fit"
          >
            <p>My Items</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            variant="link"
            onClick={onMyAddressClick}
            className="group flex flex-col w-fit"
          >
            <p>Shipping Address</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            variant="link"
            onClick={onMyLanguageClick}
            className="group flex flex-col w-fit"
          >
            <p>Language</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            variant="link"
            onClick={onMyCountryClick}
            className="group flex flex-col w-fit"
          >
            <p>Country / Region</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            variant="link"
            onClick={onContactUsClick}
            className="group flex flex-col w-fit"
          >
            <p>Contact Us</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            variant="link"
            onClick={onAboutClick}
            className="group flex flex-col w-fit"
          >
            <p>About</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            variant="link"
            onClick={onAboutClick}
            className="group flex flex-col w-fit"
          >
            <p>Terms & Conditions</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            variant="link"
            onClick={onAboutClick}
            className="group flex flex-col w-fit"
          >
            <p>Privacy Policy</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
        </div>
        <div className="w-4/5 flex flex-col space-y-4">
          <div className="text-2xl font-bold tracking-wider">{feature}</div>
          <div>
            <div>{displayFeature}</div>
            {feature !== "My Items" && feature !== "Contact Us" && (
              <SheetWrapper
                trigger={
                  <div className="w-36 mt-10 h-10 bg-sky-900 hover:bg-sky-950 rounded-md flex items-center justify-center text-background">
                    Edit
                  </div>
                }
                feature={feature}
                sheet={feature.split(" ").join("")}
                side="right"
                className="w-5/12"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
