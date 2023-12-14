import { Fragment } from "react";
// import Header from "./Header";
// import MobileHeader from "./MobileHeader";
import NavBar from "./NavBar";
import RegisterForm from "./RegisterForm";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/components/Loading";

import dynamic from "next/dynamic";

const Header = dynamic(import("./Header"), { ssr: false });
const MobileHeader = dynamic(import("./MobileHeader"), { ssr: false });

export default function Layout({ children }) {
	const isUsingMobile = () => {
		if (typeof window !== "undefined") return window.innerWidth < 768; //&& navigator.maxTouchPoints > 0;
	};

	return (
		<Fragment>
			<RegisterForm />
			{isUsingMobile() ? <MobileHeader /> : <Header />}
			<NavBar />
			<main>{children}</main>
			<Footer />
			<Toaster />
			<Loading />
		</Fragment>
	);
}

//
