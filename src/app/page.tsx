"use client";

import { useUser } from "@/Provider/AuthProvider";

import { useEffect, useState } from "react";
import { Footerr } from "./_components/Footerr";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useUser();

  useEffect(() => {
    if (!token) return;

    const getPosts = async () => {
      try {
        const response = await fetch("http://localhost:3333/getPosts", {
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
  console.log(posts);
  return (
    <div className=" h-screen">
      <div className="py-[12px] px-[16px] border-b-[1px]">
        <img src="/instagram.png" alt="" />
      </div>
    </div>
  );
};

export default Page;
