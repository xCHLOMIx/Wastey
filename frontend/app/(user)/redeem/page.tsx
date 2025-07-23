"use client";
import Reward from "@/app/components/user/Reward";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuGift } from "react-icons/lu";

interface RewardInt {
  name: string,
  points: number,
  description: string
}

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const rewards: RewardInt[] = [
    {
      name: "MTN 1GB Data",
      points: 400,
      description: "Redeem to get a one day MTN 1GB Data",
    },
    {
      name: "MTN 200MB Data",
      points: 100,
      description: "Redeem to get a one day MTN 200MB Data ",
    },
    {
      name: "CANAL BOX Subscription",
      points: 10000,
      description: "Redeem to get a monthly subscription of CANAL Box internet",
    },
  ];

  const handleRedeem = async (reward: RewardInt) => {
    if ((session?.user?.points ?? 0) < reward.points) {
      alert("You don't have enough points to redeem this reward.");
      return;
    }
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
    <div className="h-full text-white mt-10">
      <div className="flex flex-col w-full justify-center">
        <div className="flex flex-col justify-center mt-10">
          <h2 className="text-2xl max-md:text-xl max-sm:text-lg font-bold">Redeem your points for rewards</h2>
          <p className="text-lg max-md:text-base max-sm:text-sm text-white/70">You have {session?.user?.points} points</p>
        </div>
        <div className="flex w-full">
          <div className="grid grid-cols-3 max-md:grid-cols-1 w-full mt-10 gap-3 items-center justify-center">
            {rewards.map((reward, index) => (
              <Reward key={index} reward={reward} />
            ))}
          </div>
        </div><br /><br /><br /><br /><br />
      </div>
    </div>
  );
};
export default page;
