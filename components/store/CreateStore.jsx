import React from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import StoreForm from './StoreForm';
import Cookies from 'js-cookie';
import StoreImage from './StoreImage';
const CREATESTORE = gql`
mutation ($storeName:String!,$storeAddress:String!,$storeDescription:String!,$storeType:String!,$socialMediaAcc:String!,$contactNumber:String!){
    createStore(storeName:$storeName,storeAddress:$storeAddress,storeDescription:$storeDescription,storeType:$storeType,socialMediaAcc:$socialMediaAcc,contactNumber:$contactNumber){
      id
    storeName
    storeBackgroundImage
    }
  }
`;
const CreateStore = () => {
    const [createstore,{data, loading,error }] = useMutation(CREATESTORE,{ errorPolicy: 'all' });
    console.log(data?.createStore.id)
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber}) => {
     const {data}= await createstore({variables:{storeName:storeName,storeAddress:storeAddress,storeDescription:storeDescription,storeType:storeType,socialMediaAcc:socialMediaAcc,contactNumber:contactNumber},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
     if(data) console.log(data)
    };
    return (
        <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
        <StoreForm register={register} loading={loading} error={error} errors={errors}/>
        </form>
       {data && <StoreImage storeId={data?.createStore.id}/>} 
      </div>
    )
}
export default CreateStore
