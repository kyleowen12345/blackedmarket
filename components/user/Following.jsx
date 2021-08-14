import React from 'react'
import { Box} from "@chakra-ui/react"
import Pagination from '../helpers/Pagination'
import FollowingSearch from './UserFollowing/FollowingSearch'
import FollowingList from './UserFollowing/FollowingList'

const Following = ({following}) => {
    return (
        <Box width={["100%","100%","100%","100%","80%"]} >
          <FollowingSearch />
          <FollowingList following={following?.follow}/>
         {following?.maxPage > 1 &&  <Pagination marginPages={1} pageRange={2} initialPage={following?.curPage - 1} pageCount={following?.maxPage}/>}
        </Box>
    )
}

export default Following
