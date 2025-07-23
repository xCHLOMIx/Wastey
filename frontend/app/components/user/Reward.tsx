import Image from 'next/image'
import React from 'react'
import { LuGift } from 'react-icons/lu'

interface Reward {
    name: string,
    points: number,
    description: string
}

interface Props {
    reward: Reward
}

const Reward: React.FC<Props> = ({ reward }) => {
    return (
        <div className="border-2 min-h-44 border-stroke bg-altbg/30 p-4 justify-between flex flex-col rounded-3xl shadow-lg">
            <div className='flex flex-col gap-2'>
                <div className="flex items-center gap-2">
                    <div className='bg-altbg p-2 rounded-xl'>
                        <LuGift className='w-6 h-auto max-md:w-5' />
                    </div>
                    <h3 className="text-xl max-md:text-lg max-sm:text-base font-bold">{reward.name}</h3>
                </div>
                <p className="text-sm max-md:text-xs text-white/60">{reward.description}</p>
            </div>
            <div className='flex items-center justify-between'>
                <div className='bg-altstroke/50 flex items-center gap-2 p-2 rounded-xl px-3'>
                    <Image src="/point.png" alt='points' width={24} height={24} />
                    <p className="text-lg max-md:text-base max-sm:text-sm">{reward.points}</p>
                </div>
                <button className="border-2 border-stroke text-white/90 hover:bg-altstroke max-md:text-sm transition duration-300 w-max self-end cursor-pointer px-4 py-2 rounded-lg mt-2">
                    Redeem
                </button>
            </div>
        </div>
    )
}

export default Reward