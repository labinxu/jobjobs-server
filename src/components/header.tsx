import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeDropDownMenu } from "./ThemeDropdown";
import Link from "next/link";
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/20 py-6 backdrop-blur-sm">
      <nav className="container flex items-center justify-between">
        <Sheet>
          <SheetTrigger className="sm:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>Menu</SheetTitle>
            <ul className="mt-10 flex flex-col gap-3 text-sm">
              <li>
                <SheetClose asChild>
                  <Logo />
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <ul className="hidden text-sm font-medium sm:flex sm:items-center sm:gap-14">
          <li>
            <Logo />
          </li>
        </ul>
        <ul className="flex justify-evenly gap-4">
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
        <div className="flex items-center justify-between gap-6">
          <ThemeDropDownMenu />
        </div>
      </nav>
    </header>
  );
}
