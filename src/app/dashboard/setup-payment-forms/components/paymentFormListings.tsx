import React, { useEffect, useState } from 'react'
import { fetchPaymentForms } from '../actions'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PaymentFormListings({storeId} : any) {
    const [paymentForms, setPaymentForms] = useState<null | Array<any>>(null);
    const fetchData = async ()=>{
        const data = await fetchPaymentForms(storeId)
        setPaymentForms(data)
    }

    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div>
         { paymentForms === null || paymentForms && paymentForms.length === 0 ? <div className='flex justify-center items-center h-screen' >
        <div className=''>
          <h1 className=' text-3xl font-semibold'>Create Payment Forms With Ease</h1>
          <h1 className=' my-1 text-sm text-gray-400'>Offer Subscriptions, products or donations. With our customisable payment form.</h1>
          <Link href={'/dashboard/setup-payment-forms/createForm'}>
            <Button className=' my-2'> <PlusIcon className=' h-4 w-4 mr-2'/> Create Form</Button>
          </Link>
        </div>
    </div> : 
    <div className=' ml-[210px] '>
        <div className=' mt-24'>
            <div className=' flex justify-between items-center  mx-6'>
                <h1 className=' text-xl font-medium'>Payment Forms</h1>
                <Link href={'/dashboard/setup-payment-forms/createForm'}>
                    <Button className=' h-[28px] shadow'> <PlusIcon className=' h-3 w-3 mr-1'/> Create</Button>
                </Link>
            </div>
            <div className=' border mt-6  border-gray-200 mx-6'></div>
            <Table className=''>
                <TableHeader className=' '>
                    <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paymentForms.map((paymentForm)=>{
                        return (
                            <TableRow className=''>
                                <TableCell className="font-medium">{paymentForm.productIds[0].name}</TableCell>
                                <TableCell>{paymentForm.amount} {paymentForm.pricesIds[0].priceType}</TableCell>
                                <TableCell>{paymentForm.createdAt}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </div>
    </div>
    }
        
    </div>
  )
}
