import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';
import { useRouter } from "next/router"
import { AiFillDelete } from "react-icons/ai"
import { Icon,Button,AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,AlertDialogCloseButton  } from "@chakra-ui/react"
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
        router.push(`/stores/dashboard/mystore/${storeId}`) 
        onClose()
      }
        
    }
    
    return (
        <>
         <Button borderRadius={0} colorScheme="red" fontSize={["13px","13px","18px"]}  width={["120px","120px","180px"]} mr={[5,5,0]}  onClick={() => setIsOpen(true)}>
         <Icon as={AiFillDelete} color="white" mr={2}/> Delete 
        </Button>
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {productName}
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onSubmit} ml={3} isLoading={loading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        
        {/* {error && <p>{error?.message}</p>} */}
</>
    )
}

export default DeleteProduct
