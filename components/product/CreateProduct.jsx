import React from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import ProductForm from './ProductForm';
import ProductImage from './ProductImage';
import { useRouter } from "next/router"
const CREATEPRODUCT = gql`
mutation ($productName:String!,$price:String!,$productStocks:String!,$description:String!,$storeName:ID!){
    createProduct(productName:$productName,price:$price,productStocks:$productStocks,description:$description,storeName:$storeName){
      id
      image
      price
      productName
      
    }
  }
`;

const CreateProduct = () => {
  const router = useRouter()
  const {id}= router.query
    const [createproduct,{data, loading,error }] = useMutation(CREATEPRODUCT,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({productName,price,productStocks,description}) => {
        const {data}= await createproduct({variables:{productName:productName,price:price,productStocks:productStocks,description:description,storeName:id},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
        if(data) console.log(data)
       };
       console.log(id)
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ProductForm register={register} loading={loading} error={error}/>
            </form>
            {data && <ProductImage productId={data?.createProduct.id} storeId={id}/>}
        </div>
    )
}

export default CreateProduct
