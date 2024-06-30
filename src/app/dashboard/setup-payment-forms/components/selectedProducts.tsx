import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PriceIdObject, ProductObject } from '@/types/types'
import Image from 'next/image'
import React from 'react'
import { ProductOptions } from './productOptions'

interface SelectedProducts {
    pricingArray: Array<PriceIdObject>,
    Product: Array<ProductObject>
}

export default function SelectedProducts({pricingArray, Product} : SelectedProducts) {
  return (
    <div>
        <h1 className=' text-xl font-semibold my-5'>Products</h1>
        <div className=' overflow-auto h-[280px] w-[270px]'>
        {
            pricingArray.map((priceObject, index)=>{
                return (
                <div key={index} className=' relative flex border border-gray-100 rounded-lg w-[250px] my-2'>

                    <div className=' m-5'>
                        <div className=' flex items-center gap-3'>
                            <div className=''>
                                { Product[index].imageUrl ? <AspectRatio ratio={16 / 9}>
                                <Image src="/" alt="Image" width={10} height={10} className="rounded-md object-cover" />
                                </AspectRatio> : <Skeleton className=' w-[40px] h-[40px]'></Skeleton>}
                            </div>
                            <div>
                                <h1 className=' font-semibold'>{Product[index].name}</h1>
                                <h1 className=' text-gray-600 text-xs'>${priceObject.price} {priceObject.currency} / {priceObject.priceType === 'recurring' ? priceObject.billingPeriod : 'One Off Payment'}</h1>
                            </div>

                        </div>
                        <div className=' flex items-center gap-1 mt-3'>
                            <Input defaultValue={1} type='number' className=' w-[50px]'/>
                            <h1 className=' text-xs'>Quantity</h1>
                        </div>
                    </div>
                    <div className=' m-4'>
                        <ProductOptions/>
                    </div>
                </div>
                )
            })
        }
        </div>
    </div>
  )
}
