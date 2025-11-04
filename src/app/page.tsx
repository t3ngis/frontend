"use client";

import { useUser } from "@/Provider/AuthProvider";

import { useEffect, useState } from "react";
import { Footerr } from "./_components/Footerr";
import Link from "next/link";
import { HeartCrack, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PostType = {
  caption: string;
  user: string;
  like: string[];
  images: string[];
};

const Page = () => {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const { token } = useUser();

  useEffect(() => {
    if (!token) return;

    const getPosts = async () => {
      try {
        const response = await fetch("http://localhost:3333/getPosts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const res = await response.json();
        setPosts(res);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getPosts();
  }, [token]);
  console.log(posts, "postsss");
  return (
    <div className=" h-screen">
      <div className="py-[12px] px-[16px] border-b-[1px]">
        <img src="/instagram.png" alt="" />
      </div>

      <div className="flex flex-col gap-4">
        {posts?.map((post, index) => (
          <div key={index}>
            <div>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>{post?.user.email}</div>
              </div>
              <img src={post?.images} />

              <div className="flex gap-2">
                <Heart></Heart>
                <MessageCircle></MessageCircle>
              </div>
              <div>{post?.like.length} likes</div>

              <div className="flex gap-2">
                <div className="font-bold">{post.user.username}</div>
                <div>{post?.caption}</div>
              </div>

              <div className="text-[#71717A] text-[14px]">
                View all comments
              </div>

              <div>Add a comment...</div>
            </div>
          </div>
        ))}
      </div>
      <Footerr />
    </div>
  );
};

export default Page;
