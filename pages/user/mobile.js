import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MyItemSheet from "../../components/Sheets/MyItemSheet";
import EditProfileSheet from "../../components/Sheets/EditProfileSheet";
import EditAddressSheet from "../../components/Sheets/EditAddressSheet";
import EditLanguageSheet from "../../components/Sheets/EditLanguageSheet";
import EditCountrySheet from "../../components/Sheets/EditCountrySheet";
import ContactUsForm from "../../components/Sheets/ContactUsForm";
import ChangePasswordSheet from "../../components/Sheets/ChangePasswordSheet";

export default function User() {
  return (
    <div className="w-screen h-full px-3">
      <div className="py-4 text-2xl font-bold">Account</div>
      <Alert>
        <div className="flex justify-between items-center">
          <AlertDescription className="flex items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <AlertTitle className="font-semibold">Noah Hung</AlertTitle>
              <div>0 reviews</div>
            </div>
          </AlertDescription>
          <ChangePasswordSheet />
        </div>
      </Alert>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>My Items</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center">
              <MyItemSheet />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>My Profile</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center w-4/5">
                <div className="w-2/5 ">
                  <div>NAME</div>
                  <div>EMAIL</div>
                  <div>DATE OF BIRTH</div>
                  <div>GENDER</div>
                </div>
                <div className="w-3/5 text-info">
                  <div>Noah</div>
                  <div className="truncate">12345@gmail.com</div>
                  <div>1997/05/31</div>
                  <div>MALE</div>
                </div>
              </div>
              <EditProfileSheet />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Shipping Address</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap w-10/12">
                18 Saxon Lane Wausau, WI 54401 18 Saxon Lane Wausau, WI 54401 18
                Saxon Lane Wausau, WI 54401
              </div>
              <EditAddressSheet />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Language</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center">
              <div>Traditional Chinese</div>
              <EditLanguageSheet />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Country/Region</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center">
              <div>Taiwan</div>
              <EditCountrySheet />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Contact Us</AccordionTrigger>
          <AccordionContent>
            <ContactUsForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>About</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap w-full">
              CACTUS is the one-stop destination for selling and buying. Makeing
              money from your closet
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
