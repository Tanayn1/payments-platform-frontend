import { PriceIdObject, ProductObject } from '@/types/types'
import React from 'react'

interface DisplaySubscription {
  priceObjectArray: Array<PriceIdObject>,
  productArray: Array<ProductObject>,
  total: number
}

export default function DisplaySubscription({ priceObjectArray, productArray, total } : DisplaySubscription) {
  return (
    <div className=' ml-10 w-[200px]'>
          {priceObjectArray.map((priceObject, index)=>{
            return (
              <div key={index} className=' flex justify-between'>
                <div>
                  <h1 className=' text-xs font-semibold'>{productArray[index].name} - {priceObject.billingPeriod}</h1>
                  <p className=' mt-2 w-[200px] text-xs text-gray-400'>{productArray[index].description}</p>
                </div>
                  <h1 className=' text-xs font-semibold'>${priceObject.price}</h1>
              </div>
            )       
          })}

        <div className=' border my-4 border-gray-200 w-[200px]'></div>
        <div className=' flex justify-between'>
            <h1 className=' text-sm font-medium'>Total Due</h1>
            <h1 className=' text-sm font-medium'>${total}</h1>
        </div>
    </div>
  )
}
