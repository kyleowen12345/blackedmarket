import React from 'react'
import { Flex, Box,Text,useMediaQuery  } from "@chakra-ui/react"
import CarouselBanner from './CarouselBanner'

const Banner = () => {
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)")
    return (
        <Flex>
            <Box  >
            <CarouselBanner />
            </Box>
        </Flex>
       
    )
}

export default Banner
