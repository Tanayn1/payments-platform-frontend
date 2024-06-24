'use client'
import { ComboboxDemo } from '@/components/combobox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiSecurePaymentLine } from "react-icons/ri";
import PaymentFormPreview from './paymentFormPreview'


export default function CreateForm() {
  const [selectedProduct, setSelectedProduct] = useState<null | any>(null);
  const [pageStatus, setPageStatus] = useState<string>('paymentPage')
  const [freeTrial, setFreeTrial] = useState<boolean>(false);
  const [trialLength, setTrialLength] = useState<null | number>(null);
  const [billingAddress, setBillingAddress] = useState<boolean>(false); 
  const [requirePhone, setRequirePhone] = useState<boolean>(false)
  const [customiseSubmit, setCustomiseSubmit] = useState<boolean>(false)
  return (
    <div className=' fixed inset-0 backdrop-blur-lg flex justify-center items-center  w-full h-screen z-50'>
        <div className=' fixed flex items-center top-0 left-0 m-7'>
            <Link href={'/dashboard/setup-payment-forms'}>
                 <ArrowLeft/>
            </Link>
            <h1 className=' ml-3 text-sm font-semibold'>Create Payment Form</h1>
        </div>
        <div className=' fixed top-0 right-0 m-7'>
          <Button className=' h-6 text-xs'>Create Payment Page <RiSecurePaymentLine className=' ml-1 h-4 w-4' /></Button>
        </div>
        <div className=' flex items-center'>
            <div className=''>
                <Tabs defaultValue="paymentPage"  className="w-[400px] mb-5">
                  <TabsList>
                    <TabsTrigger onClick={()=>{setPageStatus('paymentPage')}} value="paymentPage">Payment Page</TabsTrigger>
                    <TabsTrigger onClick={()=>{setPageStatus('afterPayment')}} value="afterPayment">After Payment</TabsTrigger>
                  </TabsList>
                </Tabs>
                {pageStatus === 'paymentPage' 
                ? <div> 
                  <h1 className=' text-xl font-semibold'>Select Product</h1>
                <Button className=' mt-4' variant={'outline'}>Select Product/Subscription <ShoppingCartIcon className=' h-4 w-4 ml-2'/></Button>
                <h1 className=' text-xl font-semibold mt-5'>Options</h1>
                <div className=' mt-5'>
                  <CustomCheckbox label={'Collect Phone Number'} checked={requirePhone} onChange={()=>{setRequirePhone(!requirePhone)}}/>
                  <CustomCheckbox label={'Collect Billing Adress'} checked={billingAddress}  onChange={()=>{setBillingAddress(!billingAddress)}}/>
                  <div>
                    <CustomCheckbox label='Free Trial' checked={freeTrial}  onChange={()=>{setFreeTrial(!freeTrial)}}/>
                      {freeTrial && 
                        <div className=' ml-10 mt-3'>
                          <h1 className=' text-xs ml-1 text-gray-500'>Length</h1>
                          <Input placeholder='30'  onChange={(e)=>{setTrialLength(Number(e.target.value))}} className=' mt-2 w-[150px] h-[30px]'/>
                        </div>
                      }                  
                  </div>
                  <h1 className=' text-xl font-semibold mt-5'>Advanced Options</h1>
                  <div>
                      <CustomCheckbox label='Custom Submit Button' checked={customiseSubmit} onChange={()=>{setCustomiseSubmit(!customiseSubmit)}}/>
                        {customiseSubmit ? 
                        <div>
                          
                        </div> 
                        : '' }
                  </div>
                </div>
                </div> : ''}
            </div>
            <div>
              <PaymentFormPreview />
            </div>
        </div>
    </div>
  )
}


const CustomCheckbox = ({ label, checked, onChange } : any) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer my-2">
      <input 
        type="checkbox" 
        className="hidden peer" 
        checked={checked} 
        onChange={onChange} 
      />
      <div className="w-5 h-5 bg-gray-300 rounded-md flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-transparent peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:outline-none">
      {checked && <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        }
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </label>
  );
};

