'use client'
import { Button } from '@/components/ui/button'
import { PlusIcon, ShoppingCartIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from 'react'
import { fetchPricesServer, fetchProductsServer } from '../../products/actions'
import { PriceIdObject, ProductObject } from '@/types/types'

interface ProductsDropdown {
    storeid: string,
    setPriceObject: Function,
    setProductObject: Function

}

export default function AddExtraProducts({ storeid, setPriceObject, setProductObject  } : ProductsDropdown) {
    const [products, setProducts] = useState<any[]>([]);
    const [prices, setPrices] = useState<any>(null)
    const handleFetchProducts = async ()=>{
        try {
            const data = await fetchProductsServer(storeid);
            const array = []
            for (let index = 0; index < data.length; index++) {
                const price = await fetchPricesServer(data[index].id)
                array.push(price)
            }
            console.log(array)
            setProducts(data)
            setPrices(array)
            console.log(prices)
        } catch (error) {
            console.log(error)
        }

        
    }
    useEffect(()=>{
        handleFetchProducts()
    },[])
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button onClick={()=>{}} variant={'outline'} className=' shadow h-[28px] w-[250px] mt-3 text-gray-800 text-xs'>Add More Products <PlusIcon className=' h-3 w-3 ml-1'/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {products.map((product : ProductObject, index)=>{
                return (
                    <div>
                        <DropdownMenuLabel>{product.name}</DropdownMenuLabel>
                        {prices[index].map((price : PriceIdObject, index : number)=>{
                           return ( <DropdownMenuItem  key={index} onClick={()=>{setPriceObject(price); setProductObject(product)}}>{price.price}</DropdownMenuItem>)
                        })}
                    </div>
                )

            })}

        </DropdownMenuContent>
    </DropdownMenu>
  )
}


