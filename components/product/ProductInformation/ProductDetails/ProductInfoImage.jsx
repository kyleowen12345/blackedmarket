import React from 'react'
import { Box , Image  } from "@chakra-ui/react"

const ProductInfoImage = ({src,alt}) => {
    return (
        <Box  p={5} display={["flex","flex","block" ]}alignItems="center" justifyContent="center" >
            <Image  src={src} alt={alt} width={300} height={300} fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
        </Box>
    )
}

export default ProductInfoImage
