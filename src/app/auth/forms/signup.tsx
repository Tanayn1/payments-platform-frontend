'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { signUp } from '../actions';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [name, setName] = useState<null | string>(null)
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const [confrimPassword, setConfirmPassword] = useState<null | string>(null);
    const router = useRouter();

    useEffect(()=>{
        if (name && email && password && confrimPassword) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    },[email, password, confrimPassword])
    const handleSubmit = async ()=>{
        if (password === confrimPassword) {
        try {
          const response = await signUp(name!, email!, password!);
          if (response?.redirect) {
            router.push(response.redirect)
          }
        } catch (error) {
            console.log(error)
        }
    } else {
        alert('Passwords Must Match')
    }
    } 
  return (
    <div className=' md:w-[450px]'>
       <div className=''>
        <div className=' mb-10 '>
            <h1 className=' text-3xl font-bold'>Create Account</h1>
            <h1 className=' text-md text-gray-400 my-2'>Sign Up With Email And Password</h1>
        </div>
            <div>
                <Input onChange={(e)=>{setName(e.target.value)}} autoComplete='name' type='name' placeholder='name' required/>
            </div>
            <div className=' mt-2'>
                <Input onChange={(e)=>{setEmail(e.target.value)}} autoComplete='email' type='email' placeholder='email' required/>
            </div>
            <div className=' my-2'>
                <Input onChange={(e)=>{setPassword(e.target.value)}}  type='password' placeholder='password' required/>
            </div>
            <div>
                <Input onChange={(e)=>{setConfirmPassword(e.target.value)}}  type='password' placeholder='confirm password' required/>
            </div>
            <Button onClick={handleSubmit} disabled={isDisable} className=' w-full my-2'>Sign Up</Button>
            <div className=' flex justify-center'>
                <h1 className=' text-gray-400'>Already have an account?</h1>
                <a href="/auth/login" className=' font-semibold mx-2'>Sign In</a>
            </div>
       </div> 
    </div>
  )
}
