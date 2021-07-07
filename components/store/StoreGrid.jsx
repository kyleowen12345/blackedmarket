import React from 'react'
import NextLink from 'next/link'
import { Grid,Box,Image,Text} from "@chakra-ui/react"
import Moment from 'react-moment';
const StoreGrid = ({stores,imageLoad}) => {
    return (
        <>
        <Grid  templateColumns={[ "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)","repeat(3, 1fr)"  ]} gap={[1,1,1,3]}  px={[1,1,0]}>
            {stores?.map(i=>(
            <NextLink key={i.id} href={`/stores/info/${i.id}`} passHref={true}>
                <Box maxW="400px" h={["320px" ,"320px" ,"400px"]} borderWidth="1px" overflow="hidden" as="a" bg="white"  _hover={{border: "4px solid rgb(254,189,105)",color:"#FC8E00" }} boxShadow="md" >
                         <Image src={i.storeBackgroundImage} alt={i.storeName} width={"100%"} height={"82%"} loading={imageLoad}/>
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
                                mt="1"
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
