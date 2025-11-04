import React from "react";
import { CirclePlus, House, Search, User } from "lucide-react";
import Link from "next/link";
export const Footerr = () => {
  return (
    <div className="w-full bg-white py-3  sticky bottom-0 flex gap-[24px] justify-around">
      <Link href="/">
        <House />
      </Link>

      <Link href="/search">
        <Search />
      </Link>
      <Link href="/add">
        <CirclePlus />
      </Link>
      <Link href="/profile">
        <User />
      </Link>
    </div>
  );
};
