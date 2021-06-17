import React from 'react'
import { useForm } from 'react-hook-form';
import {
    Container,
    Button,
    Input,
    FormControl
  } from "@chakra-ui/react"
  import { Search2Icon } from '@chakra-ui/icons'
  import { useRouter } from 'next/router'
import SubMenu from './SubMenu';

const SearchInput = ({width}) => {
    const router = useRouter()
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({search}) => {
            if(search){
            return  router.push(`/products/search/${search}?id=1`)
            }else{
              return
            }
    };
    return (
        <>
         <Container display="flex" alignItems="center"  bg="#ffffff" borderRadius="md" w={width} height="30px" p={0}  >
         <SubMenu/>
         <FormControl onSubmit={handleSubmit(onSubmit)} display="flex" as="form">
         <Input bg="#ffffff" border="none"  focusBorderColor="none" height="1.8em" autoComplete="off" pl={1} pr={0} {...register('search', {required: 'this is required',})}/>
                <Button  variant="link" bg="#FEBD69" height="30px" borderRadius={0} borderRightRadius="5px" type="submit"><Search2Icon color="#000000" /></Button>
         </FormControl>
                </Container>
        </>
    )
}

export default SearchInput
