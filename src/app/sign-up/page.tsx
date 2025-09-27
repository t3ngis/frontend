"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

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
    const user2 = res.json();
    localStorage.setItem("user", JSON.stringify(user2));
  };

  const handleClick = () => {
    router.push("../login");
  }

  return (
    <div>
      <Input
        placeholder="email"
        name="email"
        onChange={(e) => handleValue(e)}
      />
      <Input
        placeholder="password"
        name="password"
        onChange={(e) => handleValue(e)}
      />
      <Input
        placeholder="username"
        name="username"
        onChange={(e) => handleValue(e)}
      />
      <div className="flex flex-col">
        <Button onClick={signUp}>sign up</Button>
        <button onClick={handleClick}>login</button>
      </div>
    </div>
  );
};
export default Page;
