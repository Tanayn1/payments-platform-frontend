'use server'
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function signUp(name : string ,email : string, password : string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: name, email: email, password: password})
        });
        const parsedRes = await response.json();
        console.log(parsedRes)
        if (!response.ok) return {error: ''};
        const setCookieHeader = response.headers.get('Set-Cookie');
        if (setCookieHeader) {
            const token = setCookieHeader.split(';')[0].split('=')[1];
            cookies().set({
                name: 'Token',
                value: token,
                secure: true,
                httpOnly: true,
            })
            return { redirect: '/createFirstStore' }
        }
    } catch (error) {
        console.log(error)
    }
}

export async function logIn(email : string, password : string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        });
        const parsedRes = await response.json();
        console.log(parsedRes)
        if (!response.ok) return {error: ''};
        const setCookieHeader = response.headers.get('Set-Cookie');
        if (setCookieHeader) {
            const token = setCookieHeader.split(';')[0].split('=')[1];
            cookies().set({
                name: 'Token',
                value: token,
                secure: true,
                httpOnly: true,
            })
        }

        const token = cookies().get('Token')?.value;
        const stores = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stores/getstores`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await stores.json()
        console.log(data)
        if (!data || data.length === 0) {
            return { redirect: '/createFirstStore' }
        }

        return {redirect: '/dashboard'}

    } catch (error) {
        console.log(error)
    }
}