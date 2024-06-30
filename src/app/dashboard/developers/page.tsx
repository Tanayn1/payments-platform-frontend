import React from 'react'
import TabsDev from './components/tabs'

export default function Page() {
  return (
    <div className=' ml-[210px]'>
        <div className=' mt-24'>
            <h1 className=' text-xl font-semibold'>
                Developers
            </h1>
        </div>
        <TabsDev/>
    </div>
  )
}
