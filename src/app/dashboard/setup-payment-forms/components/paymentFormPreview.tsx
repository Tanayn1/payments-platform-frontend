'use client'
import DisplaySubscription from '@/app/checkout/components/displaySubscription'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeftIcon } from 'lucide-react'
// @ts-ignore
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import React, { useEffect, useState } from 'react'
import DisplayProducts from '@/app/checkout/components/displayProducts'
import { PriceIdObject, ProductObject } from '@/types/types'

interface PaymentFormPreview {
  priceObject: Array<PriceIdObject>,
  productArray: Array<ProductObject>

}

export default function PaymentFormPreview({ priceObject, productArray }: PaymentFormPreview) {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();
  const [total, setTotal] = useState<null | number>(null)

  const getTotal = ()=>{
    let sum = 0;

    for (let obj of priceObject) {
      sum += obj.price;
    }
    setTotal(sum)

    }
  

  useEffect(()=>{
    getTotal()
  },[priceObject])

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-[900px] max-w-3xl bg-white rounded-lg shadow-xl flex h-[600px]">
        <div className="w-1/2 p-8">
          <div className="mb-5">
            <a href=""><ArrowLeftIcon /></a>
          </div>
          <div className="mb-10">
            <h1 className="text-4xl font-semibold">
              ${total}
            <span className="text-xs text-gray-400 font-normal">per {priceObject[0]?.billingPeriod === 'Monthly' ? 'Month' : priceObject[0]?.billingPeriod === 'Yearly' ? 'Year' : 'Week'}</span></h1>
            <h1 className="text-lg mt-2 text-gray-500">{priceObject[0]?.priceType === 'recurring' ? `Subscribe To ${productArray[0]?.name}` : `Amount Due To ${productArray[0]?.name}`}</h1>
          </div>
          <div>
            {priceObject[0]?.priceType === 'recurring' ? <DisplaySubscription priceObjectArray={priceObject} productArray={productArray}  total={total!}  /> : <DisplayProducts />}
          </div>
        </div>

        <div className="w-1/2 p-10 flex flex-col items-center justify-center shadow-lg">
          <div className=" mx-10 ">
            <div className="mb-4">
              <h1 className="text-sm mb-1 ml-1 text-gray-700">Email</h1>
              <Input disabled placeholder='Email' type='email' className='shadow w-[200px] h-[30px] text-xs' />
            </div>
            <div>
              <h1 className="text-sm mb-1 ml-1 text-gray-700">Card Information</h1>
              <div className="p-2 border border-gray-200 rounded-xl shadow w-[200px] h-[80px]">
                <div className="flex items-center p-2">
                  <svg {...getCardImageProps({ images })}  />
                  <input disabled {...getCardNumberProps()} className='ml-2 border-none disabled:bg-white  focus:border-none focus:outline-none w-[200px] h-[10px] text-xs' />
                </div>
                <div className="flex items-center ml-2">
                  <div className="p-2 w-1/3">
                    <input disabled {...getExpiryDateProps()} className='border-none disabled:bg-white focus:border-none focus:outline-none w-[100px] h-[10px] text-xs' />
                  </div>
                  <div className="p-2 w-1/3">
                    <input disabled {...getCVCProps()} className='border-none disabled:bg-white focus:border-none focus:outline-none w-[100px] h-[10px] text-xs' />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-sm mb-1 ml-1 text-gray-700 mt-5">Cardholder Name</h1>
                <Input disabled placeholder='Full Name On Card' className='shadow focus:outline-none w-[200px] h-[30px] text-xs' />
              </div>
            </div>
            <Button disabled className='mt-6 w-[200px] h-[30px] text-xs'>{priceObject[0]?.priceType === 'recurring' ? `Subscribe $${priceObject[0].price}` : 'Checkout'}</Button>
            <div className='flex flex-col items-center mt-7'>
              <h1 className='text-xs text-gray-400'>Powered By <span className='font-bold'>Trustflow</span> | Terms Privacy </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
