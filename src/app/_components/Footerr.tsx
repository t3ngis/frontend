import React from "react";
import { CirclePlus, House, Search, User } from "lucide-react";
import Link from "next/link";
export const Footerr = () => {
  return (
    <div className="flex gap-[24px] justify-center absolute bottom-0 ">
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
