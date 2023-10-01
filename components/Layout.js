import { Fragment } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import RegisterForm from "./RegisterForm";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/components/Loading";

export default function Layout({ children }) {
	return (
		<Fragment>
			<RegisterForm />
			<Header />
			<NavBar />
			<main>{children}</main>
			<Footer />
			<Toaster />
			<Loading />
		</Fragment>
	);
}

//
