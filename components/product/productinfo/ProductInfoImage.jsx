import React from 'react'
import { Box  } from "@chakra-ui/react"
import Image from 'next/image'
const ProductInfoImage = ({src,alt}) => {
    return (
        <Box  p={5} display={["flex","flex","block" ]}alignItems="center" justifyContent="center" ml="auto" mr="auto">
            <Image src={src} alt={alt} width={300} height={300}/>
        </Box>
    )
}

export default ProductInfoImage
