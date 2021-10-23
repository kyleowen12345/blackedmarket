import React from 'react'
import NextLink from 'next/link'
import { Grid,Box,Image,Text} from "@chakra-ui/react"
import Moment from 'react-moment';
const StoreGrid = ({stores,imageLoad}) => {
    return (
        <>
        <Grid  templateColumns={[ "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)"  ]} gap={[1,2,2,2]}  px={[2,2,2,2,2,0]}>
            {stores?.map(i=>(
            <NextLink key={i.id} href={`/stores/info/${i.id}`} passHref={true}>
                <Box maxW="400px" h={["300px" ,"300px" ,"320px","340px","360px","400px"]} borderWidth="1px" overflow="hidden" as="a" bg="white"  _hover={{color:"#FC8E00" }} boxShadow="md" borderRadius={5}>
                         <Image src={i.storeBackgroundImage} alt={i.storeName} width={"100%"} height={"82%"} fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                    <Box p={[2,2,2,4]}>
                           <Box d="flex" alignItems="baseline">
                                 <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    ml="2"
                                    isTruncated
                                   >
                                   {i.storeType} 
                                 </Box>
                           </Box>

                               <Box
                                pl={2}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                               >
                               <Text lineHeight="tight" fontWeight="semibold" as="h4" maxW="200px" isTruncated fontSize={["0.85rem" ,"0.93rem","0.955rem"]}>{i.storeName}</Text>
                               <Text fontSize="12px" maxW="150px" isTruncated><Moment fromNow>{Date.parse(i.createdAt)|| i.createdAt}</Moment></Text>
                               </Box>
                </Box>
                    </Box>
            </NextLink>
            ))}
        </Grid>
        </>
    )
}

export default StoreGrid
