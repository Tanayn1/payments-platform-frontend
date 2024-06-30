import { Input } from '@/components/ui/input'
import React from 'react'


interface AfterPaymentSettings {
  cancelUrl: string | null;
  successUrl: string | null,
  setCancelUrl: Function,
  setSuccessUrl: Function
}

export default function AfterPaymentSettings({cancelUrl, successUrl, setCancelUrl, setSuccessUrl} : AfterPaymentSettings) {
  return (
    <div className='w-[250px]'>
        <div className=' my-3'>
        <Input value={ cancelUrl ? cancelUrl : ''} onChange={(e)=>{setCancelUrl(e.target.value)}}  placeholder='Cancel Url'/>
        </div>
        <Input value={ successUrl ? successUrl : ''} onChange={(e)=>{setSuccessUrl(e.target.value)}} placeholder='Success Url'/>

    </div>
  )
}
