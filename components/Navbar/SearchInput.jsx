import React, { useState } from 'react'
import {
    Container,
    Button,
    Input,
  } from "@chakra-ui/react"
  import { Search2Icon } from '@chakra-ui/icons'
  import { useRouter } from 'next/router'
import SubMenu from './SubMenu';

const SearchInput = ({width}) => {
    const router = useRouter()
    const [search,setSearch]=useState("")
    const onSubmit = async() => {
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
            <Input bg="#ffffff" border="none"  focusBorderColor="none" height="1.8em" autoComplete="off" pl={1} pr={0} onChange={(e)=>setSearch(e.target.value)}/>
                <Button onClick={onSubmit} variant="link" bg="#FEBD69" height="30px" borderRadius={0} borderRightRadius="5px"><Search2Icon color="#000000" /></Button>
                </Container>
        </>
    )
}

export default SearchInput
