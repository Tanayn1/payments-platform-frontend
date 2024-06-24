'use client'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface CreateProduct {
    isShow: boolean,
    setIsShow: Function,
    //productId: string | undefined
}

export default function CreateProduct({isShow, setIsShow} : CreateProduct) {
    const [name, setName] = useState<null | string>(null);
    const [description, setDescription] = useState<null | string>(null);
    const [productType, setProductType] = useState<null | string>(null);
    const [price, setPrice] = useState<null | number>(null);
    const [billingPeriod, setBillingPeriod] = useState<null | string>(null)

    const fetchData = async ()=>{}

    useEffect(()=>{

    },[])
   return (
    <div>
    {isShow && (<div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40"></div>)}
        <aside className={`fixed  inset-y-0 right-0 transform ${isShow ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-white  shadow-2xl rounded-l-lg  w-[500px] z-50`}>
            <div className=' relative'>
                <div className=' fixed  top-0 right-0 '>
                    <button className=' m-7' onClick={()=>{setIsShow(false)}}><XIcon/></button>
                </div>
                <div className=' fixed left-0 top-0'>
                    <h1 className=' m-7 text-2xl font-semibold'>Create Product</h1>
                </div>
            </div>
            <div className=' border  border-gray-200 mt-20 '></div>
            <div>
                <div className=' mx-6 mt-10'>
                    <h1 className=' text-sm font-medium '>Name</h1>
                    <p className=' text-xs text-gray-500 mb-1'>Name of the product, visible to customers.</p>
                    <Input value={name !== null ? name : ''} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className=' mx-6 mt-5'>
                    <h1 className=' text-sm font-medium '>Description</h1>
                    <p className=' text-xs text-gray-500 mb-1'>Appears at checkout, on the customer portal, and in quotes.</p>
                    <Textarea value={description !== null ? description : ''} onChange={(e)=>{setDescription(e.target.value)}}/>
                </div>
                <div className='mx-6 mt-6'>
                    <h1 className=' text-sm font-medium '>Product Type</h1>
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
                </div>
                <div className=' mx-6 mt-6'>
                    <h1 className=' text-sm font-medium '>Product Price</h1>
                    <p className=' text-xs text-gray-500 mb-1'>Price of product</p>
                    <Input type='number' value={price !== null ? price : ''} onChange={(e)=>{setPrice(Number(e.target.value))}}/>  
                </div>
                <div className=' mx-6 mt-6'>
                    <h1 className=' text-sm font-medium '>Billing Period</h1>
                    <p className=' text-xs text-gray-500 mb-1'>Price of product</p>
                    <Input type='number' value={price !== null ? price : ''} onChange={(e)=>{setPrice(Number(e.target.value))}}/>  
                </div>

            </div>

        </aside>
    </div>
  )
}
