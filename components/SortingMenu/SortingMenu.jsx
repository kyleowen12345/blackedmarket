import React from 'react'
import NextLink from 'next/link'
import { Box,Text,Link} from "@chakra-ui/react"
const SortingMenu = ({sorterList,sortOrder,route}) => {
    return (
        <Box bg="white"  mt={[0,0,1,1,5]} mb={[2,2,2,2,5]} p={3} px={[1,1,1,3]}  display="flex" alignItems="center" width="100%" position="sticky" top={0} borderBottom="2px solid #FC8E00" boxShadow="md">
        <Text  fontSize={["10px","10px","11px","14px"]}  fontWeight="bold" w="10%" color="#868686">Sort by</Text>
        <Box display="flex"  alignItems="center" justifyContent="space-between" w={["90%","90%","90%","50%","50%"]}>
           {sorterList.map(i=>(
               <NextLink key={i.link} href={`${route}sortOrder=${i.link}`} passHref>
                     <Link  fontSize={["10px","10px","13px","15px"]} color={sortOrder == i.link && "white"} bg={sortOrder == i.link ? "#FC8E00" : "rgb(245,245,245)"}   fontWeight="bold" p={2} pr={[1,1,1,2]} w="100%" ml={2} borderRadius={5}>{i.name}</Link>
               </NextLink>
               ))}
        </Box>
   </Box>
    )
}

export default SortingMenu
