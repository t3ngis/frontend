"use client";

import { upload } from "@vercel/blob/client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/Provider/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PostHeader } from "../_components/PostHeader";
import { Footerr } from "../_components/Footerr";
import { Textarea } from "@/components/ui/textarea";
const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useUser();
  const router = useRouter();

  const ganerateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      const blob = await response.blob();

      const file = new File([blob], "generated.png", { type: "image/png" });

      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      setImageUrl((prev) => [...prev, uploaded.url]);
      setLoading(false);
    } catch {
      console.log("aldaa garlaa");
    }
  };

  const createPost = async () => {
    const res = await fetch("http://localhost:3333/createPost", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption: description,
        images: imageUrl,
      }),
    });
    if (res.ok) {
      toast.success("lucky");
      router.push("/");
    } else {
      toast.error("unlucky");
    }
  };

  const handleValue = (value: string) => {
    setPrompt(value);
  };

  return (
    <div>
      <div className="flex flex-col gap-[24px] min-h-screen">
        <PostHeader />

        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-bold">Explore AI generated images</p>
          <p className="text-[14px] text-[#71717A]">
            Describe whats on your mind. For best results, be specific
          </p>
        </div>

        <Textarea
          className="h-[102px]"
          placeholder="Example: Im walking in fog like Bladerunner 2049"
          onChange={(e) => handleValue(e.target.value)}
        />
        {imageUrl ? <img src={imageUrl} alt="" /> : ""}
        <Input
          type="text"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2 justify-end">
          <Button
            disabled={loading}
            onClick={ganerateImage}
            className="bg-[#0095F6]"
          >
            {loading ? "loading..." : "Generate image"}
          </Button>
          <Button onClick={createPost}>Create post</Button>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default Page;
