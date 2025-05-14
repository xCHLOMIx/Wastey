"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

    return (
        <div className="h-full mt-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Redeem your points</h1>
                
            </div>
        </div>
    )
}

export default page