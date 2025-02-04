"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "../auth/user-button";

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex justify-end items-center gap-4">
        <li>
          <Link href="/" passHref className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            passHref
            className={pathname === "/settings" ? "active" : ""}
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            passHref
            className={pathname === "/about" ? "active" : ""}
          >
            About
          </Link>
        </li>
        <li>
          <UserButton />
        </li>
      </ul>
    </nav>
  );
};
export default NavLinks;
