import React, {useEffect} from 'react'
import {  gql,useQuery } from "@apollo/client";
import {Grid, Badge,Box,Text,Image} from "@chakra-ui/react"
import NextLink from 'next/link'
import Loader from '../Loader/Loader';
const TODAYSDEAL = gql`
  query {
    randomQuery{
      _id
      productName
      price
      image
      description
    }
      
    }
  
`;

const Deals = () => {
 
    const { data, error,loading,refetch  } = useQuery( TODAYSDEAL );
    useEffect(() => {
      setInterval(() => { }, 86400000)
    }, [])
    console.log(data)
    return (
      <>
      <Box >
        <Text  size="2xl" bg="white" mt={4} mb={2} p={3} fontWeight="bold" boxShadow="md"  >Today's Deals</Text>
        {loading ?<Loader/>:<Grid  templateColumns={[ "repeat(2, auto)", "repeat(2, auto)", "repeat(3, auto)", "repeat(3, auto)", "repeat(6, auto)" ]} gap={1}  bg="white" >
        {data?.randomQuery.map(i=>(
           <NextLink key={i.id || i._id} href={`/products/info/${i.id || i._id}`}  passHref={true}>
              <Box  maxW="230px" h={["205px" ,"245px" ,"260px"]} borderWidth="1px" overflow="hidden"  as="a" bg="white" _hover={{border: "3px solid rgb(254,189,105)",color:"#FC8E00" }} boxShadow="md" m={1}>
                        <Image src={i.image} alt={i.productName} width={"100%"} height={"65%"} />
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
                                  Free Shipping
                                </Badge>
                                 </Box>
                           </Box>
                    </Box>
           </NextLink>
        ))}
   </Grid>}
  </Box> 
  </>
    )
}

export default Deals
