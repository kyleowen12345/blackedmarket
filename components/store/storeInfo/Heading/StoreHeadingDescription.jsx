import React from 'react'
import { Grid,Text,Box,Icon } from "@chakra-ui/react"
import {  RiStore2Line,RiProductHuntLine} from "react-icons/ri"
import { AiOutlineUser,AiOutlineMail,AiOutlineAppstoreAdd } from "react-icons/ai"
import { FiUserCheck } from "react-icons/fi"
import Moment from 'react-moment';

const StoreHeadingDescription = ({product,store}) => {
    return (
        <Grid templateColumns={ "repeat(2, 1fr)"} gridColumnGap={10}  display={["none","none","none","grid"]} ml={["10px","10px","10px","10px","50px"]} height="150px" mt="auto" pt={5}>
            <Box display="flex" alignItems="center" height="30px">
               <Icon as={RiProductHuntLine} mr={3} />
               <Text fontSize={["11px","11px","11px","13px"]}>Products:</Text>
               <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">{product.length}</Text>
            </Box>
            <Box display="flex" alignItems="center" height="30px" maxW="300px" isTruncated>
               <Icon as={RiStore2Line}  mr={3}/>
               <Text fontSize={["11px","11px","11px","13px"]} maxW="300px" isTruncated>Store:</Text>
               <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated>{store.storeName}</Text>
            </Box>
            <Box display="flex" alignItems="center" height="30px" maxW="300px" isTruncated>
               <Icon as={AiOutlineUser}  mr={3}/>
               <Text fontSize={["11px","11px","11px","13px"]}>Owner:</Text>
               <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated>{store.sellerName.name}</Text>
            </Box>
            <Box display="flex" alignItems="center" height="30px" maxW="300px" isTruncated>
               <Icon as={AiOutlineMail}  mr={3}/>
               <Text fontSize={["11px","11px","11px","13px"]}>Email:</Text>
               <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated>{store.sellerName.email}</Text>
            </Box>
            <Box display="flex" alignItems="center" height="30px" maxW="300px" isTruncated >
               <Icon as={AiOutlineAppstoreAdd}  mr={3}/>
               <Text fontSize={["11px","11px","11px","13px"]}>Store Type:</Text>
               <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated>{store.storeType}</Text>
            </Box>
            <Box display="flex" alignItems="center" height="30px" maxW="300px" isTruncated>
            <Icon as={FiUserCheck}  mr={3}/>
                <Text fontSize={["11px","11px","11px","13px"]}>
                Joined 
                </Text>
                <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated>
                   <Moment fromNow>{Date.parse(store.createdAt) || store.createdAt}</Moment>
                </Text>
                </Box>
        </Grid>
    )
}

export default StoreHeadingDescription
