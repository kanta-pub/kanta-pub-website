import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shopping", href: "/shopping" },
  { name: "Write & Publish with us", href: "/publish" },
  { name: "Contact Us", href: "/contact" },
  { name: "Events", href: "/events" },
];

// MobileNav Component
function MobileNav({ userRole }) {
  return (

    <Sheet>
      <SheetTrigger className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300">
        <Menu className="h-6 w-6 text-black" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px] bg-[#25276F] p-4">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-lg text-white hover:text-[#F07347] transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {userRole && (
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-lg text-white hover:text-[#F07347] transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// Navbar Component
export function Navbar({ userRole }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black shadow-md px-4 py-3 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-24 h-24 md:w-20 md:h-20 lg:w-28 lg:h-28">
            <img
              src="/logo.png" // Replace with the correct image path
              alt="Kanta Publication Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[#F07347] text-lg md:text-2xl font-serif font-semibold">Kanta Publication</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-[#F07347] transition-colors whitespace-nowrap text-base lg:text-lg font-medium"
            >
              {item.name}
            </Link>
          ))}
          {/* Conditional Dashboard Link */}
          {userRole && (
            <Link
              href="/dashboard"
              className="text-lg lg:text-xl text-gray-700 hover:text-[#F07347] transition-colors whitespace-nowrap font-medium"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileNav userRole={userRole} />
        </div>
      </div>
    </nav>
  );
}
