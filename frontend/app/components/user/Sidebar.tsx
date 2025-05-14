"use client"
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { HiOutlineTrophy } from 'react-icons/hi2';
import { LuGift } from 'react-icons/lu';
import { RiCopperCoinFill } from 'react-icons/ri';
import { LuLogOut } from "react-icons/lu";
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

interface Link {
    icon: any,
    text: any
}

const links: Link[] = [
    { icon: <RiCopperCoinFill size={24} />, text: 'earn' },
    { icon: <LuGift size={25} />, text: 'redeem' },
    { icon: <HiOutlineTrophy size={24} />, text: 'leaderboard' }
]

const Sidebar = () => {
    const theLink = usePathname()
    const [sidebar, setSidebar] = useState<boolean>(false);

    // const toggleSidebar = () => {
    //     setSidebar(!sidebar);
    // }

    return (
        <div className='max-sm:-translate-x-full transition duration-300 max-sm:absolute h-screen z-10 bg-bg border-r-3 min-w-80 flex flex-col justify-between border-altstroke p-8'>
            <div className='flex flex-col gap-3'>
                <div className="flex gap-2">
                    <Image src="/logo.png" alt='logo' width={32} height={24} />
                    <h1 className='text-3xl text-white font-bold'>Wastey</h1>
                </div><br />
                {links.map((link) => (
                    <Link href={`/${link.text}`} key={link.text}>
                    <div className={`text-white ${theLink?.includes(link.text) ? "bg-altbg border-stroke" : "hover:bg-altbg/40"} transition duration-300 p-5 cursor-pointer rounded-2xl border-2 border-bg flex gap-6`}>
                        {link.icon}
                        <h2 className='capitalize'>{`${link.text}`}</h2>
                    </div>
                    </Link>
                ))}
            </div>
            <div onClick={() => signOut()} className={`text-white transition duration-300 hover:bg-altbg/40 p-5 cursor-pointer rounded-2xl border-2 border-bg flex gap-6`}>
                <LuLogOut size={24} />
                <h2>Log out</h2>
            </div>
        </div >
    )
}

export default Sidebar