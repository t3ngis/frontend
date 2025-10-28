"use client";

import { upload } from "@vercel/blob/client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/Provider/AuthProvider";
import { useRouter } from "next/navigation";
import { Images, X } from "lucide-react";
import { toast } from "sonner";
import { PostHeader } from "../_components/PostHeader";
import { Textarea } from "@/components/ui/textarea";
const Page = () => {
  const [promt, setPromt] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useUser();
  const router = useRouter();

  const apiKey = process.env.HPI_Key;

  const ganerateImage = async () => {
    if (!promt.trim()) return;
    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch(
        `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            inputs: promt,
            parameters: {
              negative_promt: "blurry, bad quality, distorted",
              num_inference_steps: 20,
              guidance_scale: 7.6,
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`error status: ${res.status}`);
      }
      const blob = await res.blob();
      const file = new File([blob], "generated.png", { type: "image/png" });
      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      const imageURL = uploaded.url;
      setImageUrl(imageURL);
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
        images: [imageUrl],
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
    setPromt(value);
  };

  return (
    <div className="flex flex-col gap-[24px] ">
      <PostHeader />

      <div className="flex flex-col gap-2">
        <p className="text-[20px] font-bold">Explore AI generated images</p>
        <p className="text-[14px] text-[#71717A]">
          Describe what's on your mind. For best results, be specific
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
  );
};

export default Page;
