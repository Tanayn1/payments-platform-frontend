'use client'
import React, { useState } from 'react'
import { OptionsDropdown } from './optionsDropdown'
import ExtraPricingEdit from './extraPricingEdit'

interface Prices {
    price : PricingObject, 
    idx : number, 
    deletePrice : Function, 
    editPrice: Function
    
}

interface PricingObject {
    price: number,
    billingPeriod: string | undefined | null,
    priceDescription: string | undefined | null,
    productType: string

}

export default function Prices({price, idx, deletePrice, editPrice  } : Prices) {
    const [isShow, setIsShow] = useState(false);

  return (
    <div key={idx} className=' my-3'>
    <div className=' flex items-center justify-between'>
        <div>
            <h1 className=' text-xs'>${price.price}</h1>
            <h1 className='text-xs text-gray-500'>{price.billingPeriod === 'weekly' ? 'per week' : price.billingPeriod === 'monthly' ? 'per month' : price.billingPeriod === 'yearly' ? 'per year' : 'One off payment' }</h1>
        </div>
        <div>
            <OptionsDropdown setEditDelete={()=>{deletePrice(idx)}} setEditShow={(value: boolean)=>{setIsShow(value)}} index={idx}/>
        </div>
    </div>
    <div className=' border  border-gray-200 mt-3 '></div>
    <ExtraPricingEdit isShow={isShow} 
    setIsShow={(value : boolean)=>{setIsShow(value)}} 
    oldBillingPeriod={price.billingPeriod} 
    oldProductDescription={price.priceDescription} 
    oldPrice={price.price} 
    oldProductType={price.productType} EditPrice={(newPriceObj : any)=>{editPrice(idx, newPriceObj)}} />
</div>
  )
}
