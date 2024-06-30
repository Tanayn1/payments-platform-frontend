'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import SelectEvents from './selectEvents'
import { createWebhook } from '../actions'
import { useRouter } from 'next/navigation'

interface CreateWebhook {
    storeId: string
}

export default function CreateWebhook({ storeId } : CreateWebhook) {
    const [webhookUrl, setWebhookUrl] = useState<null | string>(null);
    const [events, setEvents] = useState<Array<string>>([]);
    const [selectEvents, setSelectEvents] = useState<boolean>(false);
    const router = useRouter()

    const handleSubmit = async ()=>{
        if (events.length === 0) {
            //change alert
            alert('Please select events ')
            return;
        }
        if (webhookUrl === null) {
            alert('Please select wenhook')
            return
        }
       const response = await createWebhook(events, webhookUrl!, storeId);
       router.push('/dashboard/developers/')
    }
  return (
    <div className=' fixed inset-0 backdrop-blur-lg flex justify-center items-center  w-full h-screen overflow-auto z-50'>
        { selectEvents === false ?
        <div>
            <div>
                <h1 className=' text-3xl font-semibold'>Listen To Events</h1>
                <p className=' text-gray-500'>Follow the Docs to test webhooks in your local enviroment</p>
            </div>
            <div className=' mt-12 '>
                <div>
                    <h1 className=' text-sm font-semibold mb-2'>Webhook Url</h1>
                    <Input value={webhookUrl ? webhookUrl : ''} onChange={(e)=>{setWebhookUrl(e.target.value)}} className=' text-sm font-semibold' placeholder='Webhook Url'/>
                </div>
                <div className=' mt-6'>
                    <h1 className=' text-sm font-semibold mb-2'>Description</h1>
                    <Textarea className=' text-sm font-semibold' placeholder='Description'/>
                </div>
                { events.length === 0 ?
                <div className=' mt-4'>
                    <h1 className=' text-sm font-semibold'>Select Events</h1>
                    <Button onClick={()=>{setSelectEvents(true)}} variant={'outline'} className=' text-xs mt-2  h-[28px]'><PlusIcon className=' h-3 w-3'/>Select Events</Button>
                </div> : 
                <div className=' h-[200px] mt-7 flex flex-col items-start  overflow-auto'>
                    {events.map((event)=>{
                        return (
                            <Button variant={'outline'} className=' text-xs mt-2 my-1 w-[250px]  h-[28px]'><PlusIcon className=' h-3 w-3'/>{event}</Button>

                        )
                    })}
                    <Button onClick={()=>{setSelectEvents(true)}} variant={'link'} className=' text-xs mt-2 text-blue-500'>Change Events</Button>
                </div>
                }
                <div className=' mt-10 flex items-center gap-x-3'>
                    <Button onClick={handleSubmit} className=' shadow-md h-[28px] text-xs'>Create Webhook</Button>
                    <Button onClick={()=>{router.push('/dashboard/developers/')}} variant={'outline'} className=' text-xs  h-[28px]'>Cancel</Button>
                </div>
            </div>
        </div> : <SelectEvents currentEvents={events} submitEvents={(value: Array<string>)=>{setEvents(value)}} 
        setSelectEvents={(value: boolean)=>{setSelectEvents(value)}}/>
        }
    </div>
  )
}
