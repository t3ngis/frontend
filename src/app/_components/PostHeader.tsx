import React from "react";
import { X } from "lucide-react";
export const PostHeader = () => {
  return (
    <div className="flex gap-30 border-b-[2px] px-1 py-4">
      <X />
      <p className="font-bold">New photo post</p>
    </div>
  );
};
