import React from 'react'

const ProductForm = ({register,loading,error}) => {
    return (
        <>
        <label htmlFor="productName">productName</label>
        <input {...register("productName")} />
        <br/>
        <label htmlFor="price">price</label>
        <input {...register("price")} type="number"/>
        <br/>
        <label htmlFor="productStocks">productStocks</label>
        <input {...register("productStocks")} type="number"/>
        <br/>
        <label htmlFor="description">description</label>
        <input {...register("description")} />
        <br/>
        { error && <p>{error?.message}</p> }
   {loading ? <p className="p-2 text-white font-mono">Loading...</p>:<button type="submit" >Next</button>}
      </>
    )
}

export default ProductForm
