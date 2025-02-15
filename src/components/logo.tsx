import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-serif text-xl font-medium uppercase">
      <span>Doggy</span>
    </Link>
  );
}
