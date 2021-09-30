import React from 'react'
import { Box,Text,Image,Button,Link} from "@chakra-ui/react"
import NextLink from 'next/link'
import UnFollowButton from './UnFollowButton'
import { useRouter } from 'next/router'



const FollowingList = ({following}) => {
    const router = useRouter()
    const {keyword}=router.query
    return (
        <>
          {
            following?.length < 1 ? 
            <Box  my={4} height="300px" display="flex" justifyContent="center" alignItems="center" >
            {
                keyword ? 
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize="17px" > No record for </Text>
                    <Text fontSize="20px" fontWeight="bold">"{keyword}"</Text>
                    <NextLink href={`/user/following?id=1&keyword=`} passHref={true}>
                        <Link color="messenger.400" fontWeight="bold">Go back</Link> 
                    </NextLink>
                </Box>
                :
                <Text fontSize="20px" fontWeight="bold">No Record</Text>
                }
            </Box>
        :
         following?.map(i=>(
             <Box key={i.id} bg="white" my={4} boxShadow="md" borderRadius={5} mx={1}>
                      <Box mx={5} pt={3}>
                            <Box display="flex" justifyContent="space-between" my={3}>
                                   <Text fontSize="13px" fontWeight="bold">{i.storeType}</Text>
                                   <Text color="#FC8E00" fontWeight="bold">Following</Text>
                            </Box>
                            <Box display={["block","block","flex"]} justifyContent="space-between" alignItems="center" width="100%" py={5} borderY="1px solid #EFEFEF">
                               <Box display="flex" justifyContent={["space-between","space-between","left"]}  width={["100%","100%","80%","80%"]}>
                                    <Image src={i.storeBackgroundImage} alt={i.storeName} width={["150px","150px","100px"]} height={["150px","150px","100px"]} fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                                    <Box ml={10} alignItems="left" w="50%">
                                       <Text fontSize="18px" fontWeight="bold" mb={5}>{i.storeName}</Text>
                                       <Text fontSize="13px" fontWeight="bold" >{i.sellerName.name}</Text> 
                                     </Box>
                               </Box> 
                               <Box display="flex" justifyContent="space-between" alignItems="center" mt={[5,5,5,0]} >
                                      <UnFollowButton storeId={i.id}/>
                                   <NextLink href={`/stores/info/${i.id}`} passHref> 
                                      <Button as="a" fontSize="14px" ml={5} bg="white" border="1px solid gray" color="gray" _hover={{bg:"white"}} width="50%">Visit Store</Button>
                                   </NextLink> 
                               </Box>
                            </Box>
                      </Box>
              </Box>
         ))
          }  
        </>
    )
}

export default FollowingList
