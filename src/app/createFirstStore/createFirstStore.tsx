'use client'
import CountrySelector from '@/components/countrySelector/countrySelector';
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createStore } from './actions';
import { COUNTRIES } from '@/components/countrySelector/countries';
import { checkUser } from '../dashboard/components/actions';


export default function CreateFirstStore() {
    const [storeName, setStoreName] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false);
    const [country, setCountry] = useState('AU');
    const router = useRouter();
    const handleSubmit = async ()=>{
        if (storeName) {
        try {
            setLoading(true)
            const url = await createStore(storeName, country);
            if (url && url.redirect ) {
                router.push(url.redirect)
            }  
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

        } else {
            //alert
            alert('Fill out all fields')
        } 
    }

    const check = async ()=>{
        const response = await checkUser()
        if (response?.redirect) {
            router.push(response.redirect)
        }
    }

    useEffect(()=>{
        check()
    },[])
  return (
    <div>
        <div>
            <h1 className=' text-xs text-gray-500 mb-1'>Name Of Your Store</h1>
            <Input placeholder='Store Name' onChange={(e)=>{setStoreName(e.target.value)}}/>
        </div>
            <div className=' my-2'>
                <h1 className=' text-xs text-gray-500'>Select Your Country</h1>
                <CountrySelector
                    id={'countries'}
                    open={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    onChange={val => setCountry(val)}
                    // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
                    selectedValue={COUNTRIES.find(option => option.value === country) as any} 
                />
            </div>
            <Button disabled={loading} onClick={handleSubmit} className=' w-full my-3'>Create Store <PlusIcon className=' ml-2'/></Button>
    </div>
  )
}
