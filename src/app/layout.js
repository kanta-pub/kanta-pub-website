import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/HomePage/Navbar";
import Footer from "@/components/HomePage/Footer";
import { auth } from "@/auth";

// Import fonts
const poppins = Roboto({ subsets: ["latin"], weight: ["100", "300"] });

export const metadata = {
  title: "Kanta Publication",
  description: "Kanta Publication: Ancient manuscript systems",
};


export default async function RootLayout({ children }) {
  const auths = await auth();
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
      <Navbar  userRole={auths?.user?.role}/>
        {children}
        <Footer user={auths?.user}/>
      </body>
    </html>
  );
}
