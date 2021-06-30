import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { Box,Button,Icon } from "@chakra-ui/react"
import {  RiUserFollowLine,RiUserUnfollowLine} from "react-icons/ri"
import { useAuth } from '../../../../../lib/auth';
import { useRouter } from 'next/router'
import { STORESINFO } from '../../../../../pages/stores/info/[id]';

const FOLLOWSTORE = gql`
mutation ($id:ID!,$storeName:String!,$storeType:String!,$storeBackgroundImage:String!){
    followStore(id:$id,storeName:$storeName,storeType:$storeType,storeBackgroundImage:$storeBackgroundImage){
      storeName
      storeType
      storeBackgroundImage
    }
  }
`;
const UNFOLLOWSTORE = gql`
mutation ($id:ID!){
    unfollowStore(id:$id){
     token
   }
   }
`;
const Follow = ({store,follower}) => {
    const {authToken}=useAuth()
    const router = useRouter()
    const {id}= router.query
    const [followstore,{loading:followLoad,error:followError}] = useMutation(FOLLOWSTORE,{ errorPolicy: 'all' });
    const [unfollowstore,{loading:UnfollowLoad,error:UnfollowError}] = useMutation(UNFOLLOWSTORE,{ errorPolicy: 'all'});
    const onFollow = async() => {
        if(!authToken){
            return  router.push("/login")
        } 
        const{data}=await  followstore({variables:{id:store.id,storeName:store.storeName,storeType:store.storeType,storeBackgroundImage:store.storeBackgroundImage},context:{headers:{token:authToken || ""}},refetchQueries:[{query:STORESINFO,variables:{id:id },context:{headers:{token:authToken || ""}}}]})
        if(data){
         console.log(data)
        }
};
    const onUnFollow = async() => {
        if(!authToken){
           return  router.push("/login")
          } 
        const{data}=await  unfollowstore({variables:{id:store.id},context:{headers:{token:authToken || ""}},refetchQueries:[{query:STORESINFO,variables:{id:id },context:{headers:{token:authToken || ""}}}]})
        
        if(data){
           console.log(data)
         }
};

    return (
        <Box pr=".625rem" flex={1} >
            {
             follower == true ? 
             <Button bg="transparent" fontSize="14px" borderRadius="none" color="white" border="1px solid white" width="100%" _hover={{bg:"transparent"}} onClick={onUnFollow} isLoading={UnfollowLoad}><Icon as={RiUserUnfollowLine} mr={3} /> Unfollow</Button>
             :
             <Button bg="transparent" fontSize="14px" borderRadius="none" color="white" border="1px solid white" width="100%" _hover={{bg:"transparent"}} onClick={onFollow} isLoading={followLoad}><Icon as={RiUserFollowLine} mr={3} /> Follow</Button>   
            }
            
        </Box>
    )
}

export default Follow
