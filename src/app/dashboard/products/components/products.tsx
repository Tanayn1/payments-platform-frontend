'use client'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CreateProduct from './createProduct';
import { fetchPricesServer, fetchProductsServer } from '../actions';
import { useStore } from '../../components/providers';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OptionsDropdown } from './optionsDropdown';

export default function Products() {
    const [products, setProducts] = useState<Array<any>>([]);
    const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false);
    const {storeId, setStore} : any = useStore()

    const fetchProducts = async ()=>{
        try {
            console.log(storeId)
            if (storeId === null) {
                alert('no storeid')
            }
            const data : any = await fetchProductsServer(storeId);
            if (!Array.isArray(data)) {
                console.error('Data is not an array:', data);
                return;
            }
            if (data.length === 0) {
                return
            }
            console.log(data)
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
        <div className=' flex items-center  mt-24 mx-6 '>
            <h1 className=' text-3xl font-semibold'>Products</h1>
            <Button onClick={()=>{setShowCreateProduct(true)}} className=' fixed right-0 mx-6 shadow text-xs h-[25px] '>New Product <PlusIcon className=' ml-2 h-3 w-3 '/></Button>
            <CreateProduct refreshProducts={()=>{fetchProducts()}} isShow={showCreateProduct} setIsShow={(value: boolean)=>{setShowCreateProduct(value)}}/>
        </div>
            <div className=' border mt-14  border-gray-200 mx-6'></div>
            {products.length === 0 ? 
            <div className=' flex justify-center items-center mt-40'>
                <div className=' flex flex-col items-center'>
                    <h1 className=' text-xl font-semibold text-center'>First Product</h1>
                    <p className=' text-sm text-gray-400 text-center'>Create your first product within seconds and start making sales</p>
                    <Button onClick={()=>{setShowCreateProduct(true)}} className=' shadow-md px-10 h-[30px] text-sm text-center mt-4  '>New Product <PlusIcon className=' ml-2 h-3 w-3 '/></Button>
                </div>
            </div> 
            : <div className=' mx-6'>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="">Status</TableHead>
                    </TableRow>
                </TableHeader>
      <TableBody>
                    {products.map((product : any) => {
                        return (
                            <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell> prices</TableCell>
                            <TableCell>{product.createdAt}</TableCell>
                            <TableCell className="">Published</TableCell>
                          </TableRow> 
                        )
                    })} 

    </TableBody>
                </Table>

            </div>}




    </div>
  )
} 





