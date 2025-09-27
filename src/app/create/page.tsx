"use client";

import { upload } from "@vercel/blob/client";
import { error } from "console";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const [promt, setPromt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.apiKey;
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
      error;
    }
  };

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPromt(value);
  };

  return (
    <div>
      <div>Ai Image Generator</div>
      <input
        placeholder="зургаа оруулана уу"
        onChange={(e) => handleValue(e)}
      />
      <div>
        <button onClick={ganerateImage}>Generate image</button>
      </div>
      <div>
        <img className="rounded-2xl" src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Page;
