"use client"
import Leader from '@/app/components/user/Leader';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface LeaderInt {
    email: string,
    points: number
}

const tempLeaders : LeaderInt[] = [
    { email: "gutabarwaa@gmail.com", points: 100},
    { email: "credo@gmail.com", points: 50},
    { email: "chlomi@gmail.com", points: 20},
]

const page = () => {
    const { data: session, status } = useSession();
    const [leaders, setLeaders] = useState<LeaderInt[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/leaderboard");
            const json = await response.json()

            setLeaders(json)
        }

        fetchData()
    }, [])

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push('/');
    //     }
    // }, [status, router]);

    return (
        <div className="h-full mt-10 overflow-y-scroll overflow-auto bar">
            <div className="flex flex-col gap-3">
                {tempLeaders.map((leader, index) => (
                    <Leader leader={leader} index={index} />
                ))}
                <br /><br />
            </div>
        </div>
    )
}

export default page