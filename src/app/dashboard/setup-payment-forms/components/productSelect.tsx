'use client'
import { Button } from '@/components/ui/button'
import { ShoppingCartIcon } from 'lucide-react'
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

export default function ProductsDropdown({ storeid, setPriceObject, setProductObject  } : ProductsDropdown) {
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
            <Button className=' mt-4 h-[28px] text-xs ' variant={'outline'}>Select Product/Subscription <ShoppingCartIcon className=' h-4 w-4 ml-2'/></Button>
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


