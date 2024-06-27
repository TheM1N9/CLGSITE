import React from "react"
import Back from "../common/back/Back"
import PriceCard from "./PriceCard"
import "./price.css"
// import Faq from "./Faq"

const Pricing = () => {
  return (
    <>
      <Back title='Get the latest notification' />
      <section className='price padding'>
        <div>
          <PriceCard />
        </div>
       
      </section>
      {/* <Faq /> */}
    </>
  )
}

export default Pricing
