"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
  const rewards = [
    {
      name: "Reward 1",
      points: 100,
      description: "Description for reward 1",
      },
      {
          name: "Reward 2",
          points: 200,
          description: "Description for reward 2",
      },
    ];
    const handleRedeem = async(reward) => {
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
                //   reload the page
              

            });
            router.refresh();
            const data = await res.json();
            console.log("Points removed:", data);
          } catch (err) {
            console.error("Failed to award points", err);
          }
    }
    
  return (
    <div className="h-full text-white  mt-10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-bold">Redeem your points for rewards</h2>
          <p className="text-lg">You have {session?.user?.points} points</p>
        </div>
        <div className="flex">
          <div className="flex mt-10 gap-5 items-center justify-center">
            {rewards.map((reward, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">{reward.name}</h3>
                    <p className="text-lg">{reward.points}</p>
                <p className="text-sm">{reward.description}</p>
                <button onClick={()=>handleRedeem(reward)} className="border cursor-pointer text-white px-4 py-2 rounded-lg mt-2">
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
