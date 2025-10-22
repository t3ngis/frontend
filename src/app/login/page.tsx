"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useUser } from "@/Provider/AuthProvider";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { user, setToken } = useUser();
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    const res = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    });

    if (res.ok) {
      const token = await res.json();
      console.log(token, "token");
      setToken(token);
      localStorage.setItem("token", token);
      router.push("/");
      toast.success("success");
    } else {
      toast.error("failed");
    }
  };

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setInputValue((prev) => {
        return { ...prev, email: value };
      });
    } else if (name === "password") {
      setInputValue((prev) => {
        return { ...prev, password: value };
      });
    }
  };
  const signUp = () =>{
    router.push("../sign-up")
  }

  return (
    <div className="flex items-center justify-center flex-col bg-gray-50 mt-50 ">
      <Input
        className="w-60 "
        placeholder="email"
        name="email"
        onChange={(e) => handleValue(e)}
      />
      <Input
        placeholder="password"
        className="w-60"
        name="password"
        onChange={(e) => handleValue(e)}
      />
      <Button onClick={login} className="w-60 bg-blue-500 text-white hover:bg-blue-600">
        login
      </Button>
      <div className="px-3 text-gray-500 text-sm">or</div>
      <button onClick={signUp}> Don't have an account? sign up</button>
    </div>
  );
};

export default Page;
