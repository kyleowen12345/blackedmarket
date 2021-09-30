import React from 'react'
import {Box} from "@chakra-ui/react"

import UserStoreList from './UserStoreList';
import Pagination from '../../helpers/Pagination';
import UserStoreListSearch from './UserStoreListSearch';

const UserStores = ({stores,maxPage,curPage}) => {
    return (
        <Box display="flex" flexDirection="column" width={["100%","100%","100%","100%","80%"]} px={[2,2,2,4,0]}>
           <UserStoreListSearch/>
           <UserStoreList stores={stores}/>
           {maxPage >  1 && <Pagination marginPages={1} pageRange={2} initialPage={curPage - 1} pageCount={maxPage}/>}
        </Box>
    )
}

export default UserStores
