import React from 'react'
import { Box,Text,Link} from "@chakra-ui/react"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import StoreProduct from './StoreProduct'
import Pagination from '../../../helpers/Pagination'
import SortingMenu from '../../../SortingMenu/SortingMenu'
const SortedProducts = ({product}) => {
  const router = useRouter()
  const {id,sortOrder,store}= router.query
  const sorterList=[{link:"productName",name:"Name"},{link:"price",name:"Price"},{link:"sold",name:"Sold"},{link:"createdAt",name:"Date"},{link:"productStocks",name:"Stocks"}]
  
  return (
        <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"   minH="600px">
            <SortingMenu sorterList={sorterList} sortOrder={sortOrder} route={`/stores/info/products?store=${store}&id=1&`}/>
            <Box display={"flex"}  alignItems="center" mt={[1,1,2,5]} p={3} px={[1,1,1,0]}>
               <NextLink href={`/stores/info/${store}`} passHref><Link color="messenger.400" fontSize="14px" fontWeight="bold" px={[2,2,2,2,2,0]}>Back To Store</Link></NextLink>
            </Box>
            <StoreProduct product={product?.products}/>
            {product?.maxPage > 1 && <Pagination marginPages={1} pageRange={2} initialPage={product?.curPage - 1} pageCount={product?.maxPage} />}
        </Box>
    )
}

export default SortedProducts

