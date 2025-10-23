"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setInputValue((prev) => {
        return { ...prev, email: value };
      });
    }
    if (name === "password") {
      setInputValue((prev) => {
        return { ...prev, password: value };
      });
    }
    if (name === "username") {
      setInputValue((prev) => {
        return { ...prev, username: value };
      });
    }
  };

  const signUp = async () => {
    const res = await fetch("http://localhost:3333/sign-up", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
        username: inputValue.username,
      }),
    });

    if (res.ok) {
      const token = await res.json();
      localStorage.setItem("token", JSON.stringify(token));
      toast.success("amjilttai nevterle bayr hurgi");
      router.push("/");
    } else {
      toast.error("aldaa garla");
    }
  };


  const handleClick = () => {
    router.push("../login");
  };

  return (
    <div className="flex items-center justify-center flex-col bg-gray-50 mt-50 ">
      <Input
        placeholder="email"
        name="email"
        onChange={(e) => handleValue(e)}
        className="w-60"
      />
      <Input
        placeholder="password"
        name="password"
        onChange={(e) => handleValue(e)}
        className="w-60"
      />
      <Input
        placeholder="username"
        name="username"
        onChange={(e) => handleValue(e)}
        className="w-60"
      />
      
        <Button onClick={signUp}  className="w-60 bg-blue-500 text-white hover:bg-blue-600">sign up</Button>
        <div className="px-3 text-gray-500 text-sm" >or</div>
        <button onClick={handleClick}>Already have an account! login</button>
      
    </div>
  );
};
export default Page;
