import React from 'react'
import NextLink from 'next/link'
import { Grid,Box,Image,Text} from "@chakra-ui/react"
import Moment from 'react-moment';
import SortingMenu from '../SortingMenu/SortingMenu';
import UserStoreList from './UserStores/UserStoreList';
import Pagination from '../helpers/Pagination';
import UserStoreListSort from './UserStores/UserStoreListSort';

const UserStores = ({stores,sortOrder,maxPage,curPage}) => {
    const sorterList=[{link:"storeName",name:"Name"},{link:"storeType",name:"Type"},{link:"createdAt",name:"Latest"}]
    return (
        <Box display="flex" flexDirection="column">
        <UserStoreListSort/>
        <UserStoreList stores={stores}/>
        {maxPage >  1 && <Pagination marginPages={1} pageRange={2} initialPage={curPage - 1} pageCount={maxPage}/>}
        </Box>
    )
}

export default UserStores
