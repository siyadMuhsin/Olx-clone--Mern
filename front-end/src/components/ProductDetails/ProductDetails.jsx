import React from 'react'

const ProductDetails = ({product}) => {
  return (
    <div className='bg-slate-700 w-96'>
      {product.map((x)=>{
        return <p>{x.productName}</p>
      })}
    </div>
  )
}

export default ProductDetails
