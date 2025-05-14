//login using google and redirect to home page
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (session) {
      router.push("/earn");
    }
  }, [session, router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.status === 200) {
      router.push("/earn");
    } else {
      setError(data.message);
      emailRef.current.focus();
    }
  };
  return (
    //login using google and redirect to home page
    <div className="flex bg-bg flex-col text-white justify-center gap-3 items-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
        <h1 className="text-6xl font-bold">Welcome to Wastey</h1>
      </div>
      <div>
        <p className="text-white/80">
          The world is not that clean and we can make it cleaner.
        </p>
        <p className="text-white/80">
          Earn points by recycling and redeem them for rewards.
        </p>
      </div>
      <button
        className=" text-white flex gap-3 mt-10 rounded-xl items-center cursor-pointer hover:bg-white hover:text-black transition duration-300 border my-3 px-4 font-semibold py-3"
        onClick={() => signIn("google")}
      >
        <Image src="/123.png" alt="Google" width={26} height={26} />
        <span>Get started</span>
      </button>
    </div>
  );
}
