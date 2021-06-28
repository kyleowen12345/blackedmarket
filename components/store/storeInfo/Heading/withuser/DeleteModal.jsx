import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../../../../lib/auth';
import { useRouter } from "next/router"
import { AiFillDelete } from "react-icons/ai"
import { Icon,Button,AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,AlertDialogCloseButton  } from "@chakra-ui/react"

const DeleteModal = ({store}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const {authToken}=useAuth()
    const router = useRouter()
    return (
        <>
             <Button bg="transparent" fontSize="14px" borderRadius="none" color="white" border="1px solid white" width="100%" _hover={{bg:"transparent"}}  onClick={() => setIsOpen(true)}>
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
              Delete 
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure to delete {store.storeName} ? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} mr={2}>
                Cancel
              </Button>
              <Button colorScheme="red" >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </>
    )
}

export default DeleteModal
