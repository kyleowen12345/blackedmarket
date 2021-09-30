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

const ProductsAccordion = ({data}) => {
    return (
      <Box bg="white" display="flex" flexDirection="column" alignItems="center" boxShadow="md" borderRadius={5} my={[5,5,5,10]}> 
         <Text my={2} fontWeight="bold"> Your best sellers </Text> 
        <Accordion defaultIndex={[0]} allowMultiple width="100%">
            {data?.products.map(i=>(
               <AccordionItem key={i.id} >
               <h2>
                 <AccordionButton _focus={{outline:"none", boxShadow:"none"}}>
                   <Box flex="1" textAlign="left" fontWeight="bold">
                     {i.productName}
                   </Box>
                   <AccordionIcon />
                 </AccordionButton>
               </h2>
               <AccordionPanel pb={4} display={["","","","flex"]} justifyContent="space-between" alignItems="center">
                    <Image src={i.image} height="100px" width="100px" borderRadius="50%" fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                    <Box my={5} display="flex" flexDirection="column" textAlign={["left","left","left","center"]}>
                      <Text fontWeight="bold">$ {i.price}</Text>
                      <Text color="gray" fontSize="12px">price</Text>
                    </Box>
                    <Box my={5} display="flex" flexDirection="column" textAlign={["left","left","left","center"]}>
                     <Text fontWeight="bold">{i.sold}</Text>
                     <Text color="gray" fontSize="12px">sold</Text>
                    </Box>
                    <Box my={5} maxW="300px" display="flex" flexDirection="column" textAlign={["left","left","left","center"]}>
                     <Text fontWeight="bold" isTruncated>{i.description}</Text>
                     <Text color="gray" fontSize="12px">description</Text>
                    </Box>
                   <NextLink href={`/products/info/${i.id}`} passHref><Link color="blue.400" fontWeight="bold" display="flex" flexDirection="column" textAlign={["left","left","left","center"]}>Visit</Link></NextLink> 
               </AccordionPanel>
             </AccordionItem> 
            ))}
        </Accordion>
    </Box>   
    )
}

export default ProductsAccordion
