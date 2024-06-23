import Banner1 from '@/components/landingpage/banner1'
import Banner2 from '@/components/landingpage/banner2'
import Banner3 from '@/components/landingpage/banner3'
import Footer from '@/components/landingpage/footer'
import Hero from '@/components/landingpage/hero'
import Nav from '@/components/landingpage/nav'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <Banner1/>
      <Banner2/>
      <Banner3/>
      <Footer/>
    </div>
  )
}
