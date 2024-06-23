'use client'
import { ComboboxDemo } from '@/components/combobox'
import { Switch } from '@/components/ui/switch'
import React, { useEffect, useState } from 'react'
import { useStore } from './providers'
import { fetchStores } from './actions'

export default function StoreToggle() {
    const { storeId, setStoreId } : any = useStore()
    const [ storeName, setStoreName] = useState<null | string>(null)
    const [stores, setStores] = useState<any>(null)
    const handleSetStore = async ()=>{
        try {
            if (storeId === null) {
                const data = await fetchStores();
                setStoreId(data[0].id)
                console.log(data)
                setStores(data)
                setStoreName(data[0].name)
                console.log(data[0].name, storeName)


            } 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        handleSetStore();
    },[])
  return (
    <div className=' m-5 flex items-center gap-3'>
        <div className=' flex'>
            <h1 className=' mr-2'> Test Mode </h1>
            <Switch defaultChecked disabled className=' focus:outline-none focus:border-none' />
        </div>
        <div>
            <ComboboxDemo store={storeName} stores={stores} setStore={(value : string)=>{setStoreId(value)}}/>
        </div>
    </div>
  )
}
