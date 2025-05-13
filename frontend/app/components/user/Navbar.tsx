"use client"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const thePage = usePathname()

  return (
    <div className='w-full flex justify-between'>
      <div>
        <h1 className='text-3xl text-white font-bold capitalize'>{thePage.replace('/','').toLowerCase()}</h1>
      </div>
      <div>
        <div className='flex gap-2 bg-white/5 p-3 rounded-2xl'>
          <Image src="/point.png" alt='points' width={24}  height={24} />
          <span className='font-semibold text-white'>400</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar