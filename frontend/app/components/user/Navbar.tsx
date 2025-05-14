"use client"
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

// Extend the Session type to include points
declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      points?: number; // Add points property
    };
  }
}
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { CiMenuFries } from 'react-icons/ci';
import { RiMenu2Fill } from 'react-icons/ri';

const Navbar = () => {
  const thePage = usePathname()
  const { data: session, status } = useSession();

  return (
    <div className='w-full flex justify-between'>
      <div className='flex gap-3 items-center'>
        <div className='max-sm:flex hidden'>
          <RiMenu2Fill size={24} color='white' className='font-bold' />
        </div>
        <h1 className='text-3xl text-white font-bold capitalize'>{thePage.replace('/', '').toLowerCase()}</h1>
      </div>
      <div className='flex gap-5 items-center'>
        <div className='flex gap-2 bg-white/5 p-3 rounded-2xl'>
          <Image src="/point.png" alt='points' width={24} height={24} />
          <span className='font-semibold text-white'>{session?.user?.points}</span>
        </div>
        {/* <div className='w-11 p-1 rounded-full h-11'>
          <Image src={`${session?.user?.image}`} alt='accou' height={32} width={32} />
        </div> */}
      </div>
    </div>
  )
}

export default Navbar