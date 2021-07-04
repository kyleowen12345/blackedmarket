import React from 'react'
import { Box,Text,Link} from "@chakra-ui/react"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import StoreProduct from '../Products/StoreProduct'
import Pagination from '../../../helpers/Pagination'
const SortedProducts = ({product}) => {
  const router = useRouter()
  const {id,sortOrder,store}= router.query
  const sorterList=[{link:"productName",name:"Name"},{link:"price",name:"Price"},{link:"sold",name:"Sold"},{link:"createdAt",name:"Date"},{link:"productStocks",name:"Stocks"}]
  const handlePagination = id => {
    const path = router.pathname
    const query = router.query
    query.id = id.selected + 1
    router.push({
      pathname: path,
      query: query,
    })
  }
  return (
        <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"   >
            <Box display={"flex"} alignItems="center" mt={5}>
               <NextLink href={`/stores/info/${store}`} passHref><Link  fontSize="14px">Back To Store</Link></NextLink>
            </Box>
            <Box bg="white" mt={[0,0,0,0,5]}  mb={5} p={3} pl={[1,1,1,3]} pr={[1,1,1,3]} display="flex" alignItems="center" width="100%">
                 <Text  fontSize={["10px","10px","11px","14px"]}  fontWeight="bold" w="10%" color="#868686">Sort by</Text>
                 <Box display="flex"  alignItems="center" justifyContent="space-between" w={["90%","90%","90%","50%","50%"]}>
                    {sorterList.map(i=>(
                        <NextLink key={i.link} href={`/stores/info/products?store=${store}&id=1&sortOrder=${i.link}`} passHref>
                              <Link  fontSize={["10px","10px","13px","15px"]} color={sortOrder == i.link && "white"} bg={sortOrder == i.link ? "#FC8E00" : "rgb(245,245,245)"} fontWeight="bold" p={2} pr={[1,1,1,2]} w="100%" ml={2} borderRadius={5}>{i.name}</Link>
                        </NextLink>
                        ))}
                 </Box>
            </Box>
            <StoreProduct product={product?.products}/>
            <Pagination marginPages={1} pageRange={2} initialPage={product?.curPage - 1} pageCount={product?.maxPage} onPageChange={handlePagination}/>
        </Box>
    )
}

export default SortedProducts

