import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';
import { useRouter } from "next/router"
import { AiFillDelete } from "react-icons/ai"
import { Icon,Button } from "@chakra-ui/react"
import DeleteModal from "../DeleteModal/DeleteModal"
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
    const [deleteproduct,{data, loading,error }] = useMutation(DELETEPRODUCT,{ errorPolicy: 'all' },);
    const onSubmit=async()=>{
      const {data}= await deleteproduct({variables:{id:productId},context:{headers:{token:authToken || ""}}})
      if(data) {
        router.push(`/stores/info/${storeId}`) 
        onClose()
      }
        
    }
    
    return (
        <>
         <Button  colorScheme="red" fontSize={["13px","13px","18px"]}  width={["120px","120px","150px","180px"]} mr={[5,5,0]}  onClick={() => setIsOpen(true)}>
         <Icon as={AiFillDelete} color="white" mr={2}/> Delete 
        </Button>
        <DeleteModal isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} onSubmit={onSubmit} loading={loading}/>
        </>
    )
}

export default DeleteProduct
