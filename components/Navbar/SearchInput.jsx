import React from 'react'
import { useForm } from 'react-hook-form';
import {
    Container,
    Button,
    Input
  } from "@chakra-ui/react"
  import { Search2Icon } from '@chakra-ui/icons'
  import { useRouter } from 'next/router'

const SearchInput = ({width}) => {
    const router = useRouter()
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({product}) => {
            if(product){
              router.push(`/products/search/${product}?id=1`)
            }
    };
    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
         <Container display="flex" alignItems="center" bg="#ffffff" borderRadius="md" w={width} height="30px">
            <Input bg="#ffffff" border="none"  focusBorderColor="none" height="1.8em" autoComplete="off"
            {...register('product', {
             required: 'this is a required',
           })}
            />
                <Button type="submit" bg="#ffffff" variant="link"  ><Search2Icon color="#000000" /></Button>
                </Container>
         </form>
        </>
    )
}

export default SearchInput
