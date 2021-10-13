import React, { useEffect } from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../../../lib/auth';
import { useRouter } from "next/router"
import { AiFillDelete } from "react-icons/ai"
import { Icon,Button,useToast } from "@chakra-ui/react"
import DeleteModal from "./DeleteModal"
import { STORESINFO } from '../../../../pages/stores/info/[id]';

const DELETEPRODUCT=gql`
mutation ($id:ID!){
    deleteProduct(id:$id){
      message
    }
  }
`
const DeleteProduct = ({productId,storeId,productName}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const {authToken}=useAuth()
    const router = useRouter()
    const toast = useToast()
    const [deleteproduct,{data, loading,error }] = useMutation(DELETEPRODUCT,{ errorPolicy: 'all' },);
    const onSubmit=async()=>{
      const {data:ProductData}= await deleteproduct({variables:{id:productId},context:{headers:{token:authToken || ""}},refetchQueries:[{query:STORESINFO,variables:{id:storeId}}]})
      if(ProductData) {
        router.push(`/stores/info/${storeId}`) 
        toast({
          title: `Delete successful`,
          description: "You deleted the product.",
          status:"success",
          position:"top-right",
          isClosable: true,
    })
      }
     
        
    }
     
    useEffect(async() => {
      if(error){
        toast({
          title: `Delete failed.`,
          description: `${error.message}`,
          status:"error",
          position:"top-right",
          isClosable: true,
        })
       }

      },[error]);
    
    return (
        <>
         <Button  background="red.500"  color="white" _hover={{background:"red"}} fontSize={["13px","13px","18px"]}  width={["120px","120px","140px","180px"]} mr={[5,5,0]}  onClick={() => setIsOpen(true)}>
         <Icon as={AiFillDelete} color="white" mr={2}/> Delete 
        </Button>
        <DeleteModal isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} onSubmit={onSubmit} loading={loading}/>
        </>
    )
}

export default DeleteProduct
