import React from 'react'
import { Box} from "@chakra-ui/react"
import Pagination from '../helpers/Pagination'
import FollowingSearch from './UserFollowing/FollowingSearch'
import FollowingList from './UserFollowing/FollowingList'

const Following = ({following}) => {
    return (
        <Box width="80%" >
          <FollowingSearch />
          <FollowingList following={following?.follow}/>
          <Pagination marginPages={1} pageRange={2} initialPage={following?.curPage - 1} pageCount={following?.maxPage}/>
        </Box>
    )
}

export default Following
