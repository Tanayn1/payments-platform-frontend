'use server'

import { cookies } from "next/headers";

export async function getStores() {
    try {
        const token = cookies().get('Token')?.value;
        const stores = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stores/getstores`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await stores.json()
        if (!data || data.length === 0) {
            return { redirect: '/dashboard/createFirstStore' }
        }
        return data
    } catch (error) {
        console.log(error)
    }
}