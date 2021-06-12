import React from 'react'
import NextLink from 'next/link'
import { Grid,Box,Text,Image} from "@chakra-ui/react"
const StoreLandingPage = ({stores}) => {
    return (
        <>
        <Grid  templateColumns={[ "repeat(1, auto)", "repeat(1, auto)", "repeat(2, auto)","repeat(3, auto)"  ]} gap={2}>
            {stores?.map(i=>(
            <NextLink key={i.id} href={`/stores/info/${i.id}`} passHref={true}>
                <Box maxW="400px" h={["320px" ,"320px" ,"400px"]} borderWidth="1px" overflow="hidden" justifyContent="center" alignItems="center" as="a" bg="white"  _hover={{border: "4px solid rgb(254,189,105)",color:"#FC8E00" }} boxShadow="md" >
                         <Image src={i.storeBackgroundImage} alt={i.storeName} width={"100%"} height={"82%"}/>
                    <Box display="flex" flexDirection="column" alignItems="center" mt={[2,2,3]} >
                         <Text  fontSize={["0.83rem" ,"0.955rem",]} isTruncated>{i.storeName}</Text>
                         <Text fontWeight="bold" fontSize={["0.83rem" ,"0.955rem",]}>{i.storeType}</Text>
                    </Box>
                </Box>
            </NextLink>
            ))}
        </Grid>
        </>
    )
}

export default StoreLandingPage
