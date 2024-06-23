import React from 'react'
import { GlobeDemo } from '../globeDemo'
import ShinyButton from '../magicui/shinyButton'

export default function Banner2() {
  return (
    <div className=' flex justify-center items-center'>
        <div className=' m-5'>
            <h1 className=' text-3xl mx-5 font-semibold bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent'>Protecting Partnerships Worldwide</h1>
            <h1 className=' text-lg mx-5 text-gray-300'>Collabarate with anyone in the world, Risk Free</h1>
            <ShinyButton text="Sign Up For The Waitlist" />
        </div>
        <GlobeDemo/> 
    </div>
  )
}
