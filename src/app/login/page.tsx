"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useUser } from "@/Provider/AuthProvider";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const { setUser, user } = useUser();
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
    console.log(res);
    if (res.ok) {
      router.push("../");
    }
    const user2 = await res.json();
    localStorage.setItem("user", JSON.stringify(user2));
    setUser(user);
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
  }

  return (
    <div>
      <Input
        className="w-100 "
        placeholder="email"
        name="email"
        onChange={(e) => handleValue(e)}
      />
      <Input
        placeholder="password"
        className="w-100"
        name="password"
        onChange={(e) => handleValue(e)}
      />
      <Button onClick={login} className="w-100">
        login
      </Button>
    </div>
  );
};

export default Page;
