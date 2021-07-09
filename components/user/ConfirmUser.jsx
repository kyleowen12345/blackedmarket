import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    Text,
    Alert,
    AlertIcon
  } from "@chakra-ui/react"
  import { useMutation, gql } from "@apollo/client"
import { useAuth } from '../../lib/auth'

const CONFIRMUSER = gql`
mutation ($password:String!){
    confirmUser(password:$password){
      token
    }
  }
`

const ConfirmUser = ({setConfirmedUser,confirmedUser}) => {
    const {authToken}=useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [password,setPassword]=useState()
    const [confirmUser,{ loading,error }] = useMutation(CONFIRMUSER,{ errorPolicy: 'all' });

    const handleSubmit=async()=>{
       const {data}=  await confirmUser({variables:{password:password},context:{headers:{token:authToken || ""}}})
       if(data){
        onClose()
        setConfirmedUser(true)
       }
    }

    return (
        <>
         
          <Button  bg={"#FC8E00"}
            color={'white'}
            width={["30%","30%","30%","20%"]}
            _hover={{
            bg: '#FC8E00',
            }}
            ml={2}  onClick={onOpen}>Confirm</Button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm yourself</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
               <Text>Enter your password to make sure it is you.</Text>   
              <Input type="password" onChange={(e)=>setPassword(e.target.value)}/>
              {error && 
          <Alert status="error" w="100%" mt={3}>
            <AlertIcon />
            <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
          </Alert> 
          }
              </ModalBody>
    
              <ModalFooter>
                <Button  mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button isLoading={loading} bg={"#FC8E00"}color={'white'} onClick={handleSubmit}>Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ConfirmUser
