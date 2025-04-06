import Homepage from "@/components/HomePage/Homepage";
import Invite from "@/components/HomePage/Invite";
import { Navbar } from "@/components/HomePage/Navbar";
import Image from "next/image";
import Slogan from "@/components/HomePage/Slogan";
import Footer from "@/components/HomePage/Footer";

import { auth } from "@/auth";
import Product from "@/components/HomePage/Product";
export default async function Home() {
  const auths = await auth();
  return (
    <>
      {/* Apply padding on larger screens, remove on mobile */}
      <div className="lg:px-6 lg:pt-6 lg:pb-4">
        <Homepage />

        {/*  add blue  */}
        <Invite />
        <Slogan />
        <Product/>
        {/* <Footer user={auths?.user} /> */}

        {/*  add blue  */}
        {/* <Invite />
        <Slogan />
        <Footer /> */}
      </div>
    </>
  );
}
