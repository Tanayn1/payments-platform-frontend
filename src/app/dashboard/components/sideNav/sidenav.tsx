'use client'
import React, { useContext, useState } from 'react'
import { getStores } from './actions';
import { useRouter } from 'next/navigation';
import { useStore } from '../providers';
import { HomeIcon, Settings2 } from 'lucide-react';
import Setup from './setup';

interface sideNav {
  setSelectedStoreId: Function
}

export default function Sidenav() {
    const router = useRouter();
    const { storeId } : any = useStore()  
    const [isShow, setIsShow] = useState<boolean>(false)
    
  return (
    <div className='  w-[200px]  h-screen'>
      <div>
        <div className=' m-5'>
          <h1>TrustFlow</h1>
        </div>
        <div className=' my-8 mt-24 flex flex-col'>
          <a href="/dashboard" className=' hover:bg-slate-50 mx-2 rounded-lg p-2 text-sm flex items-center gap-1'><HomeIcon className=' h-4 w-4'/>Home</a>
          <a href="" className=' hover:bg-slate-50 mx-2 rounded-lg p-2 text-sm'>Payments</a>
          <a href="/dashboard/products" className=' hover:bg-slate-50 mx-2 rounded-lg p-2 text-sm'>Products</a>
          <a href="" className=' hover:bg-slate-50 mx-2 rounded-lg p-2 text-sm'>Customers</a>
          <a onClick={()=>{setIsShow(true)}} className=' hover:bg-slate-50 mx-2 rounded-lg p-2 text-sm flex items-center gap-1'><Settings2 className=' h-4 w-4'/> setup</a>
        </div>
        <Setup isShow={isShow} setIsShow={(value: boolean)=>{setIsShow(value)}}/>
      </div>

    </div>
  )
}
