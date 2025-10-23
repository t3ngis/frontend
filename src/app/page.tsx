"use client"

import { useUser } from "@/Provider/AuthProvider";
import { useEffect, useState } from "react";

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
        console.log("Response:", res);
        setPosts(res.posts || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getPosts();
  }, [token]);

  return (
    <div>
      <div>instagram</div>
    
    </div>
  );
};

export default Page;
