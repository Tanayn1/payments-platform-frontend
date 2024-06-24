'use client'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CreateProduct from './createProduct';

export default function Products() {
    const [products, setProducts] = useState<null | any>(null);
    const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false)
    const fetchProducts = async ()=>{
        try {
            const data : any = await fetchProducts();
            if (data.length === 0) {
                return
            }
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[])
  return (
    <div>
        <div className=' flex items-center justify-between mt-24 mx-6 '>
            <h1 className=' text-3xl font-semibold'>Products</h1>
            <Button onClick={()=>{setShowCreateProduct(true)}} className=' shadow text-xs h-[25px] '>New Product <PlusIcon className=' ml-2 h-3 w-3 '/></Button>
            <CreateProduct isShow={showCreateProduct} setIsShow={(value: boolean)=>{setShowCreateProduct(value)}}/>
        </div>
            <div className=' border mt-14  border-gray-200 mx-6'></div>
            {products === null ? 
            <div className=' flex justify-center items-center mt-40'>
                <div className=' flex flex-col items-center'>
                    <h1 className=' text-xl font-semibold text-center'>First Product</h1>
                    <p className=' text-sm text-gray-400 text-center'>Create your first product within seconds and start making sales</p>
                    <Button onClick={()=>{setShowCreateProduct(true)}} className=' shadow-md px-10 h-[30px] text-sm text-center mt-4  '>New Product <PlusIcon className=' ml-2 h-3 w-3 '/></Button>
                </div>
            </div> 
            : <div></div>}
    </div>
  )
}
