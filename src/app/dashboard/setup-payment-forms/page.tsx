import { Button } from '@/components/ui/button'
import { PlusIcon, PlusSquareIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen' >
        <div className=''>
          <h1 className=' text-3xl font-semibold'>Create Payment Forms With Ease</h1>
          <h1 className=' my-1 text-sm text-gray-400'>Offer Subscriptions, products or donations. With our customisable payment form.</h1>
          <Link href={'/dashboard/setup-payment-forms/createForm'}>
            <Button className=' my-2'> <PlusIcon className=' h-4 w-4 mr-2'/> Create Form</Button>
          </Link>
        </div>
    </div>
  )
}
