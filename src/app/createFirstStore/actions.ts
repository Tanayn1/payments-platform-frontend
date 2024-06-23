'use server'

import { cookies } from "next/headers";

export async function createStore(name : string, currency : string) {
    try {
        const token = cookies().get('Token')?.value;
        const body = JSON.stringify({
            name: name,
            currency: currency,

        })
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stores/createStore`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: body
        })
        console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stores/createStore`)
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return { redirect: '/dashboard', storeId: data.storeId }
        }
    } catch (error) {
        console.log(error)
    }
}