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
    AlertIcon,
    Icon
  } from "@chakra-ui/react"
  import { useMutation, gql } from "@apollo/client"
import { useAuth } from '../../lib/auth'
import { GiConfirmed } from "react-icons/gi"

const CONFIRMUSER = gql`
mutation ($password:String!){
    confirmUser(password:$password){
      token
    }
  }
`

const ConfirmUser = ({setConfirmedUser}) => {
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
         
          <Button  bg={'white'} color={"#FC8E00"} border="2px solid #FC8E00" borderRadius={0}  _hover={{color: '#FC8E00',bg:"white"}} onClick={onOpen}><Icon as={GiConfirmed} color="#FC8E00" mr={3}/>Confirm</Button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Enter your password</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
               <Text fontSize="13px">Enter your password and submit, then click save changes.</Text>   
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
                <Button isLoading={loading} bg={"#FC8E00"}color={'white'} onClick={handleSubmit}>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ConfirmUser
