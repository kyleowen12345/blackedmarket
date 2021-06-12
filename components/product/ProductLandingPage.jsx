import React from 'react'
import NextLink from 'next/link'
import { Grid,Box,Text,Image} from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'
const ProductLandingPage = ({products}) => {

    return (
        <>
        <Grid  templateColumns={[ "repeat(2, auto)", "repeat(2, auto)", "repeat(3, auto)", "repeat(4, auto)", "repeat(5, auto)" ]} gap={3} >
            {products?.map(i=>(
                <NextLink key={i.id || i._id} href={`/products/info/${i.id}`}  passHref={true}>
                    <Box maxW="230px" h={["205px" ,"245px" ,"260px"]} borderWidth="1px" overflow="hidden" justifyContent="center" alignItems="center" as="a" bg="white" _hover={{border: "3px solid rgb(254,189,105)",color:"#FC8E00" }} boxShadow="md" >
                        <Image src={i.image} alt={i.productName} width={"100%"} height={"65%"} />
                          <Box pl={2}>
                                 <Box mt="1" fontWeight="semibold"as="h4" lineHeight="tight" isTruncated >
                                      <Text fontSize={["0.75rem" ,"0.875rem",]} isTruncated>{i.productName}</Text>
                                 </Box>
                                       <Text fontSize={["0.83rem" ,"0.955rem",]} mt={[0 ,2]} mb={[0 ,1]}>$ {i.price}</Text>
                                 <Box d="flex" mt="2" alignItems="center">
                                   {Array(5)
                                     .fill("")
                                     .map((_, i) => (
                                     <StarIcon
                                      key={i}
                                      color={ "#FACA51"}
                                      boxSize={"0.7em"}
                                      />
                                     ))}
                                     <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                         <Text fontSize="10px">{i.productName.length + i.image.length} reviews</Text> 
                                     </Box>
                                 </Box>
                         </Box>
                  </Box>
                </NextLink>
            ))}
        </Grid>
        </>
    )
}

export default ProductLandingPage
