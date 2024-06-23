import Image from 'next/image'
import React from 'react'

export default function Banner1() {
  return (
    <div className=' flex justify-center items-center mt-28'>
       <div className=' mx-32 w-[300px]'>
        <h1 className=' font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent'>TRUSTED BY OVER 100K COMPANIES IN OVER 100 COUNTRIES</h1>
      </div>
        <div className=' flex space-x-5'>
            <Image alt='' src={'/logos/634d9074eca598605c3c3b22_landify.png'} width={150} height={150}/>
            <Image alt='' src={'/logos/634d911213981b4b9d12a32b_iconic.png'} width={150} height={150}/>
            <Image alt='' src={'/logos/634d90b097320c7e0f45c0ef_fa.png'} width={150} height={150}/>
            <Image alt='' src={'/logos/634d9038ef9487485a37ca3e_th.png'} width={150} height={150}/>
        </div>
    </div>
  )
}
