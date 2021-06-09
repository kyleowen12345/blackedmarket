import React from 'react'
import { useForm } from 'react-hook-form';
import {
    Container,
    Button,
    Input,
    Form
  } from "@chakra-ui/react"
  import { Search2Icon } from '@chakra-ui/icons'
  import { useRouter } from 'next/router'
import SubMenu from './SubMenu';

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
         <form onSubmit={handleSubmit(onSubmit)} className="searchInput">
         <SubMenu/>
         <Container display="flex" alignItems="center"  bg="#ffffff" borderRadius="md" w={width} height="30px" p={0}>
            <Input bg="#ffffff" border="none"  focusBorderColor="none" height="1.8em" autoComplete="off" pl={1} pr={0}
            {...register('product', {
             required: 'this is a required',
           })}
            />
                <Button type="submit" variant="link" bg="#FEBD69" height="30px" borderRadius={0} borderRightRadius="5px"><Search2Icon color="#000000" /></Button>
                </Container>
         </form>
        </>
    )
}

export default SearchInput
