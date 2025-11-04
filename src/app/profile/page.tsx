"use client";
import { useUser } from "@/Provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Footerr } from "../_components/Footerr";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Profile = () => {
  const { user, token } = useUser();
  const [posts, setPosts] = useState();
  const router = useRouter();
  const id = user?._id;
  console.log(id);
  useEffect(() => {
    const getPostsByUserId = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/getPostsByUserId/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const res = await response.json();
        setPosts(res);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getPostsByUserId();
  }, [token]);
console.log(posts)
  return (
    <div>
      <div className="min-h-screen w-full flex flex-col gap-5">
        <div className="flex justify-between  px-4 py-4 border-b-[2px]">
          <ChevronLeft />
          <div className="font-bold">Edit Profile</div>
          <div></div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : "https://github.com/shadcn.png"
            }
            className="w-[72px] h-[72px] rounded-full"
            alt=""
          />
          <div className="flex flex-col gap-4 ">
            <div>{user?.username}</div>

            <Button className="w-[150px] bg-[#F4F4F5] text-black">
              Edit profile
            </Button>
          </div>
        </div>
        <div className="px-4">
          <div>{user?.email}</div>
          <div>{posts?.images}</div>
        </div>
      </div>
      <Footerr />
    </div>
  );
};
export default Profile;
