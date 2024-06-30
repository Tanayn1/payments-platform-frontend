'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon, Settings, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import ExtraPricing from './extraPrcing'
import { OptionsDropdown } from './optionsDropdown'
import ExtraPricingEdit from './extraPricingEdit'
import Prices from './prices'
import { createProductServer } from '../actions'
import { useStore } from '../../components/providers'

interface CreateProduct {
    isShow: boolean,
    setIsShow: Function,
    refreshProducts: Function
    //productId: string | undefined
}

interface PricingObject {
    price: number,
    billingPeriod: string | undefined | null,
    priceDescription: string | undefined | null,
    productType: string

}

export default function CreateProduct({isShow, setIsShow, refreshProducts} : CreateProduct) {
    const [name, setName] = useState<null | string>(null);
    const [description, setDescription] = useState<null | string>(null);
    const [productType, setProductType] = useState<null | string>(null);
    const [price, setPrice] = useState<null | number>(null);
    const [prices, setPrices] = useState<Array<PricingObject>>([])
    const [billingPeriod, setBillingPeriod] = useState<string>('weekly');
    const [showExtraPricing, setShowExtraPricing] = useState<boolean>(false);
    const [showExtraPricingEdit, setShowExtraPricingEdit] = useState<boolean>(false);
    const {storeId, setStore} : any = useStore()



    const fetchData = async ()=>{}

    const createProduct = async (prices: Array<PricingObject>, 
        price : null | number, description : null | string, 
        productType: null | string, billingPeriod: string, name : string,  )=>{
        if (!name && !description) return //alert
        try {
            if (prices.length === 0) {
                if (prices && description && productType) {
                    const newPricingObj : PricingObject = {
                        price: price!,
                        billingPeriod: productType === 'recurring' ? billingPeriod : null,
                        priceDescription: description,
                        productType: productType
                    }
                    const newPricingArray : Array<PricingObject> = [];
                    newPricingArray.push(newPricingObj);
                    //createprodcut

                    await createProductServer(name, description, newPricingArray, storeId);
                    closeCreateProduct();
                    refreshProducts()
                    return;
                } else {
                    //alert
                    return;
                }

            }
            //createProduct
            await createProductServer(name, description, prices, storeId);
            closeCreateProduct();
        } catch (error) {
            console.log(error);
        }
    }

    const editPrice = ( idx : number,  priceObj : PricingObject)=>{
        const array = [...prices];
        console.log(idx, priceObj)
        array[idx] = priceObj
        console.log(array)
        setPrices(array);
        console.log(prices)
        
    }

    const deletePrice = (idx: number)=>{
        const array = [...prices];
        array.splice(idx, 1)
        setPrices(array);

    }

    const closeCreateProduct = ()=>{
        //alert
        setName(null);
        setDescription(null);
        setProductType(null);
        setPrice(null);
        setPrices([]);
        setBillingPeriod('weekly');
        setShowExtraPricing(false);
        setIsShow(false)

    }

    const addPrice = (price : number, billingPeriod : string | null | undefined, priceDescription : string | undefined | null, productType : string) => {
        const priceObj = {
            price: price,
            billingPeriod: billingPeriod,
            priceDescription: priceDescription,
            productType: productType
        }

        setPrices([...prices, priceObj]);
    }

    useEffect(()=>{

    },[])
   return (
    <div>
    {isShow && (<div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40"></div>)}
        <aside className={`fixed  inset-y-0 right-0 transform ${isShow ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-white  shadow-2xl rounded-l-lg  w-[500px] z-50`}>
            <div className=' relative'>
                <div className=' fixed  top-0 right-0 '>
                    <button className=' m-7' onClick={()=>{setIsShow(false)}}><XIcon/></button>
                </div>
                <div className=' fixed left-0 top-0'>
                    <h1 className=' m-7 text-2xl font-semibold'>Create Product</h1>
                </div>
            </div>
            <div className=' border  border-gray-200 mt-20 '></div>
            <div>
                <div className=' mx-6 mt-10'>
                    <h1 className=' text-sm font-medium '>Name</h1>
                    <p className=' text-xs text-gray-500 mb-1'>Name of the product, visible to customers.</p>
                    <Input value={name !== null ? name : ''} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className=' mx-6 mt-5'>
                    <h1 className=' text-sm font-medium '>Description</h1>
                    <p className=' text-xs text-gray-500 mb-1'>Appears at checkout, on the customer portal, and in quotes.</p>
                    <Textarea value={description !== null ? description : ''} onChange={(e)=>{setDescription(e.target.value)}}/>
                </div>
                { prices.length === 0 ?
                <div>
                    <div className='mx-6 mt-6'>
                        <h1 className=' text-sm font-medium '>Product Type</h1>
                        <div className=' flex justify-center gap-3 mt-2 '>
                            <div onClick={()=>{setProductType('recurring')}} className={` ${productType === 'recurring' ? ' bg-slate-100' : '' } flex flex-col justify-center rounded-md border border-gray-200  h-[48px] hover:bg-slate-100 cursor-pointer`}> 
                                <h1 className=' text-xs font-medium px-[80px]'>Recurring</h1>
                                <p className='  text-xs text-gray-500 text-center '>Charge an ongoing fee</p>
                            </div>
                            <div onClick={()=>{setProductType('one_off')}} className={` ${productType === 'one_off' ? ' bg-slate-100' : '' } flex flex-col justify-center rounded-md border border-gray-200  h-[48px] hover:bg-slate-100 cursor-pointer`}> 
                                <h1 className=' text-xs font-medium px-[80px]'>One Off</h1>
                                <p className='  text-xs text-gray-500 text-center '>Charge a one time payment</p>
                            </div>
                        </div>
                    </div>
                    <div className=' mx-6 mt-6'>
                        <h1 className=' text-sm font-medium '>Product Price</h1>
                        <p className=' text-xs text-gray-500 mb-1'>Price of product</p>
                        <Input type='number' value={price !== null ? price : ''} onChange={(e)=>{setPrice(Number(e.target.value))}}/>  
                    </div>
                    <div className={` ${productType !== 'recurring' ? 'hidden' : ''} mx-6 mt-6`}>
                        <h1 className=' text-sm font-medium '>Billing Period</h1>
                        <p className=' text-xs text-gray-500 mb-1'>Price of product</p>
                        <select onChange={(e)=>{setBillingPeriod(e.target.value)}} name="billingPeriod" id="billingPeriod" className=' h-[28px] text-xs border border-gray-200 focus:outline-none px-3 rounded-lg w-full'>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className=' mx-2 mt-3 '>
                        <Button onClick={()=>{setShowExtraPricing(true)}} variant={'link'} className=' text-xs text-blue-600 flex items-center gap-1'><Settings className=' h-3 w-3'/> Add More Pricing</Button>
                    </div>
                </div> : 
                <div>
                    <h1 className=' text-sm font-medium mx-6 mt-6'>Pricing</h1>
                    <div className=' mx-6'>
                    {prices.map((price, idx)=>{
                        return (
                            //make this into component
                            <Prices key={idx} price={price} idx={idx} deletePrice={(value: number)=>{deletePrice(value)}} editPrice={(value: number, newPriceObj : any)=>{editPrice(value, newPriceObj)}}/>
                            /*<div key={idx} className=' my-3'>
                                <div className=' flex items-center justify-between'>
                                    <div>
                                        <h1 className=' text-xs'>${price.price}</h1>
                                        <h1 className='text-xs text-gray-500'>{price.billingPeriod === 'weekly' ? 'per week' : price.billingPeriod === 'monthly' ? 'per month' : price.billingPeriod === 'yearly' ? 'per year' : 'One off payment' }</h1>
                                    </div>
                                    <div>
                                        <OptionsDropdown setEditDelete={(index : number)=>{deletePrice(index)}} setEditShow={(value: boolean)=>{setShowExtraPricingEdit(value)}} index={idx}/>
                                    </div>
                                </div>
                                <div className=' border  border-gray-200 mt-3 '></div>
                                <ExtraPricingEdit isShow={showExtraPricingEdit} 
                                setIsShow={(value : boolean)=>{setShowExtraPricingEdit(value)}} 
                                oldBillingPeriod={prices[idx].billingPeriod} 
                                oldProductDescription={prices[idx].priceDescription} 
                                oldPrice={prices[idx].price} 
                                oldProductType={prices[idx].productType} EditPrice={(value : PricingObject)=>{}} />
                            </div>*/
                        )
                    })}
                    <Button onClick={()=>{setShowExtraPricing(true)}} variant={'outline'} className=' shadow h-[28px] w-full text-gray-800 text-xs'>Add More Prices <PlusIcon className=' h-3 w-3 ml-1'/></Button>
                    </div>

                </div>
                }
                <div className=' flex items-center justify-between mx-6 mt-7'>
                    <Button onClick={closeCreateProduct} variant={'outline'} className=' shadow h-[28px] text-xs'>Back</Button>
                    <Button onClick={()=>{createProduct(prices, price, description, productType, billingPeriod, name!)}} className=' shadow h-[28px] text-xs'>Add Product</Button>
                </div>
            </div>
            <ExtraPricing addPrice={(value : PricingObject)=>{addPrice(value.price,value.billingPeriod,value.priceDescription, value.productType)}} isShow={showExtraPricing} setIsShow={(value : boolean)=>{setShowExtraPricing(value)}}/> 
        </aside>
    </div>
  )
}
