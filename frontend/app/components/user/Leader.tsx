import Image from 'next/image'
import React from 'react'

interface Leader {
    email: string,
    points: number
}

interface Props {
    index: number
    leader: Leader
}

const Leader: React.FC<Props> = ({ index, leader }) => {
    return (
        <div className='flex bg-altbg justify-between border border-stroke p-2 gap-5 items-center font-bold text-white rounded-2xl'>
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
    )
}

export default Leader