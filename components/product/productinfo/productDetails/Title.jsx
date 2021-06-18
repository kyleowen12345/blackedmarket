import React from 'react'
import { Box,Text,Badge  } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'


const Title = ({product}) => {
    return (
        <Box p={5} pt={[0,0,5]} pb={[0,0,5]}>
                <Box display="flex" alignItems="center" >
                    <Box>
                          <Badge  colorScheme="orange" fontSize={["8px","8px","10px","12px","13px"]}>Preffered</Badge>
                    </Box>
                      <Text fontSize={["15px","15px","15px","25px","25px","25px"]} fontWeight="bold" ml={[5,5,10]}>{product?.productName}</Text>
                </Box>
                <Box d="flex" mt="2"  alignItems="center" width={["200px","200px","300px","500px"]}>
                                   {Array(5)
                                     .fill("")
                                     .map((_,i) => (
                                     <StarIcon
                                      key={i}
                                      color={ "#FC8E00"}
                                      boxSize={"1em"}
                                      />
                                     ))}
                                    <Text fontSize={"20px"} ml={[2,3,3,5]} mr={[2,3,3,5]}>|</Text> 
                                    <Text  mr={[1,1,3]} fontSize={["10px","10px","12px","15px","20px"]}>{product.productName.length + product.image.length} </Text> 
                                    <Text color="#888888" fontSize={["8px","8px","12px"]}>reviews</Text>
                                     <Text fontSize="20px" ml={[2,2,3,5]} mr={[2,3,3,5]}>|</Text> 
                                     <Text mr={[1,1,3]} fontSize={["10px","10px","12px","15px","20px"]}>{product?.sold}</Text>
                                     <Text color="#888888" fontSize={["8px","8px","12px"]}>Sold</Text>
                </Box>       
            </Box>
    )
}

export default Title
