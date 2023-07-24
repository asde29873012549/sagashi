import { Fragment } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import RegisterForm from "./RegisterForm";
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <Fragment>
      <RegisterForm />
      <Header />
      <NavBar />
      <main>{children}</main>
	  <Footer/>
    </Fragment>
  );
}
