import React from 'react'
import NextLink from 'next/link'
import { Grid,Box,Text,Image,Badge} from "@chakra-ui/react"
const StoreLandingPage = ({stores}) => {
    return (
        <>
        <Grid  templateColumns={[ "repeat(1, auto)", "repeat(1, auto)", "repeat(2, auto)","repeat(3, auto)"  ]} gap={2}>
            {stores?.map(i=>(
            <NextLink key={i.id} href={`/stores/info/${i.id}`} passHref={true}>
                <Box maxW="400px" h={["320px" ,"320px" ,"400px"]} borderWidth="1px" overflow="hidden" justifyContent="center" alignItems="center" as="a" bg="white"  _hover={{border: "4px solid rgb(254,189,105)",color:"#FC8E00" }} boxShadow="md" >
                         <Image src={i.storeBackgroundImage} alt={i.storeName} width={"100%"} height={"82%"}/>
                    <Box p={[2,2,2,4]}>
                           <Box d="flex" alignItems="baseline">
                                <Badge borderRadius="full" px="2" colorScheme="orange">
                                   Category
                                </Badge>
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
                                mt="1"
                                pl={2}
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                                fontSize={["0.85rem" ,"0.93rem","0.955rem"]}
                               >
                               {i.storeName}
                               </Box>
                </Box>
                    </Box>
            </NextLink>
            ))}
        </Grid>
        </>
    )
}

export default StoreLandingPage
