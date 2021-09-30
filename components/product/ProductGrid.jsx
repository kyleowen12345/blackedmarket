import React from 'react'
import NextLink from 'next/link'
import { Grid,Box,Text,Image} from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'
const ProductGrid = ({products,imageLoad}) => {

    return (
        <>
        <Grid  templateColumns={[ "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)", "repeat(5, 1fr)" ]} gap={[1,1,1,2]}  px={[2,2,2,2,2,0]}>
            {products?.map(i=>(
                <NextLink key={i.id || i._id} href={`/products/info/${i.id}`}  passHref={true}>
                    <Box maxW="230px" h={["220px" ,"230px" ,"230px","230px", "260px"]} borderWidth="1px" overflow="hidden"  as="a" bg="white" _hover={{color:"#FC8E00" }} boxShadow="md" borderRadius={5}>
                        <Image src={i.image} alt={i.productName} width={"100%"} height={"65%"}  fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                          <Box pl={[1,1,1,1,2]}>
                                 <Box mt="1" fontWeight="semibold"as="h4" lineHeight="tight" isTruncated >
                                      <Text fontSize={["0.75rem" ,"0.875rem",]} isTruncated>{i.productName}</Text>
                                 </Box>
                                       <Text fontSize={["0.83rem" ,"0.955rem",]} mt={[0 ,2]} mb={[0 ,1]}>$ {i.price}</Text>
                                 <Box d="flex" mt="2" alignItems="center" maxW="180px" isTruncated>
                                   {Array(5)
                                     .fill("")
                                     .map((_, i) => (
                                     <StarIcon
                                      key={i}
                                      color={ "#FACA51"}
                                      boxSize={"0.7em"}
                                      />
                                     ))}
                                     <Box as="span" ml="2" mr={1} color="gray.600" fontSize="sm">
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

export default ProductGrid
