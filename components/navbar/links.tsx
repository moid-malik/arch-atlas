import Link from "next/link";
import React from "react";
export default function Links() {
  return (
    <ul className="flex md:flex-row flex-col md:text-[14.5px] text-2xl items-center pt-4  gap-4 text-neutral-700">
      {links.map((link) => (
        <Link key={link.label} href={link.route}>
          {link.label}
        </Link>
      ))}
    </ul>
  );
}

export const links = [
  { label: <p className="text-black text-xlg">Home</p>, route: "/" },
  { label: <p className="text-black text-xlg">Shop</p>, route: "/catalog" },
  { label: <p className="text-black text-xlg">About</p>, route: "/about" },
];
