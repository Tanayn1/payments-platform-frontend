'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Webhooks from './webhooks'
import { useStore, useTestMode } from '../../components/providers'

export default function TabsDev() {
    const { storeId, setStore } : any = useStore()
    const { isTestMode, setIsTestMode } : any = useTestMode()
 if (storeId) {
    return (
    <div className=' mt-4'>
        <Tabs defaultValue="overview">
            <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='api_keys'>Api Keys</TabsTrigger>
                <TabsTrigger value='webhooks'>Webhooks</TabsTrigger>
                <TabsTrigger value='events'>Events</TabsTrigger>
            </TabsList>
            <TabsContent value='overview'>
                <h1>overview</h1>
            </TabsContent>
            <TabsContent value='webhooks'>
                <Webhooks storeID={storeId} testMode={isTestMode}/>
            </TabsContent>
            <TabsContent value='api_keys'>
                <h1>api_keys</h1>
            </TabsContent>
            <TabsContent value='events'>
                <h1>events</h1>
            </TabsContent>
        </Tabs>
    </div>
  )
}
}


