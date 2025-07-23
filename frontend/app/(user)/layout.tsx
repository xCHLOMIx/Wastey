import { div } from '@tensorflow/tfjs'
import React, { ReactNode } from 'react'
import Sidebar from '../components/user/Sidebar'
import Navbar from '../components/user/Navbar'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='bg-bg h-screen flex overflow-hidden'>
            <Sidebar />
            <div className='w-full h-full p-10 overflow-y-scroll'>
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default layout