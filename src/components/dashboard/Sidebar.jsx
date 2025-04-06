"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Mail, Users, Edit, Home, Menu,Calendar } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Book, label: "Books", href: "/dashboard/books" },
  { icon: Mail, label: "Contact Us", href: "/dashboard/contact" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: Edit, label: "Write & Publish", href: "/dashboard/writePublish" },
  { icon: Calendar, label: "Events", href: "/dashboard/events" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <>
      {navItems.map((item) => (
        <div key={item.href} className="p-2">
          <Link
            href={item.href}
            className={`flex items-center p-2 rounded-md ${
              pathname === item.href ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setOpen(false)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile View */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden bg-white"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-white">
            <SheetTitle className="sr-only">Dashboard Menu</SheetTitle>
          <nav className="flex flex-col gap-4">
            <NavContent />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop View */}
      <aside className="hidden lg:block w-64 bg-white border-r h-screen ">
        <nav className="flex flex-col gap-4">
          <NavContent />
        </nav>
      </aside>
    </>
  );
}
