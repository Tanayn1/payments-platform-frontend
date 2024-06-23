import React from 'react'

interface DisplaySubscription {
    billingPeriod: string;
    description: string;
    price: number
}

export default function DisplaySubscription({ billingPeriod, description, price } : DisplaySubscription) {
  return (
    <div className=' ml-10 w-[500px]'>
        <div className=' flex justify-between'>
        <div>
            <h1>Clippify Pro - {billingPeriod}</h1>
            <p className=' mt-2 w-[200px] text-xs text-gray-400'>{description}</p>
        </div>
        <h1>${price}</h1>
        </div>
        <div className=' border my-4 border-gray-200 w-[500px]'></div>
        <div className=' flex justify-between'>
            <h1>Total Due</h1>
            <h1>${price}</h1>
        </div>
    </div>
  )
}
