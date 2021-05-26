import React from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import StoreForm from './StoreForm';
import Cookies from 'js-cookie';
import StoreImage from './StoreImage';
import Image from 'next/image'
const UPDATESTORE = gql`
mutation ($id:ID!,$storeName:String!,$storeAddress:String!,$storeDescription:String!,$storeType:String!,$socialMediaAcc:String!,$contactNumber:String!){
  updateStore(id:$id,storeName:$storeName,storeAddress:$storeAddress,storeDescription:$storeDescription,storeType:$storeType,socialMediaAcc:$socialMediaAcc,contactNumber:$contactNumber){
      id
    storeName
    storeBackgroundImage
    }
  }
`;

const UpdateStore = ({store}) => {
    const [updateStore,{data, loading,error }] = useMutation(UPDATESTORE,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm({
      defaultValues:{
        storeName:store.storeName,
        storeAddress:store.storeAddress,
        storeDescription:store.storeDescription,
        storeType:store.storeType,
        socialMediaAcc:store.socialMediaAcc,
        contactNumber:store.contactNumber
      }
    });
    const onSubmit = async({storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber}) => {
      console.log(storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber)
     const {data}= await updateStore({variables:{id:store.id,storeName:storeName,storeAddress:storeAddress,storeDescription:storeDescription,storeType:storeType,socialMediaAcc:socialMediaAcc,contactNumber:contactNumber},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
     if(data) console.log(data)
    };
    console.log(data)
    return (
        <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
        <StoreForm register={register} loading={loading} error={error} errors={errors}/>
        </form>
        <Image src={store?.storeBackgroundImage} alt={store?.storeName} width={200} height={200}/>
       {<StoreImage storeId={store.id}/>} 
      </div>
    )
}

export default UpdateStore
