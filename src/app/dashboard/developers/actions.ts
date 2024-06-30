'use server'
import { cookies } from "next/headers";


export async function createWebhook(events: Array<string>, webhookUrl : string, storeID: string, ) {
    try {
        const body = JSON.stringify({
                webhookUrl: webhookUrl,              
                events: events,
                storeId: storeID
        })
        const token = cookies().get('Token')?.value;
        const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/webhooks/createWebhook`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body

        });
        const data = await response.json()
    } catch (error) {
        console.log(error)
    }
}

export async function fetchWebhooks(storeId: string) {
    try {
        const token = cookies().get('Token')?.value;
        const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/webhooks/fetchWebhooks/${storeId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.webhooks
    } catch (error) {
        console.log(error)
    }
}