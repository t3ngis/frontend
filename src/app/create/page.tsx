"use client";

import { upload } from "@vercel/blob/client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/Provider/AuthProvider";
import { useRouter } from "next/navigation";
import { Images } from "lucide-react";
import { toast } from "sonner";

const Page = () => {
  const [promt, setPromt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useUser();
  const router = useRouter();

  const apiKey = process.env.HPI_Key
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
    } catch {
      console.log("aldaa garlaa");
    }
  };
  const createPost = async () => {
    const res = await fetch("http://localhost:3333/post/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption: promt,
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

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPromt(value);
  };

  return (
    <div>
      <div className="flex justify-center">Ai Image Generator</div>
      <Input
        placeholder="зургаа оруулана уу"
        onChange={(e) => handleValue(e)}
      />
      <div>
        <Button onClick={ganerateImage}>Generate image</Button>
      </div>
      <div>
        <Button onClick={createPost}>Create post</Button>
      </div>
      
    </div>
  );
};

export default Page;
