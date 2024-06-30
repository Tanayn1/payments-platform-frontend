'use client'
import React from 'react'
import CreateWebhook from '../components/createWebhook'
import { useStore } from '../../components/providers'

export default function Page() {
    const { storeId, setStoreId } : any = useStore();
  if (storeId) {
    return (
    <div className=' ml-[210px]'>
        <CreateWebhook storeId={storeId} />
    </div>
  )
} else {
    <div>
        <h1>loading...</h1>
    </div>
}
}
