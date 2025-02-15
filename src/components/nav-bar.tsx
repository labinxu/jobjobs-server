"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import UserAvatar from "@/components/user-avatar";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 bg-background z-50 border-b w-full">
      <div className="flex justify-between py-2">
        <Link href="/" className="font-bold text-2xl">
          Doggy
        </Link>
        <div className="hidden md:flex items-center gap-4 w-full justify-between pl-5">
          <NavigationMenu />
          {session?.user ? (
            <div className="flex items-center gap-2">
              <UserAvatar
                image={session?.user?.image}
                name={session?.user?.name}
                email={session?.user?.email}
              />
              <Button
                onClick={() =>
                  signOut({ callbackUrl: "/auth/register", redirect: true })
                }
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => signIn()}>
              Login
            </Button>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through the app.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-row justify-between">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/page/task" className="hover:underline">
                Tasks
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
              {session?.user ? (
                <div className="flex flex-col gap-2">
                  <UserAvatar
                    image={session?.user?.image}
                    name={session?.user?.name}
                    email={session?.user?.email}
                  />
                  <Button
                    onClick={() => {
                      signOut({
                        callbackUrl: "/auth/signup",
                        redirect: true,
                      });
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => signIn()}>Login</Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

const NavigationMenu = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/page/task" className="hover:underline">
        Tasks
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact
      </Link>
    </div>
  );
};

export default Navbar;
