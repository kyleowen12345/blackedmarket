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

const SearchInput = () => {
    const router = useRouter()
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({search}) => {
            if(search){
            return  router.push(`/products/search/${search}?id=1&sortOrder=productName`)
            }else{
              return
            }
    };
    return (
      
         <Container display="flex" alignItems="center"  bg="#ffffff" borderRadius="md" w={["99%","99%","99%","99%","450px","500px"]} height="40px" p={0}  >
         <SubMenu/>
         <FormControl onSubmit={handleSubmit(onSubmit)} display="flex" as="form">
         <Input bg="#ffffff" border="none"  focusBorderColor="none" height="2em" autoComplete="off" py={2} {...register('search', {required: 'this is required',})} mt={1}/>
                <Button  variant="link" bg="#FEBD69" height="40px" borderRadius={0} borderRightRadius="5px" type="submit"><Search2Icon color="#000000" /></Button>
         </FormControl>
        </Container>
    )
}

export default SearchInput
