'use client'
import { ComboboxDemo } from '@/components/combobox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, PlusIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiSecurePaymentLine } from "react-icons/ri";
import PaymentFormPreview from './paymentFormPreview'
import AfterPaymentSettings from './afterPaymentSettings'
import { useStore } from '../../components/providers'
import ProductsDropdown from './productSelect'
import { PriceIdObject, PricingObject, ProductObject } from '@/types/types'
import SelectedProducts from './selectedProducts'
import AddExtraProducts from './addExtraProducts'
import { createPaymentForm } from '../actions'
import { useRouter } from 'next/navigation'


export default function CreateForm() {
  const [selectedProduct, setSelectedProduct] = useState<Array<ProductObject>>([]);
  const [pageStatus, setPageStatus] = useState<string>('paymentPage')
  const [freeTrial, setFreeTrial] = useState<boolean>(false);
  const [trialLength, setTrialLength] = useState<number>(0);
  const [collectBilling, setCollectBilling] = useState<boolean>(false); 
  const [requirePhone, setRequirePhone] = useState<boolean>(false);
  const [customiseSubmit, setCustomiseSubmit] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<PriceIdObject>>([]);
  const [successUrl, setSuccessUrl] = useState<null | string>(null);
  const [cancelUrl, setCancelUrl] = useState<null | string>(null);
  const router = useRouter();
  const {storeId, setStore} : any = useStore()

  const addPrice = (pricingObject : PriceIdObject)=>{
    if (selected.length > 0 && selected[0].priceType !== pricingObject.priceType) {
      alert('price type can not be different in one payment form')
      return
    }
    if (selected.length > 0 && selected[0].billingPeriod !== pricingObject.billingPeriod) {
      alert('billing periods cannot be different')
      return
    }
    const array = [...selected];
    array.push(pricingObject);
    setSelected(array)
  }
  const addProduct = (productObject : ProductObject )=>{
    const array = [...selectedProduct];
    array.push(productObject);
    setSelectedProduct(array)
  }

  const handleCreateForm = async ()=>{
    try {
      if (selectedProduct.length === 0 && selected.length === 0) {
        //alert
        alert('no products')
        return
      }
      if (!successUrl || !cancelUrl) {
        alert('no urls')
        return 
      } ;
      await createPaymentForm(storeId, trialLength, collectBilling, requirePhone, selected, 
        selectedProduct, successUrl, cancelUrl  )
      router.push('/dashboard/setup-payment-forms/')
    } catch (error) {
      console.log(error)
    }


  }
  

  if (storeId) {return (
    <div className=' fixed inset-0 backdrop-blur-lg flex justify-center items-center  w-full h-screen overflow-auto z-50'>
        <div className=' fixed flex items-center top-0 left-0 m-7'>
            <Link href={'/dashboard/setup-payment-forms'}>
                 <ArrowLeft/>
            </Link>
            <h1 className=' ml-3 text-sm font-semibold'>Create Payment Form</h1>
        </div>
        <div className=' fixed top-0 right-0 m-7'>
          <Button onClick={handleCreateForm} className=' h-6 text-xs'>Create Payment Page <RiSecurePaymentLine className=' ml-1 h-4 w-4' /></Button>
        </div>
        <div className=' flex items-center'>
            <div className=' mt-24'>
                <Tabs defaultValue="paymentPage"  className="w-[400px] mb-5">
                  <TabsList>
                    <TabsTrigger onClick={()=>{setPageStatus('paymentPage')}} value="paymentPage">Payment Page</TabsTrigger>
                    <TabsTrigger onClick={()=>{setPageStatus('afterPayment')}} value="afterPayment">After Payment</TabsTrigger>
                  </TabsList>
                </Tabs>
                {pageStatus === 'paymentPage' 
                ? <div> 
                  { selected.length === 0 ? <div> 
                      <h1 className=' text-xl font-semibold'>Select Product</h1>
                      <ProductsDropdown setProductObject={(value : ProductObject)=>{addProduct(value)}} setPriceObject={(value : PriceIdObject)=>{addPrice(value)}} storeid={storeId}/>
                    </div> : 
                    <div>
                      <SelectedProducts Product={selectedProduct!} pricingArray={selected}/>
                      <AddExtraProducts setProductObject={(value : ProductObject)=>{addProduct(value)}} setPriceObject={(value : PriceIdObject)=>{addPrice(value)}} storeid={storeId}/>
                    </div>

                  }
                <div className=' mt-5'>
                <h1 className=' text-xl font-semibold mt-5'>Options</h1> 
                  <CustomCheckbox label={'Collect Phone Number'} checked={requirePhone} onChange={()=>{setRequirePhone(!requirePhone)}}/>
                  <CustomCheckbox label={'Collect Billing Adress'} checked={collectBilling}  onChange={()=>{setCollectBilling(!collectBilling)}}/>
                  <div>
                    <CustomCheckbox label='Free Trial' checked={freeTrial}  onChange={()=>{setFreeTrial(!freeTrial)}}/>
                      {freeTrial && 
                        <div className=' ml-10 mt-3'>
                          <h1 className=' text-xs ml-1 text-gray-500'>Length</h1>
                          <Input placeholder='30'  onChange={(e)=>{setTrialLength(Number(e.target.value))}} className=' mt-2 w-[150px] h-[30px]'/>
                        </div>
                      }                  
                  </div>
                  <h1 className=' text-xl font-semibold mt-5'>Advanced Options</h1>
                  <div>
                      <CustomCheckbox label='Custom Submit Button' checked={customiseSubmit} onChange={()=>{setCustomiseSubmit(!customiseSubmit)}}/>
                        {customiseSubmit ? 
                        <div>
                          
                        </div> 
                        : ''}
                  </div>
                </div>
                </div> : <AfterPaymentSettings cancelUrl={cancelUrl} successUrl={successUrl} 
                setCancelUrl={(value : string)=>{setCancelUrl(value)}} setSuccessUrl={(value: string)=>{setSuccessUrl(value)}}/>}
            </div>
            <div>
              <PaymentFormPreview priceObject={selected} productArray={selectedProduct}/>
            </div>
        </div>
    </div>
  )} else {
    return (
      <div className='fixed inset-0 backdrop-blur-lg flex justify-center items-center  w-full h-screen z-50'>
        <h1>loading</h1>
      </div>
    )
  }
}


const CustomCheckbox = ({ label, checked, onChange } : any) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer my-2">
      <input 
        type="checkbox" 
        className="hidden peer" 
        checked={checked} 
        onChange={onChange} 
      />
      <div className="w-5 h-5 bg-gray-300 rounded-md flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-transparent peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:outline-none">
      {checked && <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        }
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </label>
  );
};

