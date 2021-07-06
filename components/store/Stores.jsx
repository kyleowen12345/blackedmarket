import React from 'react'
import { useRouter } from "next/router"
import Pagination from '../helpers/Pagination'
import StoreGrid from './StoreGrid'
import NextLink from 'next/link'
import { Box,Text,Link} from "@chakra-ui/react"
const Stores = ({data}) => {
     const router = useRouter()
     const {sortOrder}= router.query
    const handlePagination = id => {
        const path = router.pathname
        const query = router.query
        query.id = id.selected + 1
        router.push({
          pathname: path,
          query: query,
        })
      }
      const sorterList=[{link:"storeName",name:"Name"},{link:"storeType",name:"Type"},{link:"createdAt",name:"Latest"}]
      return (
        <>
         <Box bg="white" mt={[0,0,1,1,5]} mb={[2,2,2,2,5]} p={3} pl={[1,1,1,3]} pr={[1,1,1,3]} display="flex" alignItems="center" width="100%" position="sticky" top={0} borderBottom="3px solid #FC8E00"> 
                 <Text  fontSize={["10px","10px","11px","14px"]}  fontWeight="bold" w="10%" color="#868686">Sort by</Text>
                 <Box display="flex"  alignItems="center"  w={["90%","90%","90%","50%","50%"]}>
                    {sorterList.map(i=>(
                        <NextLink key={i.link} href={`/stores/1?sortOrder=${i.link}`} passHref>
                             <Link  fontSize={["10px","10px","13px","15px"]} color={sortOrder == i.link && "white"} bg={sortOrder == i.link ? "#FC8E00" : "rgb(245,245,245)"}  fontWeight="bold" p={2} w="100%" ml={2} borderRadius={5}>{i.name}</Link>
                        </NextLink>
                        ))}
                 </Box>
            </Box>
         <StoreGrid stores={data?.storespaginate.stores} imageLoad={"lazy"}/>
         <Pagination marginPages={1} pageRange={2} initialPage={data?.storespaginate.curPage - 1} pageCount={data?.storespaginate.maxPage} onPageChange={handlePagination}/>
        </>
    )
}

export default Stores
