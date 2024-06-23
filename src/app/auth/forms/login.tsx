'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { logIn } from '../actions';
import { useRouter } from 'next/navigation';

export default function LogIn() {
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const router = useRouter()

    useEffect(()=>{
        if (email && password) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    },[email, password]);

    const handleSubmit = async ()=>{
        try {
           const urlOrErr = await logIn(email!, password!) 
           if (urlOrErr?.redirect) {
            router.push(urlOrErr.redirect)
           }
        } catch (error) {
            console.log(error)
        }
    }    
  return (
    <div className=' md:w-[450px]'>
       <div className=''>
        <div className=' mb-5 '>
            <h1 className=' text-3xl font-bold'>Sign In</h1>
            <h1 className=' text-md text-gray-400 my-2'>To Resume</h1>
        </div>
            <div>
                <Input onChange={(e)=>{setEmail(e.target.value)}} autoComplete='email' type='email' placeholder='email' required/>
            </div>
            <div className=' my-2'>
                <Input onChange={(e)=>{setPassword(e.target.value)}}  type='password' placeholder='password' required/>
            </div>

            <Button onClick={handleSubmit} disabled={isDisable} className=' w-full my-2'>Sign In</Button>
            <div className=' flex justify-center'>
                <h1 className=' text-gray-400'>Don&apos;t have an account?</h1>
                <a href="/auth/signup" className=' font-semibold mx-2'>Sign Up</a>
            </div>
       </div> 
    </div>
  )
}
