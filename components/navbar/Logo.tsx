import Link from "next/link";
import React from "react";

export default function Logo({ admin }: { admin?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-1.5 font-black text-4xl tracking-tighter">
      <span className="bg-gradient-to-r from-yellow-400 to-purple-600 text-transparent bg-clip-text w-fit gap-2">
        ARCH
      </span>
      {admin ? <span>ADMIN</span> : null}
    </Link>
  );
}
