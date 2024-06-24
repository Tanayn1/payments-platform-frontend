'use server'

import { cookies } from "next/headers";

export async function fetchProducts() {
    try {
        const token = cookies().get('Token')?.value;
        const response  = await fetch('', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        if (response.ok) {
            const products  = await response.json();
            console.log(products)
            return products
        } else {
            return {error: 'Internal Server Error', message: response}
        }

    } catch (error) {
        console.log(error)
        return {error: 'Internal Server Error', message: error}

    }
}