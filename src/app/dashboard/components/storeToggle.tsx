'use client'
import { ComboboxDemo } from '@/components/combobox'
import { Switch } from '@/components/ui/switch'
import React, { useEffect, useState } from 'react'
import { useStore, useTestMode } from './providers'
import { fetchStores } from './actions'
import { Settings } from 'lucide-react'

//THIS NEEDS TO BE CHANGED TO FACILITATE SWITCHING STORES RN ITS [0] EVERYTHING

export default function StoreToggle() {
    const { storeId, setStoreId } : any = useStore()
    const { isTestMode, setIsTestMode } : any = useTestMode()
    const [ storeName, setStoreName] = useState<null | string>(null)
    const [stores, setStores] = useState<any>(null)
    const handleSetStore = async ()=>{
        try {
            if (storeId === null) {
                const data = await fetchStores();
                setStoreId(data[0].id)
                setIsTestMode(data[0].testmode)
                setStores(data)
                setStoreName(data[0].name)

            } 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        handleSetStore();
    },[])
  return (
    <div className=' fixed top-0 right-0 m-5 flex items-center gap-3'>
        <div className=' flex items-center'>
            <h1 className=' mr-2 text-sm'> Test Mode </h1>
            <Switch defaultChecked disabled className=' focus:outline-none focus:border-none ' />
        </div>
        <div>
            <ComboboxDemo store={storeName} stores={stores} setStore={(value : string)=>{setStoreId(value)}}/>
        </div>
        <div>
            <a href="/dashboard/settings">
                <Settings className=' h-4 w-4'/>
            </a>
        </div>
    </div>
  )
}
