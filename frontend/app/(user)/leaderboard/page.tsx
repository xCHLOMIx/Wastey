"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const { data: session, status } = useSession();
    const [leaders, setLeaders] = useState<any[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/leaderboard");
            const json = await response.json()

            setLeaders(json)
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        }
    }, [status, router]);

    return (
        <div className="h-full mt-10">
            <div className="flex flex-col gap-3">
                {leaders.map((leader, index) => (
                    <div key={index} className='flex bg-altbg justify-between border border-stroke p-2 gap-5 items-center font-bold text-white rounded-2xl'>
                        <div className='flex gap-5 items-center'>
                            <div className={`${index == 0 ? 'bg-yellow-400' : ''} ${index == 1 ? 'bg-black/50' : ''} ${index == 2 ? 'bg-amber-900' : ''} p-2 px-4 font-bold rounded-xl`}>
                                {index + 1}
                            </div>
                            <div>{leader.email}</div>
                        </div>
                        <div className='flex gap-2 bg-white/5 p-3 rounded-2xl'>
                            <Image src="/point.png" alt='points' width={24} height={24} />
                            <span className='font-semibold text-white'>{leader.points}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page