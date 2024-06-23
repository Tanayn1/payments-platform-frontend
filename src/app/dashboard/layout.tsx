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
      <div className=' flex justify-between'>
        <div className=' fixed left-0'>
            <Sidenav />
        </div>
          {children}
          <StoreToggle />
      </div>
    </Providers>
  )
}
