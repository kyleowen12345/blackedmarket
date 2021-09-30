import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useRouter } from 'next/router'
import {useAuth} from '../../../lib/auth'
import { FOLLOWING } from '../../../pages/user/following';
import {Button} from "@chakra-ui/react"

const UNFOLLOW = gql`
mutation ($id:ID!){
    unfollowStore(id:$id){
     token
   }
   }
`;



const UnFollowButton = ({storeId}) => {
  const {authToken}=useAuth()
  const router = useRouter()
  const {id,keyword}= router.query
  const [unfollow,{loading,error}] = useMutation(UNFOLLOW,{ errorPolicy: 'all'});
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
             <Button   fontSize="14px" bg="#FC8E00" color="white" _hover={{bg:"#FC8E00"}}  onClick={()=>onUnFollow(storeId)} isLoading={loading} width="50%">UnFollow</Button>
    )
}

export default UnFollowButton
