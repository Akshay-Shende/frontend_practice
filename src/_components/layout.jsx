import Header from "./header"
import Footer from "./footer"
import { Suspense } from "react";
import Loading from "@/app/dashboard/loading";

const Layout = ({ children }) => {
  return (
    <>
    <Header />
    <Suspense fallback = {<Loading/>}>
    {children}
    </Suspense>
    <Footer />
    </>
  )
}

export default Layout