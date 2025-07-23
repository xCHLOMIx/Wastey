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
        <div className='flex bg-altbg justify-between border border-stroke p-2 pl-2.5 gap-5 items-center font-bold text-white rounded-3xl max-md:rounded-2xl max-sm:rounded-xl'>
            <div className='flex gap-5 max-md:gap-2 items-center'>
                <div className={`${index == 0 ? 'bg-yellow-400' : ''} ${index == 1 ? 'bg-black/50' : ''} ${index == 2 ? 'bg-amber-900' : ''} p-2 px-4 h-full max-md:px-3 max-md:text-sm max-sm:text-xs font-bold rounded-xl max-md:rounded-lg max-sm:rounded-md`}>
                    {index + 1}
                </div>
                <div className='max-md:text-sm max-sm:text-xs'>{leader.email}</div>
            </div>
            <div className='flex gap-2 bg-white/5 p-3 max-md:p-2 items-center rounded-2xl max-md:rounded-xl max-sm:lg:'>
                <img src="/point.png" alt='points' className='w-6 max-md:w-5 max-md:h-5' />
                <span className='font-semibold max-md:text-sm max-sm:text-xs text-white'>{leader.points}</span>
            </div>
        </div>
    )
}

export default Leader