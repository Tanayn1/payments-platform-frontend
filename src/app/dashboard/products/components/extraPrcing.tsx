'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface ExtraPricing {
    isShow: boolean,
    setIsShow: Function,
    addPrice: Function

}

export default function ExtraPricing({ isShow, setIsShow, addPrice} : ExtraPricing) {
    const [productType, setProductType] = useState<null | string>(null);
    const [price, setPrice] = useState<null | number>(null);
    const [billingPeriod, setBillingPeriod] = useState<string>('weekly');
    const [productDescription, setProductDescription] = useState<null | string>(null)

    const handleAddPrice = ()=>{
        if (productType === 'one_off') {
            if (price) {
                const priceObj = {
                    price: price,
                    billingPeriod: null,
                    priceDescription: productDescription
                }

                addPrice(priceObj)
                setIsShow(false)
            } else {
                //alert
                return;
            }
        } else if (productType === 'recurring') {
            if (price && billingPeriod) {
                const priceObj = {
                    price: price,
                    billingPeriod: billingPeriod,
                    priceDescription: productDescription
                }

                addPrice(priceObj)
                setIsShow(false)
            } else {
                //alert 
                return;
            }
        }
    }

    useEffect(()=>{
        setProductType(null);
        setPrice(null);
        setBillingPeriod('weekly');
        setProductDescription(null);
    },[])

  return (
    <div className={`fixed  inset-y-0 right-0 transform ${isShow ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-white  shadow-2xl rounded-l-lg  w-[490px] z-50`}>
        <div className=' relative'>
            <div className=' fixed  top-0 right-0 '>
                <button className=' m-7' onClick={()=>{setIsShow(false)}}><XIcon/></button>
            </div>
            <div className=' fixed left-0 top-0'>
                <h1 className=' m-7 text-xl font-semibold'>Add price</h1>
            </div>
        </div>
        <div className='border  border-gray-200 mt-20 '></div>
            <h1 className=' text-sm font-medium  mx-6 mt-5'>Price Type</h1>
            <div className=' flex justify-center gap-3 mt-2 '>
                <div onClick={()=>{setProductType('recurring')}} className={` ${productType === 'recurring' ? ' bg-slate-100' : '' } flex flex-col justify-center rounded-md border border-gray-200  h-[48px] hover:bg-slate-100 cursor-pointer`}> 
                    <h1 className=' text-xs font-medium px-[80px]'>Recurring</h1>
                    <p className='  text-xs text-gray-500 text-center '>Charge an ongoing fee</p>
                </div>
                    <div onClick={()=>{setProductType('one_off')}} className={` ${productType === 'one_off' ? ' bg-slate-100' : '' } flex flex-col justify-center rounded-md border border-gray-200  h-[48px] hover:bg-slate-100 cursor-pointer`}> 
                        <h1 className=' text-xs font-medium px-[80px]'>One Off</h1>
                        <p className='  text-xs text-gray-500 text-center '>Charge a one time payment</p>
                    </div>
            </div>
            <div className=' mx-6 mt-6'>
                <h1 className=' text-sm font-medium '>Product Price</h1>
                <p className=' text-xs text-gray-500 mb-1'>Price of product</p>
                <Input type='number' value={price !== null ? price : ''} onChange={(e)=>{setPrice(Number(e.target.value))}}/>  
            </div>
            <div className=' mx-6 mt-5'>
                <h1 className=' text-sm font-medium '>Price Description</h1>
                <p className=' text-xs text-gray-500 mb-1'>Use to organize your prices. Not shown to customers.</p>
                <Input value={productDescription !== null ? productDescription : ''} onChange={(e)=>{setProductDescription(e.target.value)}}/>
            </div>
            <div className={` ${productType !== 'recurring' ? 'hidden' : ''} mx-6 mt-6`}>
                <h1 className=' text-sm font-medium '>Billing Period</h1>
                <p className=' text-xs text-gray-500 mb-1'>Price of product</p>
                <select onChange={(e)=>{setBillingPeriod(e.target.value)}} name="billingPeriod" id="billingPeriod" className=' h-[28px] text-xs border border-gray-200 focus:outline-none px-3 rounded-lg w-full'>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            <div className=' flex items-center justify-between mx-6 mt-7'>
                <Button onClick={()=>{setIsShow(false)}} variant={'outline'} className=' shadow h-[28px] text-xs'>Back</Button>
                <Button onClick={handleAddPrice} className=' shadow h-[28px] text-xs'>Add Price</Button>
            </div>

    </div>
  )
}
