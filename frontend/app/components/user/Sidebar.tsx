"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiOutlineTrophy } from 'react-icons/hi2';
import { LuGift } from 'react-icons/lu';
import { RiCopperCoinFill } from 'react-icons/ri';
import { LuLogOut } from "react-icons/lu";

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
    return (
        <div className='border-r-3 min-w-80 flex flex-col justify-between border-altstroke p-8'>
            <div className='flex flex-col gap-3'>
                <div className="">
                    <h1 className='text-3xl text-white font-bold'>Wastey</h1>
                </div><br />
                {links.map((link) => (
                    <div key={link.text} className={`text-white ${theLink?.includes(link.text) ? "bg-altbg border-stroke" : "hover:bg-altbg/40"} transition duration-300 p-5 cursor-pointer rounded-2xl border-2 border-bg flex gap-6`}>
                        {link.icon}
                        <h2>{`${link.text}`.toUpperCase()}</h2>
                    </div>
                ))}
            </div>
            <div className={`text-white transition duration-300 hover:bg-altbg/40 p-5 cursor-pointer rounded-2xl border-2 border-bg flex gap-6`}>
                <LuLogOut size={24} />
                <h2>Log out</h2>
            </div>
        </div >
    )
}

export default Sidebar