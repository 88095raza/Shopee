import React from 'react'
import ProductsCards from './ProductsCards'

const product = ({products}) => {
  return (
    <div className='py-10'>
        <div className='flex flex-col items-center gap-4 '>
            <h1 className='text-2xl bg-black text-white py-2 w-80 text-center'> 
                daily shopping
            </h1>
            <span className='w-20 h-[3px] bg-black'></span>
            <p className='max-w-[700px] text-gray-600 text-center'>Eu consectetur occaecat magna ipsum deserunt aliqua
                 nulla aute do deserunt.Eu consectetur occaecat magna ipsum deserunt aliqua
                 nulla aute do deseruntEu consectetur occaecat magna ipsum deserunt aliqua
                 nulla aute do deserunt</p>
        </div>
        <div className='max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10'>
            {products.map ((item)=>(
              <ProductsCards key={item._id} product={item}/>
            ))}
        </div>
    </div>
  )
}

export default product