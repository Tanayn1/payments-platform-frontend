'use server'
import { PriceIdObject, ProductObject } from "@/types/types";
import { cookies } from "next/headers";


export async function createPaymentForm(storeId : string, trialLength: number, 
    collectBilling: boolean, collectPhoneNumber: boolean, priceIds : Array<PriceIdObject>, 
    ProductIds: Array<ProductObject>, successUrl: string, cancelUrl: string) {
    try {
        const body = JSON.stringify({
            storeId: storeId,
            trialLength: trialLength,
            collectBilling: collectBilling,
            collectPhoneNumber: collectPhoneNumber,
            ProductIds: ProductIds,
            successUrl: successUrl,
            cancelUrl: cancelUrl,
            priceIds: priceIds,
        });
        const token = cookies().get('Token')?.value;
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/createPaymentForm`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body
        });
        console.log(response)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function fetchPaymentForms(storeId: string) {
    try {
        console.log(storeId)
        const token = cookies().get('Token')?.value;
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/fetchPaymentForms/${storeId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        return data.paymentForms
    } catch (error) {  
        console.log(error)
    }
}