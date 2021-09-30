import React from 'react'
import NextLink from 'next/link'
import { Grid,Box,Image,Text,Link} from "@chakra-ui/react"
import Moment from 'react-moment';
import { useRouter } from 'next/router'

const UserStoreList = ({stores}) => {
    const router = useRouter()
    const {keyword}=router.query
    return (
        <>
        {
            stores.length < 1 ?        
            <Box  my={4} height="300px" display="flex" justifyContent="center" alignItems="center">
                {
                keyword ? 
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize="17px" > No record for </Text>
                    <Text fontSize="20px" fontWeight="bold">"{keyword}"</Text>
                    <NextLink href={`/user/mystores?id=1&sortOrder=storeName&keyword=`} passHref={true}>
                        <Link color="messenger.400" fontWeight="bold">Go back</Link> 
                    </NextLink>
                </Box>
                :
                <Text fontSize="20px" fontWeight="bold">No Record</Text>
                }
            </Box> 
            :
            <Grid  templateColumns={[ "repeat(1, 1fr)", "repeat(1, 1fr)","repeat(2, 1fr)", "repeat(3, 1fr)" ]} gap={3}  px={[1,1,0]} my={5}>
            {stores?.map(i=>(
            <NextLink key={i.id} href={`/stores/info/${i.id}`} passHref={true}>
                <Box maxW="400px" h={["320px" ,"320px" ,"350px","350px","350px","400px"]} borderWidth="1px" overflow="hidden" as="a" bg="white"  _hover={{color:"#FC8E00" }} boxShadow="md" borderRadius={5}>
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

        }
        
        </>
    )
}

export default UserStoreList
