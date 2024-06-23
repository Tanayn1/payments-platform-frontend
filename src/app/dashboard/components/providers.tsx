'use client'
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { checkUser } from './actions';


const StoreIdContext : any = createContext(null)

export default function Providers({ children } : Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter();
    const [storeId, setStoreId] = useState(null);
    const check = async ()=>{
        const response = await checkUser()
        if (response?.redirect) {
            router.push(response.redirect)
        }
    }

    useEffect(()=>{
        check();
    },[])
  return (
    <StoreIdContext.Provider value={{ storeId, setStoreId }}>
        <div>{children}</div>
    </StoreIdContext.Provider>
  )
}

export const useStore = () => useContext(StoreIdContext);

