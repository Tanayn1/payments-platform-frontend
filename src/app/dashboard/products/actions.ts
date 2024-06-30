'use server'

import { cookies } from "next/headers";
import { PricingObject } from "../../../types/types";

export async function fetchProductsServer(storeId: string) {
    try { 
        if (storeId === null ) {
            console.log('no storeid')
            return null
        }
        const token = cookies().get('Token')?.value;
        const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/getProducts/${storeId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        if (response.ok) {
            const products  = await response.json();

            return products.products
        } else {
            return {error: 'Internal Server Error', message: response}
        }

    } catch (error) {
        console.log(error)
        return {error: 'Internal Server Error', message: error}

    }
}

export async function createProductServer(name : string, description : string | null, prices : Array<PricingObject>, storeID : string) {
    try {
        const body = JSON.stringify({
            name: name,
            description: description,
            pricesArray: prices,
            storeId: storeID
        });
        const token = cookies().get('Token')?.value;
        const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/createProduct`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body
        });
        const data = await response.json();
        console.log(data);
        return
    } catch (error) {
        console.log(error)
    }
}

export async function fetchPricesServer(productId: string) {
    const token = cookies().get('Token')?.value;
    const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/getPrices/${productId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data)

    return data.data
}