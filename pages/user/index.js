import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import MyItem from "../../components/Sheets/MyItemSheet";
import MyProfile from "../../components/Sheets/EditProfileSheet";
import MyAddress from "../../components/Sheets/EditAddressSheet";
import MyLanguage from "../../components/Sheets/EditLanguageSheet";
import MyCountry from "../../components/Sheets/EditCountrySheet";
import ContactUs from "../../components/Sheets/ContactUsForm";
import ChangePassword from "../../components/Sheets/ChangePasswordSheet";

import { useState } from "react";

export default function User() {
  const [displayFeature, setDisplayFeature] = useState(<MyProfile />);
  const [feature, setFeature] = useState("Profile");
  const [isEdit, setIsEdit] = useState(false);

  const onProfileClick = () => {
    setDisplayFeature(<MyProfile />);
    setFeature("Profile");
  };

  const onMyItemsClick = () => {
    setDisplayFeature(<MyItem />);
    setFeature("My Items");
  };

  const onMyAddressClick = () => {
    setDisplayFeature(<MyAddress />);
    setFeature("My Address");
  };

  const onMyLanguageClick = () => {
    setDisplayFeature(<MyLanguage />);
    setFeature("Language");
  };

  const onMyCountryClick = () => {
    setDisplayFeature(<MyCountry />);
    setFeature("Country/Region");
  };

  const onContactUsClick = () => {
    setDisplayFeature(<ContactUs rows="10" />);
    setFeature("Contact Us");
  };

  const onChangePasswordClick = () => {
    setDisplayFeature("ChangePassword");
    setFeature("Change Password");
  };

  const onEdit = () => {
    setIsEdit(true);
  };

  return (
    <div className="w-screen px-20 py-5">
      <header className="flex pb-8 items-center space-x-4">
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
            onClick={onContactUsClick}
            className="group flex flex-col w-fit"
          >
            <p>About</p>
            <hr className="w-0 h-px border-foreground group-hover:w-full transition-all duration-300 ease-in-out" />
          </Button>
        </div>
        <div className="w-4/5 flex flex-col space-y-4">
          <div className="text-2xl font-bold tracking-wider">{feature}</div>
          <div>
            <div>{displayFeature}</div>
            <div className="flex justify-end">
              {feature !== "My Items" && feature !== "Contact Us" && (
                <Button onClick={onEdit} className="w-36 mt-10">
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
