import React from 'react'
import {Grid, Badge,Box,Text,Image} from "@chakra-ui/react"
import NextLink from 'next/link'


const Deals = ({deals}) => {
 

    return (
      <>
      <Box >
        <Text  fontSize={["13px","13px","17px"]} fontWeight="bold" bg="white" my={2} p={[3,3,3,5]} fontWeight="bold" boxShadow="md"  color="#FC8E00" >Best Seller</Text>
        <Grid  templateColumns={[ "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)" ]}  gap={[1,1,1,2]}  px={[1,1,0]}>
        {deals?.map(i=>(
           <NextLink key={i.id || i._id} href={`/products/info/${i.id || i._id}`}  passHref={true}>
              <Box  maxW="230px" h={["220px" ,"230px" ,"230px","230px", "260px"]} borderWidth="1px" overflow="hidden"  as="a" bg="white" _hover={{border: "3px solid rgb(254,189,105)",color:"#FC8E00" }} boxShadow="md" borderRadius={5}>
                        <Image src={i.image} alt={i.productName} width={"100%"} height={"65%"} loading="eager" fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                          <Box pl={2}>
                                 <Box mt="1" fontWeight="semibold"as="h4" lineHeight="tight" isTruncated >
                                      <Text fontSize={["0.75rem" ,"0.875rem",]} isTruncated>{i.productName}</Text>
                                 </Box>
                                       <Text fontSize={["0.83rem" ,"0.955rem",]} mt={[0 ,2]} mb={[0 ,1]}>$ {i.price}</Text>
                                  <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    isTruncated
                                   >
                                  <Badge borderRadius="full"  colorScheme="orange" >
                                  {i.sold} sold
                                </Badge>
                                 </Box>
                           </Box>
                    </Box>
           </NextLink>
        ))}
   </Grid>
  </Box> 
  </>
    )
}

export default Deals
