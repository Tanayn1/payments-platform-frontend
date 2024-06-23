'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlobOptions } from 'buffer';
import { ArrowBigLeftIcon, ArrowLeftIcon, CheckCircle2Icon } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import DisplaySubscription from './components/displaySubscription';
import DisplayProducts from './components/displayProducts';

export default function Page() {
    const [loading, setLoading] = useState<Boolean>(true);
    const [price, setPrice] = useState<null | number>(null);
    const [billingPeriod, setBillingPeriod] = useState<null | string>(null);
    const [type, setType] = useState<null | string>(null);
    const [trialPeriod, setTrialPeriod] = useState<null | number>(null);
    const [amount, setAmount] = useState<null | number>(null);

    const searchParams = useSearchParams()
    const {
      wrapperProps,
      getCardImageProps,
      getCardNumberProps,
      getExpiryDateProps,
      getCVCProps
    } = usePaymentInputs();
    const id = searchParams.get('id');
    const fetchCheckoutSession = async ()=>{
      setLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/${id}`)
        const data = await response.json();
        console.log(data)
        setBillingPeriod(data.billingPeriod);
        setType(data.type);
        setAmount(data.amount)

        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)

      }
    }

    useEffect(()=>{
      fetchCheckoutSession()
    },[])
  if (loading === false) {  
  return (
    <div className=' flex justify-between'>
      <div>
        <div className=' m-5'>
          <a href=""><ArrowLeftIcon/></a>
        </div>
        <div className=' m-10'>
          <h1 className=' text-4xl font-semibold'>${amount} <span className=' text-xs text-gray-400 font-normal'>per {billingPeriod === 'Monthly' ? 'Month' : billingPeriod === 'Yearly' ? 'Year' : 'Week'}</span></h1>
          <h1 className=' text-lg mt-2 text-gray-500'>{type === 'subscription' ? `Subscribe To Clippify Pro` : `Amount Due To Clippify Pro`}</h1>
        </div>
        <div>
          {type === 'subscription' ? <DisplaySubscription price={amount!} description='Access To All Paid Features 300 credits per month, unlimited generations.' billingPeriod={billingPeriod!}/> : <DisplayProducts/>}
        </div>
      </div>

      <div className=' flex flex-col items-center  justify-center h-screen shadow-2xl w-1/2'>
          <div className=' m-10 w-[500px]'>
            <div className=' mb-4'>
              <h1 className=' text-sm mb-1 ml-1 text-gray-700'>Email</h1>
              <Input placeholder='Email' type='email' className=' shadow' />         
            </div>
            <div>
              <h1 className=' text-sm mb-1 ml-1 text-gray-700'>Card Information</h1>
              <div className=' p-2 border border-gray-200 rounded-xl shadow '>
                <div className=' flex items-center p-2  '> 
                  <svg {...getCardImageProps({ images })} />
                  <input {...getCardNumberProps()} className=' ml-2 border-none focus:border-none focus:outline-none' />
                </div>
                <div className=' flex items-center  '>
                    <div className=' p-2 '>
                      <input {...getExpiryDateProps()} className=' border-none focus:border-none focus:outline-none'/>
                    </div>
                    <div className=' p-2 '>
                      <input {...getCVCProps()} className=' border-none focus:border-none focus:outline-none' />
                    </div>
                </div>
            </div>
            <div>
              <h1 className=' text-sm mb-1 ml-1 text-gray-700 mt-5'>Cardholder Name</h1>
              <Input placeholder='Full Name On Card' className=' shadow focus:outline-none'/>
            </div>
          </div>
          <Button className=' w-full mt-6'>{type === 'subscription' ? `Subscribe $${amount}` : 'Checkout'}</Button>
          <div className=' flex flex-col items-center mt-7'>
            <h1 className=' text-xs text-gray-400'>Powered By <span className=' font-bold'>Trustflow</span> | Terms Privacy </h1>
          </div>
        </div>
      </div>
    </div>
  )}
}
