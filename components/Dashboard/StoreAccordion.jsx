import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Image,
    Link
  } from "@chakra-ui/react"
  import NextLink from 'next/link'

const StoreAccordion = ({data}) => {
    return (
        <Box bg="white" display="flex" flexDirection="column" alignItems="center" boxShadow="md" borderRadius={5} mb={10}> 
         <Text my={2} fontWeight="bold"> Most followed stores </Text> 
        <Accordion defaultIndex={[0]} allowMultiple width="100%">
            {data?.stores.map(i=>(
               <AccordionItem key={i.id} >
               <h2>
                 <AccordionButton _focus={{outline:"none", boxShadow:"none"}}>
                   <Box flex="1" textAlign="left" fontWeight="bold">
                     {i.storeName}
                   </Box>
                   <AccordionIcon />
                 </AccordionButton>
               </h2>
               <AccordionPanel pb={4} display={["","","","flex"]} justifyContent="space-between" alignItems="center">
                    <Image src={i.storeBackgroundImage} height="100px" width="100px" borderRadius="50%"/>
                    <Box my={5} maxW="300px" display="flex" flexDirection="column" textAlign={["left","left","left","center"]}>
                      <Text fontWeight="bold" isTruncated>{i.storeType}</Text>
                      <Text color="gray" fontSize="12px">Store type</Text>
                    </Box>
                    <Box my={5} display="flex" flexDirection="column" textAlign={["left","left","left","center"]}>
                     <Text fontWeight="bold" >{i.followers.length}</Text>
                     <Text color="gray" fontSize="12px">followers</Text>
                    </Box>
                    <Box my={5} maxW="300px" display="flex" flexDirection="column" textAlign={["left","left","left","center"]}>
                     <Text fontWeight="bold" isTruncated>{i.storeDescription}</Text>
                     <Text color="gray" fontSize="12px">description</Text>
                    </Box>
                   <NextLink href={`/stores/info/${i.id}`} passHref ><Link display="flex" flexDirection="column" textAlign={["left","left","left","center"]}>Visit</Link></NextLink> 
               </AccordionPanel>
             </AccordionItem> 
            ))}
        </Accordion>
    </Box>   
    )
}

export default StoreAccordion
