'use client'
import { Button } from '@/components/ui/button'
import CustomCheckbox from '@/components/ui/custom-checkbox'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

interface SelectEvents {
    setSelectEvents: Function,
    submitEvents: Function,
    currentEvents: Array<string>
}

const events : Array<string> = ['checkout_session_created', 'checkout_session_completed', 'payment_succeeded', 
    'payment_failed', 'subscription_created', 'subscription_canceled']

export default function SelectEvents({setSelectEvents, submitEvents, currentEvents } : SelectEvents) {
    const [addedEvents, setAddedEvents] = useState<Array<string>>([]);
    const handleAddEvent = (event: string)=>{
        if (addedEvents.includes(event)) {
            const array = [...addedEvents];
            const index = array.indexOf(event)
            array.splice(index, 1)
            setAddedEvents(array)
            return;
        } else {
            const array = [...addedEvents];
            array.push(event);
            setAddedEvents(array)
            return
        }
        
    }

    useEffect(()=>{
        setAddedEvents(currentEvents)
    },[])
  return (
    <div className=' flex'>
        <div>
            <h1 className=' text-3xl font-semibold mb-6'>Select Events</h1>
            <div className=' overflow-auto h-[200px]'>
                {events.map((event: string)=>{
                    return (
                        <CustomCheckbox label={event} 
                        checked={addedEvents.includes(event)}
                        onChange={()=>{handleAddEvent(event)}}
                        />
                    )
                })}

            </div>
                <div className=' mt-10 flex items-center gap-x-3'>
                    <Button onClick={()=>{submitEvents(addedEvents); setSelectEvents(false) }} className=' shadow-md h-[28px] text-xs'>Add Events</Button>
                    <Button onClick={()=>{setSelectEvents(false)}} variant={'outline'} className=' text-xs  h-[28px]'>Cancel</Button>
                </div>
        </div>

    </div>                
  )
}

