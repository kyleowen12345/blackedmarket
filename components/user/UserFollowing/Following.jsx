import React from 'react'
import { Box} from "@chakra-ui/react"

import Pagination from '../../helpers/Pagination'
import FollowingSearch from './FollowingSearch'
import FollowingList from './FollowingList'

const Following = ({following}) => {
    return (
        <Box display="flex" flexDirection="column" width={["100%","100%","100%","100%","80%"]} px={[2,2,2,4,0]}>
          <FollowingSearch />
          <FollowingList following={following?.follow}/>
          {following?.maxPage > 1 &&  <Pagination marginPages={1} pageRange={2} initialPage={following?.curPage - 1} pageCount={following?.maxPage}/>}
        </Box>
    )
}

export default Following
