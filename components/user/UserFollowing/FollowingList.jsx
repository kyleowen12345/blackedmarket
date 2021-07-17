import React from 'react'
import { Box,Text,Image,Button} from "@chakra-ui/react"
import { useMutation, gql  } from "@apollo/client";
import NextLink from 'next/link'
import {useAuth} from '../../../lib/auth'
import { FOLLOWING } from '../../../pages/user/following';
import { useRouter } from "next/router"
const UNFOLLOW = gql`
mutation ($id:ID!){
    unfollowStore(id:$id){
     token
   }
   }
`;

const FollowingList = ({following}) => {
  const {authToken}=useAuth()
  const router = useRouter()
  const {id,keyword}= router.query
  const [unfollow,{data,loading,error}] = useMutation(UNFOLLOW,{ errorPolicy: 'all'});
  const onUnFollow = async(storeId)=>{

    await unfollow({variables:{id:storeId},context:{headers:{token:authToken || ""}},
    update(cache,{data}){
     const queryResult=cache.readQuery({
       query:FOLLOWING,
       variables:{curPage:id || "1",keyword:keyword},
       context:{headers:{token:authToken||""}}
     })
     if(queryResult){
       cache.writeQuery({
        query:FOLLOWING,
        variables:{curPage:id || "1",keyword:keyword},
        context:{headers:{token:authToken||""}},
        data:{
          getFollowingStore:{
            __typename: "followPaginate",
            curPage:queryResult.getFollowingStore.curPage,
            followCount:queryResult.getFollowingStore.followCount,
            maxPage:queryResult.getFollowingStore.maxPage,
            follow:queryResult.getFollowingStore.follow.filter(i=>i.id !== storeId)
          }
        }
       })
     }
    }})
  }
    return (
        <>
          {
            following?.length < 1 ? <Box bg="white" my={4} height="100%" display="flex" justifyContent="center" alignItems="center" boxShadow="md" borderRadius={5}>
            <Text fontSize="20px" fontWeight="bold">Have not followed any</Text>
        </Box>
        :
         following?.map(i=>(
             <Box key={i.id} bg="white" my={4} boxShadow="md" borderRadius={5}>
                      <Box mx={5} pt={3}>
                            <Box display="flex" justifyContent="space-between" my={3}>
                                   <Text fontSize="13px" fontWeight="bold">{i.storeType}</Text>
                                   <Text color="#FC8E00" fontWeight="bold">Following</Text>
                            </Box>
                            <Box display={["block","block","flex"]} justifyContent="space-between" alignItems="center" width="100%" py={5} borderY="1px solid #EFEFEF">
                               <Box display="flex" justifyContent={["space-between","space-between","left"]}  width={["100%","100%","80%","80%"]}>
                                    <Image src={i.storeBackgroundImage} alt={i.storeName} width={["150px","150px","100px"]} height={["150px","150px","100px"]}/>
                                    <Box ml={10} alignItems="left" w="50%">
                                       <Text fontSize="18px" fontWeight="bold" mb={5}>{i.storeName}</Text>
                                       <Text fontSize="13px" fontWeight="bold" >{i.sellerName.name}</Text> 
                                     </Box>
                               </Box> 
                               <Box display="flex" justifyContent="space-between" alignItems="center" mt={[5,5,5,0]} >
                                      <Button   fontSize="14px" bg="#FC8E00" color="white" _hover={{bg:"#FC8E00"}}  onClick={()=>onUnFollow(i.id)} isLoading={loading} width="50%">UnFollow</Button>
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
