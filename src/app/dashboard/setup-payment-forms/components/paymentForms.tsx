'use client'
import React, { useEffect, useState } from 'react'
import { fetchPaymentForms } from '../actions';
import { useStore } from '../../components/providers';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import PaymentFormListings from './paymentFormListings';

export default function PaymentForms() {
    const {storeId, setStore} : any = useStore()

 if (storeId) {return (
    <div>
    <PaymentFormListings storeId={storeId}/>
    </div>
  )} else {
    return (
        <div className='flex justify-center items-center h-screen'>
            <h1>loading..</h1>
        </div>
    )
  }
}
