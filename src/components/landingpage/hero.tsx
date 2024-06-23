import React from 'react'
import ShimmerButton from '../magicui/shimmerButton'
import { FaArrowDownLong } from 'react-icons/fa6'

export default function Hero() {
  return (
    <div className=' flex justify-center mt-28'>
        <div className=' flex flex-col items-center '>
            <h1 className=' text-5xl font-semibold  bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent'>Transforming The Way You Do Business</h1>
            <h1 className=' text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent '>Globally</h1>
            <h1 className=' text-xl text-gray-300 mt-5'>Empowering Global Collaboration, Safeguarding Every Transaction.</h1>
            <ShimmerButton className="shadow-2xl mt-3">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Sign Up For The Waitlist
                </span>
            </ShimmerButton>
            <div className=' flex flex-col items-center mt-5'>
                <h1 className=' text-gray-300'>Learn More</h1>
                <FaArrowDownLong className=' mt-2 animate-bounce fill-gray-300' />
            </div>
        </div>
    </div>
  )
}
