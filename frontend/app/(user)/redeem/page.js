"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuGift } from "react-icons/lu";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const rewards = [
    {
      name: "MTN 1GB Data",
      points: 400,
      description: "Description for reward 1",
    },
    {
      name: "MTN 200MB Data",
      points: 100,
      description: "Description for reward 2",
    },
    {
      name: "CANAL BOX Subscription",
      points: 10000,
      description: "Description for reward 2",
    },
  ];
  const handleRedeem = async (reward) => {
    // Handle redeeming the reward
    try {
      const res = await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          pointsToAdd: -reward.points,
        }),

      });
      router.refresh();
      const data = await res.json();
      console.log("Points removed:", data);
    } catch (err) {
      console.error("Failed to award points", err);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);

  return (
    <div className="h-full text-white  mt-10">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-bold">Redeem your points for rewards</h2>
          <p className="text-lg">You have {session?.user?.points} points</p>
        </div>
        <div className="flex w-full">
          <div className="grid grid-cols-3 w-full mt-10 gap-3 items-center justify-center">
            {rewards.map((reward, index) => (
              <div key={index} className="bg-gray-800 p-4 flex flex-col rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <LuGift size={25} />
                  <h3 className="text-xl font-bold">{reward.name}</h3>
                </div>
                <p className="text-lg">{reward.points}</p>
                <p className="text-sm">{reward.description}</p>
                <button onClick={() => handleRedeem(reward)} className="border hover:text-black hover:bg-white transition duration-300 w-max self-end cursor-pointer text-white px-4 py-2 rounded-lg mt-2">
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
