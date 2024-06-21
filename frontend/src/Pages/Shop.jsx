import React from 'react'
import Hero from '../Components/Hero/Hero'
import { Popular } from '../Components/Popular.jsx/Popular'
import Newc from '../Components/NewC/Newc'

const Shop = () => {
  return (
    <div className="shop">
        <Hero />
        <Popular />
        <Newc />
    </div>
  )
}

export default Shop