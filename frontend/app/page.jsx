//login using google and redirect to home page
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRef } from "react";

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
      router.push("/");
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
      router.push("/");
    } else {
      setError(data.message);
      emailRef.current.focus();
    }
  };
  return (
    //login using google and redirect to home page
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to Wastey</h1>
      <p className="text-gray-600">
        Let us help you manage your waste effectively.
      </p>
      <button
        className=" text-black border my-3 px-4 py-2"
        onClick={() => signIn("google")}
      >
        Login with Google
      </button>
    </div>
  );
}
