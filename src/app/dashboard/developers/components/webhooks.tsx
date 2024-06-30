'use client'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { fetchWebhooks } from '../actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { WebhookObject } from '@/types/types'
import { BsGlobe2 } from "react-icons/bs";
import WebhookOptions from './webhookOptions'


interface Webhooks {
    storeID: string,
    testMode: boolean
}

export default function Webhooks({ storeID, testMode } : Webhooks) {
    const [webhooks, setWebhooks] = useState<Array<WebhookObject>>([]);
    const fetchData = async ()=>{
        const data = await fetchWebhooks(storeID);
        setWebhooks(data)
    }

    useEffect(()=>{
        fetchData()
    },[])
if (testMode === true) {
    return (
        <div className=' mt-4'>
            <div className=' flex justify-between mx-6'>
                <h1 className=' text-md font-semibold'>Test Webhooks</h1>
                <Link href={'/dashboard/developers/createWebhook'}>
                    <Button variant={'outline'} className=' h-[28px] shadow text-xs'><PlusIcon className=' h-3 w-3 mr-1'/>Endpoint</Button>
                </Link>
            </div>
            <div>
                {
                    webhooks.length === 0 ? 
                        <div className=' flex flex-col items-center mt-24 ]'>
                            <h1 className=' text-lg font-semibold'>Listen To Events</h1>
                            <p className=' text-gray-400 text-xs w-[350px] mt-2 text-center'>
                                Create webhook endpoints, so that trustflow can notify your integration when asynchronous events occur
                            </p>
                            <Link href={'/dashboard/developers/createWebhook'}>
                                <Button className=' h-[28px] shadow mt-4'>Create Endpoint</Button>
                            </Link>
                        </div> 
                        : 
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="w-[100px]">Url</TableHead>
                                    <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {webhooks.map((webhook : WebhookObject )=>{
                                        return (
                                            <TableRow>
                                                <TableCell className="font-medium flex gap-2 items-center"><BsGlobe2/>{webhook.webhookUrl}</TableCell>
                                                <TableCell>Active</TableCell>
                                                    <WebhookOptions/>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>

                            {
                            }
                        </div>
                }
            </div>
        </div>
    )
  } else {
    return (
        <div>

        </div>
    )
  }
}
