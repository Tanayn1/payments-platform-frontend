'use server'

import { cookies } from "next/headers";


export async function fetchStores() {
    try {
        const token = cookies().get('Token')?.value;
        const stores = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stores/getstores`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await stores.json()
        return data
    } catch (error) {
        console.log(error)
    }

}

export async function checkUser() {
    try {
        const token = cookies().get('Token')?.value;
        console.log(token)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
       })
        const user = await response.json()
        if (user.error) {
            console.log('there is error')
            return {redirect: '/auth/login'}
        } else {
            return {message: 'Success'}
        }
    } catch (error) {
        console.log(error)
        return {redirect: '/auth/login'}
    }
}