import React from 'react'
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Input,
    FormControl
  } from "@chakra-ui/react"
  import { Search2Icon } from '@chakra-ui/icons'
  import { useRouter } from 'next/router'

const FollowingSearch = () => {
    const router = useRouter()
    const {keyword}= router.query
    const { register, formState: { errors } , handleSubmit } = useForm({
        defaultValues:{
            search:keyword
        }
    });
    const onSubmit = async({search}) => {
            return  router.push(`/user/following?id=1&keyword=${search}`)
    };
    return (
        <Box bg="white"  height="40px" borderRadius={5} boxShadow="md" >
         <FormControl onSubmit={handleSubmit(onSubmit)} display="flex" as="form"   m={0}>
         <Input  placeholder="Search store by it's name" bg="#ffffff" border="none"  focusBorderColor="none" height="40px" autoComplete="off"  {...register('search')}/>
                <Button  variant="link"  height="40px" borderRadius={0} borderRightRadius="5px" type="submit"><Search2Icon color="#000000" /></Button>
         </FormControl>
        </Box>
    )
}

export default FollowingSearch
