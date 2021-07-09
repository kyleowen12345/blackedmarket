import React from 'react'
import { Box,Text,Link} from "@chakra-ui/react"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import StoreProduct from '../Products/StoreProduct'
import Pagination from '../../../helpers/Pagination'
import SortingMenu from '../../../SortingMenu/SortingMenu'
const SortedProducts = ({product}) => {
  const router = useRouter()
  const {id,sortOrder,store}= router.query
  const sorterList=[{link:"productName",name:"Name"},{link:"price",name:"Price"},{link:"sold",name:"Sold"},{link:"createdAt",name:"Date"},{link:"productStocks",name:"Stocks"}]
  
  return (
        <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"   >
            <SortingMenu sorterList={sorterList} sortOrder={sortOrder} route={`/stores/info/products?store=${store}&id=1&`}/>
            <Box display={"flex"} alignItems="center" mt={[1,1,2,5]} p={3} px={[1,1,1,3]}>
               <NextLink href={`/stores/info/${store}`} passHref><Link  fontSize="14px">Back To Store</Link></NextLink>
            </Box>
            <StoreProduct product={product?.products}/>
            <Pagination marginPages={1} pageRange={2} initialPage={product?.curPage - 1} pageCount={product?.maxPage} />
        </Box>
    )
}

export default SortedProducts

