"use client"
import { useParams, usePathname } from 'next/navigation';
import React from 'react'
import { LuGift } from 'react-icons/lu';
import { RiCopperCoinFill } from 'react-icons/ri';

interface Link {
    icon: any,
    text: any
}

const links: Link[] = [
    { icon: <RiCopperCoinFill size={24} />, text: 'earn' },
    { icon: <LuGift size={25} />, text: 'redeem' },
    { icon: <RiCopperCoinFill size={24} />, text: 'leaderboard' }
]

const Sidebar = () => {
    const theLink = usePathname()
    return (
        <div className='border-r-3 min-w-80 flex flex-col gap-10 border-altstroke p-8'>
            <div className="">
                <h1 className='text-3xl text-white font-bold'>Wastey</h1>
            </div>
            <div className='flex flex-col gap-3'>
                {links.map((link) => (
                    <div key={link.text} className={`text-white ${theLink?.includes(link.text) ? "bg-altbg border-stroke" : "hover:bg-altbg/40"} transition duration-300 p-5 cursor-pointer rounded-2xl border-2 border-bg flex gap-6`}>
                        {link.icon}
                        <h2>{`${link.text}`.toUpperCase()}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar