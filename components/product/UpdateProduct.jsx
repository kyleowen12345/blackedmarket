import React from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import ProductImage from './ProductImage';
import ProductForm from './ProductForm';
import Image from 'next/image'
const UPDATEPRODUCT = gql`
mutation ($id:ID!,$productName:String!,$price:String!,$productStocks:String!,$description:String!){
    updateProduct(id:$id,productName:$productName,price:$price,productStocks:$productStocks,description:$description){
    id
    productName
    }
  }
`;

const UpdateProduct = ({product}) => {
    const [updateproduct,{data, loading,error }] = useMutation(UPDATEPRODUCT,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm({
      defaultValues:{
        productName:product.productName,
        price:product.price,
        productStocks:product.productStocks,
        description:product.description,
        
      }
    });
    const onSubmit = async({productName,price,productStocks,description}) => {
      console.log(productName,price,productStocks,description)
     const {data}= await updateproduct({variables:{id:product.id,productName:productName,price:price,productStocks:productStocks,description:description},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
     if(data) console.log(data)
    };
    console.log(data)
    return (
        <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
        <ProductForm register={register} loading={loading} error={error} errors={errors}/>
        </form>
        <Image src={product?.image} alt={product?.productName} width={200} height={200}/>
       {<ProductImage productId={product.id} storeId={product.storeName.id}/>} 
      </div>
    )
}

export default UpdateProduct
