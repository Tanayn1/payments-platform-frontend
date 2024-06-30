'use client'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import Products from './components/products'
import { useStore } from '../components/providers'

export default function Page() {
  const {storeId, setStore} : any = useStore()
  if( storeId) {return (
    <div className=' ml-[210px] '>
        <div className=''>
            <Products/>
        </div>
    </div>
  )} else {
    return (
      <div className=' flex justify-center h-screen items-center'>
        <h1>Loading</h1>
      </div>
    )
  }
}
