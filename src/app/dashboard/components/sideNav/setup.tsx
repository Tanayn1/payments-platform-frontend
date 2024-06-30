import { XIcon } from 'lucide-react'
import React from 'react'

interface Setup {
    isShow: boolean,
    setIsShow: Function
}

export default function Setup({isShow, setIsShow} : Setup) {
  return (
    <div className=' relative z-50'>
        {isShow && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 z-40"></div>
        )}
        <aside className={`fixed inset-y-0 left-0 transform ${isShow ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white shadow-2xl rounded-r-lg w-[490px] z-50`}>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='m-7 text-lg font-semibold'>Set Up</h1>
                </div>
                <div>
                    <button className='m-7' onClick={() => { setIsShow(false) }}>
                        <XIcon className='h-4 w-4' />
                    </button> 
                </div>
            </div>
            <div className='border border-gray-200'></div>
            <div className='flex flex-col my-3'>
                <a href="/dashboard/setup-payment-forms" className='hover:bg-slate-50 mx-2 rounded-lg p-2 text-sm'>
                    <div>
                        <h1 className='font-medium'>Create Payment Link</h1>
                        <p className='text-gray-400 text-xs'>Create a no code payment link for your customers</p>
                    </div>
                </a>
                <a href="/dashboard/developers" className='hover:bg-slate-50 mx-2 rounded-lg p-2 text-sm'>
                    <div>
                        <h1 className='font-medium'>Developers</h1>
                        <p className='text-gray-400 text-xs'>Integrate payments into your application</p>
                    </div>
                </a>
                <a href="" className='hover:bg-slate-50 mx-2 rounded-lg p-2 text-sm'>
                    <div>
                        <h1 className='font-medium'>No-code setup</h1>
                        <p className='text-gray-400 text-xs'>Set up payments into your app without code</p>
                    </div>
                </a>
            </div>
        </aside>
    </div>
  )
}
