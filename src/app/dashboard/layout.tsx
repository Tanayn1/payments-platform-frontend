import React  from 'react'
import Sidenav from './components/sideNav/sidenav';
import StoreToggle from './components/storeToggle';
import Providers from './components/providers';


export default function dashboard_layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return (
    <Providers>
      <div className=' '>
        <div className=' fixed left-0 top-0 '>
            <Sidenav />
        </div>
        <div className=' '>
          {children}
        </div>
          <StoreToggle />
      </div>
    </Providers>
  )
}
